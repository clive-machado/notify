module.exports = function(app) {
	app.run(['$rootScope', '$state', 'getFactory', '$cookies', function ($rootScope, $state, getFactory, $cookies) {		
		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {	
			if(toState.views.data.requiredLogin && angular.isUndefined($cookies.get('auth')))
				event.preventDefault()
			if(!angular.isUndefined($cookies.get('auth'))) 
				getFactory.tasks()
		})
	}])
}