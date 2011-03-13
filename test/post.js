http = require('http');
assert = require('assert');

agent = http.getAgent('localhost',8060);
agent.maxSockets = 5;

var total = 100;
var delay = 0;

for( x=0; x<total; x++){
  echo(x);
}

function test(id){
  setTimeout(function(){
    echo(id);
  },delay);
}

function echo(id){
  var options = {
    host: 'localhost',
    port: 8060,
    path: '/echo',
    method: 'POST'
  };

  console.log(id+': REQUEST INITIATED');
  var req = http.request(options);

  req.write('msg=');

  var y = 0;
  var i;
  for( i=0; i<5; i++){
    setTimeout(function(){
      req.write(id+': This is the song that never ends \n');
      console.log(id+': REQUEST WRITE');
      ++y;
      if(y == 5) req.emit('slow');
    },2000);
  }

  req.on('slow', function(){
    console.log(id+': REQUEST END');
    req.end();
  });

  req.on('response', function(res){
    console.log(id+': RESPONSE');
    res.on('data', function(data){
      console.log(data.toString('utf8'));
    });
  });
}
