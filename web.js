var http = require("http");
var port = process.env.PORT || 8000;

var counter = 0;

http.createServer(function (request, response) {
   counter++;
   
   var path = request.url;
   console.log("requested=" + path + " counter= " + counter);

   response.writeHead(200, {'Content-Type': 'text/html'});

   if (path == "/") {
      response.end("Hello World. You are requestor #" + counter + 
         ".<br><a href='/page2'>Page 2</a>\n");
   }
   else if (path == "/page2") {
      response.end("This is page 2. <a href='/'>Back.</a>\n");
   }
}).listen(port);

console.log("Server running at http://127.0.0.1:" + port);
