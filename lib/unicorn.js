http = require('http');
utils = require('util');
events = require('events');
module.exports = Unicorn;

function Unicorn (path,port) {
  events.EventEmitter.call(this);
  this.path = path;
  this.port = port;
}

utils.inherits(Unicorn, events.EventEmitter);

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
      host: this.path,
      port: this.port,
      path: request.url,
      method: request.method,
      headers: headers
    };
    console.log(options);
    var connection = http.request(options);

    console.log('CONNECTION INITIATED');
// pipe request
    request.on('data',function(data){
      console.log('PIPE -> UNICORN');
      connection.write(data);
    });

    request.on('end',function(){
      console.log('REQUEST BUFFERED');
      connection.end();

// pipe response 
    connection.on('response', function(uni_response){
      console.log('UNICORN RESPONSE');
  // write response headers
      var headers = uni_response.headers;
      headers['Content-Type','text/html; charset=UTF-8'];
      response.writeHead(uni_response.statusCode, headers);

  // write body
      uni_response.on('data',function(data){
        console.log('PIPE -> RESPONSE');
        response.write(data);
      });

  // close connection 
      uni_response.on('end',function(){
        if(uni_response.trailers){
          response.addTrailers(uni_response.trailers);
        }
        response.end();
        console.log('CLOSE UNICORN CONNECTION');
      });

    });
  });
  }

