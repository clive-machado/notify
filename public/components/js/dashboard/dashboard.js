module.exports = function(app) {
	app.controller('dashboard', [ 
		'$scope', 
		'$state', 
		'$rootScope', 
		'$cookies', 
		function ($scope, $state, $rootScope, $cookies) {
		$scope.navOne = true 
		$scope.navTwo = false	
		$scope.navButtonLogout = 'Logout'	
		$scope.title = $cookies.get('fname') + " " + $cookies.get('lname')
		$scope.loggedInAs = false
		$scope.email = $cookies.get('email')
		$scope.logout = function() {
			$rootScope.array = []
      $cookies.remove('auth')
      $cookies.remove('uid')
      $cookies.remove('fname')
      $cookies.remove('lname')
      $cookies.remove('email')
      new PNotify({
        title: 'User Logged out',
        type: 'success',
        animate_speed: 'fast'
      });
			$state.go('login')
		}
    $scope.onDropComplete = function(index, data, evt) {
      var otherObj = $rootScope.array[index]
      var otherIndex = $rootScope.array.indexOf(data)
      $rootScope.array[index] = data
      $rootScope.array[otherIndex] = otherObj
    }
	}])
}