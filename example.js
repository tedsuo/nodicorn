http = require('http');

// point this at your unicorn socket
settings = {
  host : '0.0.0.0',
  port : 8000,
  max_connections : 1024
};

unicorn_pool = require('./unicorn-handler')
                .createPool(settings);

webserver =  http.createServer( 
                unicorn_pool.connect() 
             ).listen( 8060, 'localhost');
