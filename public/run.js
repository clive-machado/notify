module.exports = function(app) {
	app.run(['$rootScope', main])
}

function main ($rootScope) {
	$rootScope.$on('$stateChangeStart', isAuth)
	console.log('asdasdas')
}

function isAuth(event, toState) {
	console.log(event)
	console.log(toState)
	if(toState.views.data.requiredLogin)
	{
		event.preventDefault()
	}
}