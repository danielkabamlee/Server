 //private member
var timeStamp;
var nonce;
var clientId;
var playerId;
var payload;

//constructor
function PlayerCertificate() {
}

//public functions
PlayerCertificate.prototype.getPayload = function() {
  return payload;
}
PlayerCertificate.prototype.setPayload = function(p) {
  payload = p;
}
PlayerCertificate.prototype.getTimeStamp = function() {
  return timeStamp;
}
PlayerCertificate.prototype.setTimeStamp = function(t) {
  timeStamp = t;
}
PlayerCertificate.prototype.getNonce = function() {
  return nonce;
}
PlayerCertificate.prototype.setNonce = function(n) {
  nonce = n;
}
PlayerCertificate.prototype.getClientId = function() {
  return clientId;
}
PlayerCertificate.prototype.setClientId = function(c) {
  clientId = c;
}
PlayerCertificate.prototype.getPlayerId = function() {
  return playerId;
}

PlayerCertificate.prototype.setPlayerId = function(p) {
  playerId = p;
}

PlayerCertificate.prototype.toJson = function() {
  var o = {
    timeStamp: timeStamp,
    nonce: nonce,
    clientId: clientId,
    playerId: playerId
  };
  for (var key in payload) {
    if (payload.hasOwnProperty(key)) {
      o[key] = payload[key];
    }
  }
  return JSON.stringify(o);
}

module.exports = PlayerCertificate;
