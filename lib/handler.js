module.exports = UnicornHandler;

util = require('util');
Socket = require('net').Socket;

function UnicornHandler(){
  Socket.call(this);
}

util.inherits(UnicornHandler,Socket);

/*
methods = {

};

for(method_name in methods){
  UnicornHander.prototype[method_name] = methods[method_name];
}
*/
