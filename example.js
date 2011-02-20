nodicorn = require('nodicorn');
http = require('http');

path = '0.0.0.0';
port = 8000;

web_server =  http.createServer(function(req,res){
  nodicorn.pipe({
    req: req,
    res: res,
    path: path,
    port: port
    },
    function( err, unicorn_response){
     if(!err) res.pipe(unicorn_response);
    }
  ); 
});

webserver.listen( 80, 'localhost');
