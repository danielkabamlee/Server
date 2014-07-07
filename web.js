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
      //response.end(info);      
      
//var receipt = '{"receipt":"{\\"clientId\\":\\"u0BV\\",\\"playerId\\":\\"So1gyKCsKoMNOWQ1htfm3nR8SVzTc6\\",\\"productId\\":\\"com.kabam.kbn.loyalty100\\",\\"price\\":100,\\"status\\":\\"charged\\",\\"transactionId\\":\\"52f17a1f0e628701005c0a2e\\",\\"purchaseTime\\":\\"2014-02-04T23:39:11+0000\\",\\"developerPayload\\":\\"testPayload\\"}","signature":"NBBc2y5h60uUy9HXjf0wAXr61ldlAYYtx5Ywuq8lHHrrgD0b94eSLHMa08dxP9eFVV55s8Pn/hF2nl+sw2Y4xcBuimlwF2hjPv/Uqj5zYsnvw69j9KfVXjK7O22Ats6ZIpxZM8pasZTK7DHyiyNOOaWV12E7cwpdtI5KjQPPKO5BfE8GQFl5gypwGrqU6+b4uWVbbsk9pjfHbSUJfvROyrsY4oT8e+bfekxl2bOFr7OMGzYI+YjJBBTl5ZZtq6to0r128cLo/XwlPNWNj/JbwhnTHS3+CwZWjG2Xn+J+9bIFuQxy4OmBFIfnflTk2AwSI9GWYI0Y39vypqwy8Hurgw=="}';
      //var receipt = '{"payload":"","signature":"ZHxZpSWsSjDW3IZ4I+tpE\/uhWWIqwk+RNYZrPfCCcezQRl7amFgijpDoWBvojaJU\/XZqtYRXDJMQkwnb06b3nCT8A0MiPv0+JLJWbXQS5uhz+\/NdRXzU3LMTT6qREa9+AOPH80v3C8vBAfqxlXtwFjihksyYB4cHnuIMgksixwnjGK3nvlGq3W7Mie6ke9f2HFFyEWnKwfLhCs1n\/8tXz5EBfdOOYqgpRtXsdSXmqBGsNeJmMG19eY49GBe3Wdte11y3OLpYnW89lzeZnnm9zFZ+JOpByG7P1ulRWov2ayhJyeq67aeBouN\/0ydRqxnuPrkL1VrHx6k\/JaeY8GKNQw==","receipt":"{\"clientId\":\"gam1\",\"playerId\":\"abc\",\"productId\":\"testproduct-270643af-01b8-4fe0-a042-940f84590c39\",\"price\":1,\"status\":\"charged\",\"transactionId\":\"53baed1ceb4fcd056c42404a\",\"purchaseTime\":\"2014-07-07T18:55:24+0000\",\"developerPayload\":\"\"}"}';
      var receipt = info;
      receipt = receipt.replace('\\\"', '\\\\\"');
      receipt = "{" + receipt.substring(2, receipt.length);
      var result = kabam.verifyLoyaltyRedemptionReceipt(receipt);

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
      
   }
   else {
      response.end("Invalid URL.");
   }
}).listen(port);

console.log("Server running at http://127.0.0.1:" + port);
