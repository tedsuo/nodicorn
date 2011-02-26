unicorn-hander lets you serve up rack applications from node.

#SETUP

- Install node
- Install unicorn

##Example Unicorn Server 

    http = require('http');

    // point this at your unicorn socket
    settings = {
      host : '0.0.0.0',
      port : 8000,
      max_connections : 1024
    };

    unicorn_pool = require('unicorn-handler')
                    .createPool(settings);

    webserver =  http.createServer( 
                    unicorn_pool.connect() 
                 ).listen( 80, 'localhost');


##Included Hello World Sinatra App
- Install sinatra

cd path_to/unicorn-handler/example   
unicorn -c unicorn.conf.rb -D   
cd ..   
node example.js  

go to:
http://127.0.0.1:80/

confirm it matches:
http://0.0.0.0:8000/

Currently unicorn-handler only handles unicorns on tcp ports, and not unicorns on unix sockets. I hope to add unix sockets in the next version.
