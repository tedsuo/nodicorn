Unicorn = require('./lib/unicorn.js');
Stable = require('./lib/stable.js');

module.exports = {
  createStable: function(max_connections){
    return new Stable(max_connections); 
  },
  createUnicorn: function (path,port) {
    return new Unicorn(path,port);
  }
}

