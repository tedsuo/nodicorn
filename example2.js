http = require('http');

webserver =  http.createServer( function(req,res){
    res.writeHead(200);
    res.end('<html><head><title>Nodicorn Test</title></head><body>&#9836; I was born a unicorn&#9836<body></html>');
});

webserver.listen( 8070, 'localhost');
