var request = require('request')

module.exports.restfullService = function (url, method, headers, data) {
	if (!url) 
		throw new Error('http url not found')
	if (!method)
		throw new Error('Http method is not found')
	if (!headers) 
		throw new Error('http headers not found')

	var options = {}	
	options.url = url
	options.method = method
	options.headers = headers
	if (data) {
		options.body = data
 		options.json = true	
 	}

	return new Promise(function (resolve, reject) {
		request(options, function (err, res, body) {
			if(err)
				reject(err)
			if(typeof body === 'string')
				body = JSON.parse(body)
			resolve (body)
		})
	})
}