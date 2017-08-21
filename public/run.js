module.exports = function(app) {
	app.run([
		'$rootScope', 
		'$state', 
		'getFactory', 
		'$cookies', 
		'$location',
		function ($rootScope, $state, getFactory, $cookies, $location) {		
		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {	
			if(toState.views.data.requiredLogin && angular.isUndefined($cookies.get('auth')))
				event.preventDefault()
			if(!angular.isUndefined($cookies.get('auth'))) 
				getFactory.tasks()
			if($location.path() === "/Activate" && !toState.views.data.requiredLogin && !$location.search().code && !$location.search().token)
				event.preventDefault()
		})
	}])
}