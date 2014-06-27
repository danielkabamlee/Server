var http = require("http");
var port = process.env.PORT || 8000;

var counter = 0;

http.createServer(function (request, response) {
   counter++;
   
   var path = request.url;
   console.log("requested=" + path + " counter= " + counter);

   response.writeHead(200, {'Content-Type': 'text/html'});

   if (path == "/") {
      response.end("Hello User. You are requestor #" + counter + 
         ".<br><a href='/page2'>Generate</a>\n");
   }
   else if (path == "/page2") {
      response.end("You player certifcate has been generated. <a href='/'>Back.</a>\n");
   }
   else if (path == "/generate") {
      
   }
}).listen(port);

console.log("Server running at http://127.0.0.1:" + port);
