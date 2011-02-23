http = require('http');
utils = require('util');
events = require('events');
module.exports = Stable;

function Stable (max_connections) {
  events.EventEmitter.call(this);
  this.max_ponies = max_connections || 1024;
  this.pony_pit = 0;
}

utils.inherits(Stable, events.EventEmitter)

Stable.prototype.connect = function (path, port) {

  var stable = this;

  var unicorn = new Unicorn(path, port);

  unicorn.on('end',function(){
    --this.pony_pit;
  });

  ++this.pony_pit;

  return function(req,res){
    
    console.log('REQUEST');

    if(stable.pony_pit > stable.max_ponies){
      console.log('RESPONSE');
      res.end(503);
      return;
    };

    unicorn.duplex({
      request: req,
      response: res
    });
  }
};
