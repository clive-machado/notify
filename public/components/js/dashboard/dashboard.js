module.exports = function(app) {
	app.controller('dashboard', [ 
		'$scope', 
		'$state', 
		'$rootScope', 
		'$cookies', 
		function ($scope, $state, $rootScope, $cookies) {
		$scope.navOne = true 
		$scope.navTwo = false	
		$scope.loggedInAs = false
		$scope.navButtonLogout = 'Logout'	
		$scope.title = $cookies.get('fname') + " " + $cookies.get('lname')
		$scope.email = $cookies.get('email')
		$scope.logout = function() { 
			$rootScope.array = []
			$rootScope.checkedArray = [] 
      $cookies.remove('auth')
      $cookies.remove('uid')
      $cookies.remove('fname')
      $cookies.remove('lname')
      $cookies.remove('email')
      var notice = new PNotify({
        title: 'User Logged out',
        type: 'success',
        animate_speed: 'fast',
	      buttons: {
	        sticker: true
	      }
      })
      notice.get().click(function() {
	      notice.remove()
	    })
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