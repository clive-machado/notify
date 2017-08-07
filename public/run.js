module.exports = function(app) {
	app.run(['$rootScope', '$state', main])
}

function main ($rootScope, $state) {
	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {	
		if(toState.views.data.requiredLogin && angular.isUndefined($rootScope.auth))
			event.preventDefault()
	})
}