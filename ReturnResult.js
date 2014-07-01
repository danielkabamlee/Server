//private members

/*
 * response is the response body of the return result.
 */
 var response;

/*
 * returnCode is the http response code of the return result
 */
var returnCode;

/*
 * success is a boolean value specify if the operation is
 *   success or not.
 */
var success;

//constructor
function ReturnResult() {
}


// public functions
ReturnResult.prototype.getSuccess = function(){
  return success;
};

ReturnResult.prototype.setSuccess = function(s) {
  success = s;
};

ReturnResult.prototype.getResponse = function(){
  return response;
};

ReturnResult.prototype.getReturnCode = function() {
  return returnCode;
};

ReturnResult.prototype.setResponse = function(r) {
  response = r;
};

ReturnResult.prototype.setReturnCode = function(r) {
  returnCode = r;
};

module.exports = ReturnResult
