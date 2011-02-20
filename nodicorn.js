UnicornHandler = require('./lib/Handler');

module.exports = nodicorn = {
  pipe: function(o,callback){
    var req = o.req;
    var res = o.res;
    var path = o.path;
    var port = o.port;

    var handler = new UnicornHandler();
    var buffers = [];
    

    req.on('data',function(data){
      buffers.push(new Buffer(data));
    });

    req.on('end',function(){
      handler.on('connect',function(){
        buffers.foreach(function(buffer){
          handler.write(buffer);
        });
        handler.end(); 
      });
    });

    handler.connect(port,path);
    
    handler.write()
  }
};
