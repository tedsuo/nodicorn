Unicorn = require('./lib/unicorn.js');
Pool = require('./lib/pool.js');

module.exports = {
  createPool: function(settings){
    return new Pool(settings); 
  },
  createUnicorn: function (path,port) {
    return new Unicorn(path,port);
  }
}

