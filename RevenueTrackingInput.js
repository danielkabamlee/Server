/*
 * Please pass in everything as string
 * Price as Integer that is (base price) * 1000000
 */

/*
 * transactionId:
 *   The unique id of this transaction.
 *   We will accept a transaction with the same transactionId once
 *     from the client endpoint and once from the server endpoint
 *     and then disregard any further duplicates.
 */
var transactionId;

/*
 * receipt:
 *   The receipt provided by the transaction service.
 */
var receipt;

/*
 * ip:
 *   The clients IP
 */
var ip;

/*
 * price:
 *   The amount of the transaction in the local currency that was used.
 *   Price as Integer that is (base price) * 1000000
 */
var price;

/*
 * currency:
 *   The currency that was used.
 *   This will use the three character ISO currency code.
 */
var currency;

/*
 * country:
 *   Is either the the phones registered country,
 *     the stores country or the users current country.
 *   This needs to be nailed down.
 *   This will use the 2 character ISO country code (Alpha-2)
 */
var country;

/*
 * transactionType:
 *   Type of the transaction: <payment, offer, subscription>
 */
var transactionType;

/*
 * provider:
 *   The payment provider. below is a common list,
 *     please notify kabam if you use a provider not in the list.
 *   <iTunes, GooglePlay, AmazonAppStore, Tapjoy, TrialPay>
 */
var provider;
/*
 * metadata:
 *   Optional data field (can be empty),
 *     for addtional data you want to store.
 */
var metadata;

//constructor
function RevenueTrackingInput() {
}

//public function
RevenueTrackingInput.prototype.getTransactionId = function(){
  return transactionId;
}

RevenueTrackingInput.prototype.setTransactionId = function(t) {
  transactionId = t;
}

RevenueTrackingInput.prototype.getReceipt = function(){
  return receipt;
}

RevenueTrackingInput.prototype.setReceipt = function(r) {
  receipt = r;
}

RevenueTrackingInput.prototype.getIp = function(){
  return ip;
}

RevenueTrackingInput.prototype.setIp = function(i) {
  ip = i;
}

RevenueTrackingInput.prototype.getPrice = function(){
  return price;
}

RevenueTrackingInput.prototype.setPrice = function(p) {
  price = p;
}

RevenueTrackingInput.prototype.setCurrency = function(c) {
  currency = c;
}

RevenueTrackingInput.prototype.getCurrency = function(){
  return currency;
}

RevenueTrackingInput.prototype.setCountry = function(c) {
  country = c;
}

RevenueTrackingInput.prototype.getCountry = function(){
  return country;
}

RevenueTrackingInput.prototype.setTransactionType = function(t) {
  transactionType = t;
}

RevenueTrackingInput.prototype.getTransactionType = function(){
  return transactionType;
}

RevenueTrackingInput.prototype.setProvider = function(p) {
  provider = p;
}

RevenueTrackingInput.prototype.getProvider = function(){
  return provider;
}

RevenueTrackingInput.prototype.setMetadata = function(m) {
  metadata = m;
}

RevenueTrackingInput.prototype.getMetadata = function(){
  return metadata;
}

RevenueTrackingInput.prototype.toJson = function() {
  var o = {
    transactionId: transactionId,
    receipt: receipt,
    ip: ip,
    price: price,
    currency: currency,
    country: country,
    transactionType: transactionType,
    provider: provider,
    metadata: metadata
  };
  return JSON.stringify(o);
}

module.exports = RevenueTrackingInput;
