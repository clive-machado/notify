module.exports = function (app) {
	app.controller('task', ['$scope', '$state', '$rootScope', 'clickEvent', '$cookies', function ($scope, $state, $rootScope, clickEvent, $cookies) {
    $scope.buttons = {
      edit : "Edit",
      delete : "Delete"
    }
    $scope.button = false
    $scope.add = function(usertext) {
      clickEvent.add(usertext)
    }
  }])

  app.directive('repeat', function () {
    return {
      templateUrl: '/components/repeat.html'
    }
  })
}