var http = require("http");
var url = require("url");
var port = process.env.PORT || 8000;
var KabamAPI = require("./KabamApi");
//var RevenueTrackingInput = require("./RevenueTrackingInput");

var counter = 0;
var kabam = new KabamAPI();
//var revTI = new RevenueTrackingInput();

/*
revTI.setTransactionId("danieltestid");
revTI.setReceipt("danieltestreceipt");
revTI.setIp("10.0.0.1");
revTI.setPrice(1990000);
revTI.setCurrency("USD");
revTI.setCountry("US");
revTI.setTransactionType("payment");
revTI.setProvider("iTunes");
revTI.setMetadata("testmetadata");
*/

function callback(result) {
   if (result.getSuccess()) {
      console.log("Revenue tracking reporting successful!");
   } else {
      console.log("Revenue tracking reporting failed: " + result.getResponse());
   }
}

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

http.createServer(function (request, response) {
   counter++;
   
   var path = request.url;
   var query = url.parse(request.url).search;
   var info = parse(query);

   if (query) {
      console.log("requested=" + path + " counter= " + counter);
      console.log("query: " + query);
   }
   response.writeHead(200, {'Content-Type': 'text/html'});

   if (path == "/") {
      response.end("Hello User. You are requestor #" + counter + 
         ".<br><a href='/page2'>Generate</a>\n");
   }
   else if (path == "/page2") {
      response.end("You player certifcate has been generated. <a href='/'>Back.</a>\n");
   }
   else if (path == ("/certificates" + query)) {
      console.log("generating certificate from " + info + "...");
      var certificate = kabam.getPlayerCertificate(info, null);

      console.log(certificate);
      response.end(certificate);
   }
   else if (path == ("/redeem" + query)) {
      response.end(info);      
      /*
      var result = kabam.verifyLoyaltyRedemptionReceipt(info);      

      if(result === null) {
         console.log("verification failed");
         response.end("FAILED");
      } else {
         console.log("The receipt verification result are: ");
         console.log("  clientId", result.getClientId());
         console.log("  playerId", result.getPlayerId());
         console.log("  productId", result.getProductId());
         console.log("  price", result.getPrice());
         console.log("  status", result.getStatus());
         console.log("  transactionId", result.getTransactionId());
         console.log("  purchaseTime", result.getPurchaseTime());
         console.log("  developerPayload", result.getDeveloperPayload());
         console.log("End of  verification resulit");
         response.end("SUCCESS");
      }
      */
   }
   else {
      response.end("Invalid URL.");
   }
}).listen(port);

console.log("Server running at http://127.0.0.1:" + port);
