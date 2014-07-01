//private members

/*
 * $clientId is the client ID of this receipt
 */
var clientId;

/*
 * $playerId is the player ID of this receipt
 */
var playerId;

/*
 * $productId is the product ID of this receipt
 */
var productId;

/*
 * $price is the price of this receipt (in loyalty points)
 */
var price;

/*
 * $status is the status  of this receipt (should be charged)
 */
var status;

/*
 * $transactionId is the transaction ID of this receipt (unique)
 */
var transactionId;

/*
 * $purchaseTime is the time stamp of this purchase of this receipt
 * of the format: 2014-02-04T21:12:31+0000
 */
var purchaseTime;

/*
 * $developerPayload is the Developer Payload the client pass when initiate the purchase 
 * We echo back to you here
 */
var developerPayload;

function LoyaltyRedemptionReceipt() {
}

LoyaltyRedemptionReceipt.prototype.getClientId = function(){
  return clientId;
}

LoyaltyRedemptionReceipt.prototype.setClientId = function(c){
  clientId = c;
}

LoyaltyRedemptionReceipt.prototype.getPlayerId = function(){
  return playerId;
}

LoyaltyRedemptionReceipt.prototype.setPlayerId = function(p){
  playerId = p;
}

LoyaltyRedemptionReceipt.prototype.getProductId = function(){
  return productId;
}

LoyaltyRedemptionReceipt.prototype.setProductId = function(p){
  productId = p;
}

LoyaltyRedemptionReceipt.prototype.getPrice = function(){
  return price;
}

LoyaltyRedemptionReceipt.prototype.setPrice = function(p){
  price = p;
}

LoyaltyRedemptionReceipt.prototype.getStatus = function(){
  return status;
}

LoyaltyRedemptionReceipt.prototype.setStatus = function(s){
  status = s;
}

LoyaltyRedemptionReceipt.prototype.getTransactionId = function(){
  return transactionId;
}

LoyaltyRedemptionReceipt.prototype.setTransactionId = function(t){
  transactionId = t;
}

LoyaltyRedemptionReceipt.prototype.getPurchaseTime = function(){
  return purchaseTime;
}

LoyaltyRedemptionReceipt.prototype.setPurchaseTime = function(p){
  purchaseTime = p;
}

LoyaltyRedemptionReceipt.prototype.getDeveloperPayload = function(){
  return developerPayload;
}

LoyaltyRedemptionReceipt.prototype.setDeveloperPayload = function(d){
  developerPayload = d;
}

module.exports = LoyaltyRedemptionReceipt
