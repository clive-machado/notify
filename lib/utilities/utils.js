var ArrKey = []
var ArrValue = [] 

module.exports.getUrl = function (path) {
	return 'https://api.built.io/v1' +  path
}

module.exports.setHeader = function (key, value) {
  ArrKey.push(key)
  ArrValue.push(value)
}

module.exports.getHeaders = function () {
  var headers = {}
  for(i=0; i <= (ArrKey.length - 1); i++) {
    headers[ArrKey[i]] = ArrValue[i]
  }
  return headers
}
