stable = require('./unicorn-handler').createStable(1024);
http = require('http');

// point this at your unicorn socket
path = '0.0.0.0';
port = 8000;

webserver =  http.createServer( stable.connect(path,port) );
webserver.listen( 8060, 'localhost');
