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
   else if (path == "/certificates") {
      response.end("eyJ0aW1lU3RhbXAiOiJNb24sIDMwIEp1biAyMDE0IDE5OjU3OjMwICswMDAwIiwibm9uY2UiOiJiMmY4MmRlNjZlYzA2M2EwYjhjY2FlZWQiLCJjbGllbnRJZCI6ImdhbTEiLCJwbGF5ZXJJZCI6ImFiYyJ9.d39a17fcc846b746f30cc8e10f502fa4b6f610684fdc55ea6f9ca615966af1fa");
   }
}).listen(port);

console.log("Server running at http://127.0.0.1:" + port);
