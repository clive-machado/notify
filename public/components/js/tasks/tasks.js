module.exports = function (app) {
	app.controller('task', [
    '$scope', 
    '$state', 
    '$rootScope', 
    'clickEvent', 
    '$cookies',
    '$timeout', 
    function ($scope, $state, $rootScope, clickEvent, $cookies, $timeout) {
      $scope.toDeleteTask = function (uid) {
        var isUserLogged = clickEvent.isLogged()
          if(isUserLogged === true) {
            clickEvent.delete(uid)
            .then(function(data){
              $scope.delete()
            })
          }
          else {
            $scope.error()
          }
      }

      $scope.toCheck = function (uid, status) {
        var isUserLogged = clickEvent.isLogged()
          if(isUserLogged === true) {
            var body = {
              "status" : status
            }
            $scope.onUpdateCall(uid, body)
            .then(function(data) {
              $scope.update()
            })
          }
          else {
            $scope.error()
          }
      }

      $scope.makeTaskTextEditor = function (uid, data) {
        var isUserLogged = clickEvent.isLogged()
          if(isUserLogged === true) {
            if(data === true) {
              new PNotify({
                title: 'Error!',
                text: 'Empty Input',
                type: 'error'
              });
              return 
            }
            var body = {
              "task_text" : data
            }
            $scope.onUpdateCall(uid, body)
            .then(function(data) {
              $scope.update()
            })
          }
          else {
            $scope.error()
          }
      }
      
      $scope.add = function(usertext) {
        var isUserLogged = clickEvent.isLogged()
          if(isUserLogged === true) {
           if(angular.isString(usertext) != true) {
              new PNotify({
                title: 'Error!',
                text: 'Empty Input',
                type: 'error'
              });
              return 
            }
            $scope.taskButtonSpin = true
            clickEvent.add(usertext)
            .then(function(data) {
              $scope.success()
              $scope.taskButtonSpin = false
            })
          }
          else {
            $scope.error()
          }
      }

      $scope.onUpdateCall = function (uid, body) {
        var updateCount = 0
        if(updateCount <= 50) {
          return clickEvent.update(uid, body)
        }
        return
      }
    
      $scope.success = function () {
        new PNotify({
          title: 'Added Task',
          type: 'success',
          animate_speed: 'fast'
        });
      }

      $scope.update = function () {
        new PNotify({
            title: 'Updated',
            type: 'info',
            animate_speed: 'fast'
        });
      }

      $scope.error = function () {
        new PNotify({
          title: 'Error!',
          text: 'Something went wrong',
          type: 'error'
        });
      }
      
      $scope.delete = function () {
          new PNotify({
            title: 'Task Deleted!',
            animate_speed: 'fast'
          });
        }
    }])

 
  app.directive('repeat', function () {
    return {
      templateUrl: '/components/repeat.html'
    }
  })
}
