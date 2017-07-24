///////////////////////////////////////////////////////////////
/* This is the starting point of the application server
//////////////////////////////////////////////////////////////

/**
 * Required Express web application framework and created a instance in variable app
 */
var express			=	require('express')
var app 				= express()

/**
 * Middleware to serve static files in the Public folder
 */
app.use(express.static('public'))

/**
 * Server listneing on port 9000
 * @param 	INT 9000 		[Port Number]
 * @param 	Callback    [Consoles the port at which Server is created]
 */
app.listen(9000, () => {
	console.log('\x1b[36m','Server listening on port','\x1b[1m', '\x1b[37m', '9000', '\x1b[0m')
	console.log(' Server Open at : ', '\x1b[33m', '\x1b[1m', 'http://localhost:9000', '\x1b[0m')
})