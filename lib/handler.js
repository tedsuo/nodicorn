module.exports = UnicornHandler;

net = require('net');

function UnicornHandler(){
  net.Socket.call(this);
}

util.inherits(UnicornHandler,Socket);

/*
methods = {

};

for(method_name in methods){
  UnicornHander.prototype[method_name] = methods[method_name];
}
*/
