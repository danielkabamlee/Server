var http = require("http");
var url = require("url");

function parse(string) {
   var i = 0;
   var str = null;

   if (string) {
      while (string && string.charAt(i++) != '=')
         ;
      str = string.substring(i, string.length);
   }

   return str;
}

function start(route) {
   function onRequest(request, response) {
      var pathname = url.parse(request.url).pathname;
      console.log("Request for " + pathname + " received.");
      var query = url.parse(request.url).search;
      console.log(query);
      console.log(parse(query));
      route(pathname);

      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write("Hello World");
      response.end();
   }

   http.createServer(onRequest).listen(8888);
   console.log("Server has started.");
}

exports.start = start;
