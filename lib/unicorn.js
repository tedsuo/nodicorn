http = require('http');
net = require('net');
utils = require('util');
events = require('events');
module.exports = Unicorn;

function Unicorn (host,port) {
  events.EventEmitter.call(this);
  this.host = host;
  this.port = port;
}

utils.inherits(Unicorn, events.EventEmitter);

Unicorn.prototype.end = function () {
  this.emit('end');
};

Unicorn.prototype.duplex = function (o) {
  console.log('INITIATE UNICORN DUPLEX');
  this.request = o.request;
  this.response = o.response;

// initialize request headers
  var headers = this.request.headers;
  headers['X-Forwarded-For'] = this.request.connection.remoteAddress +
                                ', 0.0.0.0';

  var options = {
    host: this.host,
    port: this.port,
    path: this.request.url,
    method: this.request.method,
    headers: headers
  };

  this.http_adapter(options);
}
 
Unicorn.prototype.socket_adapter = function (o) {
  var unicorn = this;
  var connection = net.createConnection(this.port,this.host);
}

Unicorn.prototype.http_adapter = function (o) {
  var unicorn = this;
  var connection = http.request(o);

  console.log('CONNECTION INITIATED');

// piping request is exactly NOT how
// unicorn wants us to do this
  this.request.pipe(connection);

  this.request.on('end',function(){
    console.log('REQUEST BUFFERED');
    connection.end();
  });

// pipe response 
  connection.on('response', function(rack_response){
    console.log('RACK RESPONSE');

// write response headers
    var headers = rack_response.headers;
    headers['Content-Type','text/html; charset=UTF-8'];
    unicorn.response.writeHead(rack_response.statusCode, headers);
    rack_response.pipe(unicorn.response);

// close connection 
    rack_response.on('end',function(){
      unicorn.end();
      console.log('CLOSE UNICORN CONNECTION');
    });

  });
}

