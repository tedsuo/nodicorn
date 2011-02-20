http = require('http');
utils = require('utils');
events = require('events');

module.exports = {
  createStable: function(max_connections){
    return new Stable(max_connections); 
  },
  createUnicorn: function (path,port) {
    return new Unicorn(path,port);
  }
}


function Stable (max_connections) {
  events.EventEmitter.call(this);
  this.max_ponies = max_connections || 1024;
  this.pony_pit = 0;
}

utils.inherits(Stable, events.EventEmitter)

Stable.prototype.connect: function (path, port) {
    var stable = this;

    var unicorn = new Unicorn(path, port);

    unicorn.on('end',function(){
      --this.pony_pit;
    });

    ++this.pony_pit;

    return function(req,res){

      if(stable.pony_pit > stable.max_ponies){
        res.end(503);
        return;
      };

      unicorn.duplex({
        request: req,
        response: res
      });
    }
  }
};


function Unicorn (path,port) {
  events.EventEmitter.call(this);
  this.path = path;
  this.port = port;
}

utils.inherits(Unicorn, events.EventEmitter)

Unicorn.prototype.duplex: function (o) {
  this.emit('end');
};

Unicorn.prototype.duplex: function (o) {
  var unicorn = this;
// set options
    var request = o.request;
    var response = o.response;

// initialize request headers
    var headers = request.headers;
    headers['X-Forwarded-For'] = request.connection.remoteAddress+', 0.0.0.0';

    var connection = http.request({
      host: this.path,
      port: this.port,
      path: request.url,
      method: request.method,
      headers: headers
    });

// pipe request
    request.on('data',function(data){
      connection.write(data);
    });
/*
    request.on('end',function(){
      response.writeHead(200);
    });
*/
// pipe response 
    connection.on('response', function(uni_response){

  // write response headers
      var headers = uni_response.headers;
      headers['Content-Type','text/html; charset=UTF-8'];
      response.writeHead(uni_response.statusCode, headers);

  // write body
      uni_response.on('data',function(data){
        response.write(data);
      });

  // close connection 
      uni_response.on('end',function(){
        if(uni_response.trailers){
          response.addTrailers(uni_response.trailers);
        }
        response.end();
        connection.end();
        unicorn.end();
      });

    });
  }

