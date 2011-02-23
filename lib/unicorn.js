http = require('http');
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
  var unicorn = this;
// set options
    var request = o.request;
    var response = o.response;

// initialize request headers
    var headers = request.headers;
    headers['X-Forwarded-For'] = request.connection.remoteAddress+', 0.0.0.0';

    var options = {
      host: this.host,
      port: this.port,
      path: request.url,
      method: request.method,
      headers: headers
    };
   
    var connection = http.request(options);
    console.log('CONNECTION INITIATED');

// piping request is exactly NOT
// how unicorn wants us to do this
    request.pipe(connection);

    request.on('end',function(){
      console.log('REQUEST BUFFERED');
      connection.end();
    });

// pipe response 
    connection.on('response', function(uni_response){
      console.log('UNICORN RESPONSE');
  // write response headers
      var headers = uni_response.headers;
      headers['Content-Type','text/html; charset=UTF-8'];
      response.writeHead(uni_response.statusCode, headers);

      uni_response.pipe(response);

  // close connection 
      uni_response.on('end',function(){
        unicorn.end();
        console.log('CLOSE UNICORN CONNECTION');
      });

    });
  }

