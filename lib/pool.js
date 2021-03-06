http = require('http');
utils = require('util');
events = require('events');
module.exports = Pool;

function Pool (o) {
  this.port = o.port;
  this.host = o.host;
  this.path = o.path;
  this.max_ponies = o.max_connections || 1024;
  this.pony_pit = 0;
}

Pool.prototype.connect = function () {

  var pool = this;

  return function(req,res){
  
    var unicorn = new Unicorn(pool.path,pool.port);

     unicorn.on('end',function(){
      --pool.pony_pit;
    });

    ++pool.pony_pit;
   
    //console.log('HTTP REQUEST');

  // refuse connection if maxed out 
    if(pool.pony_pit > pool.max_ponies){
      //console.log('REFUSE CONNECTION MAXED OUT');
      res.writeHead(503);
      res.end();
      unicorn.end();
      return false;
    };

    unicorn.duplex({
      request: req,
      response: res
    });

    return true;
  }
};
