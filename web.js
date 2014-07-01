var http = require("http");
var url = require("url");
var port = process.env.PORT || 8000;
var KabamAPI = require("./KabamApi");
var RevenueTrackingInput = require("./RevenueTrackingInput");

var counter = 0;
var kabam = new KabamAPI();
var revTI = new RevenueTrackingInput();

revTI.setTransactionId("danieltestid");
revTI.setReceipt("danieltestreceipt");
revTI.setIp("10.0.0.1");
revTI.setPrice(1990000);
revTI.setCurrency("USD");
revTI.setCountry("US");
revTI.setTransactionType("payment");
revTI.setProvider("iTunes");
revTI.setMetadata("testmetadata");

function callback(result) {
}

http.createServer(function (request, response) {
   counter++;
   
   var path = request.url;
   var player = url.parse(request.url).search;

   console.log("requested=" + path + " counter= " + counter);
   console.log("player: " + player);

   response.writeHead(200, {'Content-Type': 'text/html'});

   if (path == "/") {
      response.end("Hello User. You are requestor #" + counter + 
         ".<br><a href='/page2'>Generate</a>\n");
   }
   else if (path == "/page2") {
      response.end("You player certifcate has been generated. <a href='/'>Back.</a>\n");
   }
   else if (path == ("/certificates/" + player)) {
      var i = 0;
      while (player.charAt(i++) != '=')
         ;
 
      var playerId = player.substring(i, player.length);
      console.log("id = " + playerId);

      kabam.sendRevenueTracking(revTI, playerId, function (result) {
         if (result.getSuccess()) {
            console.log("Revenue tracking reporting successful!");
         } else {
            console.log("Revenue tracking reporting failed: " + result.getResponse());
         }
      });
      var certificate = kabam.getPlayerCertificate(playerId, null);
      console.log(certificate);
      response.write(certificate);
      response.end();
   }
   else {
      response.end("Invalid URL.");
   }
}).listen(port);

console.log("Server running at http://127.0.0.1:" + port);
