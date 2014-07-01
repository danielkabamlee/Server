var KabamApiConfig = require('./KabamApiConfig');
var ReturnResult = require('./ReturnResult');
var RevenueTrackingInput = require('./RevenueTrackingInput');
var PlayerCertificate = require('./PlayerCertificate');
var LoyaltyRedemptionReceipt = require('./LoyaltyRedemptionReceipt');

var crypto = require('crypto');
var http = require(KabamApiConfig.KABAM_WSKE_PROTOCOL);
var dateFormat = require('dateformat'); //npm install dateformat

//private function/properties
function signRequest(fullString) {
  var shasum = crypto.createHmac('sha256', KabamApiConfig.KABAM_CLIENT_SECRET);
  shasum.update(fullString);
  return shasum.digest('hex');
}

function sendRequest(httpMethod, timeStamp, nonce, uri, payload, signature, callback) {
  var headers = {
    'Content-type': 'application/json;charset=UTF-8',
    'X-KBM-Client-Id': KabamApiConfig.KABAM_CLIENT_ID,
    '"X-KBM-Signature': signature,
    'X-KBM-Timestamp': timeStamp,
    'X-KBM-Nonce': nonce,
    'X-KBM-Version': KabamApiConfig.KABAM_CLIENT_VERSION
  }
  var post_options = {
    host: KabamApiConfig.KABAM_WSKE_SERVER,
    port: KabamApiConfig.KABAM_WSKE_PORT,
    path: uri,
    method: httpMethod,
    headers: headers
  }
  var post_req = http.request(post_options);
  post_req.setTimeout(KabamApiConfig.KABAM_API_SERVICE_TIMEOUT * 1000);
  post_req.on('response', function(res) {
    res.on('data', function (chunk) {
      var result = new ReturnResult();
      result.setSuccess(true);
      result.setReturnCode(res.statusCode);
      result.setResponse(chunk);
      if(result.getReturnCode() < 200
        || result.getReturnCode() > 299) {
        result.setSuccess(false);
      }
      callback(result);
    });
  });
  post_req.on('error', function(e) {
    var result = new ReturnResult();
    result.setSuccess(false);
    result.setReturnCode(0);
    result.setResponse(e.message);
    callback(result);
  });
  if(httpMethod != "GET") {
    post_req.write(payload);
  }
  post_req.end();
}

function gen12Char() {
  return (Math.random() + 1).toString(36).substr(2,12);
}

// constructor
function KabamApi() {
}

//public functions
KabamApi.prototype.sendRevenueTracking = function(revenueTrackingInput, playerId, callback) {
  var httpMethod = "POST";
  var now = new Date();
  var timeStamp = dateFormat(now, "ddd, dd mmm yyyy HH:MM:ss o");
  var nonce;
  try {
    var buf = crypto.randomBytes(13);
    nonce = buf.toString("hex").substr(2,24)
  } catch (ex) {
    //fall back for all entropy sources are drained
    nonce = gen12Char() + gen12Char();
  }
  var uri = "/revenues/server/" + KabamApiConfig.KABAM_CLIENT_ID + "/" + playerId;
  var payload = revenueTrackingInput.toJson();
  var fullString = httpMethod + timeStamp + nonce + uri + payload;
  var signature = signRequest(fullString);
  sendRequest(httpMethod, timeStamp, nonce, uri, payload, signature, callback);
}

KabamApi.prototype.getPlayerCertificate = function(playerId, optionalPayload) {
  optionalPayload = optionalPayload || {}
  var now = new Date();
  var timeStamp = dateFormat(now, "ddd, dd mmm yyyy HH:MM:ss o");
  var nonce;
  try {
    var buf = crypto.randomBytes(13);
    nonce = buf.toString("hex").substr(2,24)
  } catch (ex) {
    //fall back for all entropy sources are drained
    nonce = gen12Char() + gen12Char();
  }
  var playerCertificate =  new PlayerCertificate();
  playerCertificate.setTimeStamp(timeStamp);
  playerCertificate.setNonce(nonce);
  playerCertificate.setClientId(KabamApiConfig.KABAM_CLIENT_ID);
  playerCertificate.setPlayerId(playerId);
  playerCertificate.setPayload(optionalPayload);
  var processedPlayerCertificate = new Buffer(playerCertificate.toJson()).toString('base64');
  var signature = signRequest(processedPlayerCertificate);
  return processedPlayerCertificate + "." + signature;
}

KabamApi.prototype.verifyLoyaltyRedemptionReceipt = function(rawReceipt) {
  var receipt = JSON.parse(rawReceipt);
  var data = receipt.receipt;
  var signature = receipt.signature;

  var verifier = crypto.createVerify("RSA-SHA256");
  var key = "-----BEGIN PUBLIC KEY-----\n" + 
            ((KabamApiConfig.KABAM_CLIENT_PUBLIC_KEY).match(/.{1,64}/g)).join("\n") +
            "\n-----END PUBLIC KEY-----";
  verifier.update(data);
  var success = verifier.verify(key, signature, 'base64');
  if(success) {
    receipt = JSON.parse(data);
    var loyaltyRedemptionReceipt = new LoyaltyRedemptionReceipt();
    loyaltyRedemptionReceipt.setClientId(receipt.clientId);
    loyaltyRedemptionReceipt.setPlayerId(receipt.playerId);
    loyaltyRedemptionReceipt.setProductId(receipt.productId);
    loyaltyRedemptionReceipt.setPrice(receipt.price);
    loyaltyRedemptionReceipt.setStatus(receipt.status);
    loyaltyRedemptionReceipt.setTransactionId(receipt.transactionId);
    loyaltyRedemptionReceipt.setPurchaseTime(receipt.purchaseTime);
    loyaltyRedemptionReceipt.setDeveloperPayload(receipt.developerPayload);
    return loyaltyRedemptionReceipt;
  } else {
    return null;
  }
}

module.exports = KabamApi;
