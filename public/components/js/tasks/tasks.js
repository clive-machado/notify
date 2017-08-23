module.exports = function (app) {
	app.controller('task', [
    '$scope', 
    '$state', 
    '$rootScope', 
    'clickEvent', 
    '$cookies',
    '$timeout',
    function ($scope, $state, $rootScope, clickEvent, $cookies, $timeout) {
      var userClicks = 0

      $scope.checkAll = function () {
        $scope.notify.noteTemplate("Syncing ...", "", "", "fa fa-spinner spinning")    
        for(var i = 0; i < $rootScope.array.length; i++) {
          $scope.toCheck($rootScope.array[i].uid, true, $rootScope.array[i].task_text)
        }
      }

      $scope.uncheckAll = function () {
       $scope.notify.noteTemplate("Syncing ...", "", "", "fa fa-spinner spinning")    
        for(var i = 0; i < $rootScope.checkedArray.length; i++) {
          $scope.toCheck($rootScope.checkedArray[i].uid, false, $rootScope.checkedArray[i].task_text)
        } 
      }

      $scope.areTheyChecked = function () {
        var checkedArr = $rootScope.checkedArray
        $scope.emptyMessage = true
        if(angular.isDefined(checkedArr)) {
          if(checkedArr.length <= 0 ){
            $scope.isAnyChecked = false
          }
          if(checkedArr.length >= 1 ){
            $scope.isAnyChecked = true
          }
        }
        if(angular.isUndefined(checkedArr)) {
            $scope.isAnyChecked = false
        }
      }

      $scope.clearChecked = function() {
        $scope.notify.noteTemplate("Syncing ...", "", "", "fa fa-spinner spinning")    
        for(var i = 0; i < $rootScope.checkedArray.length; i++) {
          $scope.toDeleteTask($rootScope.checkedArray[i].uid, $rootScope.checkedArray[i].task_text)
        }
      }

      $scope.getActiveOrCompleted = function (param) {
        if(param === 'hello') {
          $scope.istheCheckedArray = true
          $scope.istheUnCheckedArray = false
        }
        if(param === 'hell') {
          $scope.istheUnCheckedArray = true
          $scope.istheCheckedArray = false
        }
        if(param === '') {
          $scope.istheUnCheckedArray = false
          $scope.istheCheckedArray = false
        }
      }

      $scope.keyEnter = function (event) {
        if(clickEvent.isKeyEnter(event) === true)
          $scope.add($scope.inputText)
      }

      $scope.toDeleteTask = function (uid, task) {
        var isUserLogged = clickEvent.isLogged()
        if(isUserLogged === true) {
          $scope.syncButtonSpin = true
          clickEvent.delete(uid)
          .then(function(data){
            $scope.syncButtonSpin = false
            $scope.notify.noteTemplate("Task Deleted", task, "", "fa fa-trash-o")
            $scope.areTheyChecked()
          })
        }
        else {
          $scope.go('login')
          $scope.notify.noteTemplate("Error", "Could not delete task, maybe you Logged out?", "error", "fa fa-fa-exclamation-triangle")
        }
      }

      $scope.toCheck = function (uid, status, task, index) {
        var isUserLogged = clickEvent.isLogged()
          if(isUserLogged === true) {
            var body = {
              "status" : status
            }
            $scope.notify.noteTemplate("Syncing ...", "", "", "fa fa-spinner spinning")    
            $scope.onUpdateCall(uid, body, index)
            .then(function(data) {
             $scope.areTheyChecked()
              if(status === true) {
                $scope.notify.noteTemplate("Task Completed", task, "info", "fa fa-flag-checkered")
              }
              if (status === false)
                $scope.notify.noteTemplate("Task Unchecked", task, "info", "fa fa-times")
            })
          }
          else {
            $scope.go('login')
            $scope.notify.noteTemplate("Error!", "Could not save, maybe you Logged out?", "error", "fa fa-fa-exclamation-triangle")
          }
      }

      $scope.makeTaskTextEditor = function (uid, text, indexOfElement) {
        var isUserLogged = clickEvent.isLogged()
          if(text === "") {
            $scope.notify.noteTemplate("Error!", "Can't save empty task!", "error", "fa fa-fa-exclamation-triangle")
            return 
          }
          if(isUserLogged === true) {
            var body = {
              "task_text" : text
            }
            $scope.syncButtonSpin = true
            $scope.onUpdateCall(uid, body, indexOfElement)
            .then(function(data) {
              $scope.syncButtonSpin = false
              $scope.notify.noteTemplate("Updated Task", text, "info", "fa fa-pencil-square-o")
            })
          }
          else {
            $scope.go('login')
            $scope.notify.noteTemplate("Error!", "Could not update task, maybe you Logged out?", "error", "fa fa-fa-exclamation-triangle")
          }
      }
      
      $scope.add = function(usertext) {
        var isUserLogged = clickEvent.isLogged()
          if(isUserLogged === true) {
           if(usertext === "" || angular.isUndefined(usertext)) { 
              $scope.notify.noteTemplate("Error!", "Empty! Add something dummy!", "error", "fa fa-fa-exclamation-triangle")
              return 
            }
            $scope.taskButtonSpin = true
            clickEvent.add(usertext)
            .then(function(data) {
              $scope.notify.noteTemplate("Task Added", usertext, "success", "fa fa-check-square-o")
              $scope.taskButtonSpin = false
              $scope.inputText = ""
            })
          }
          else {
            $scope.go('login')
            $scope.notify.noteTemplate("Error!", "Could not Add Task, maybe you Logged out?", "error", "fa fa-fa-exclamation-triangle")
          }
      }

      $scope.onUpdateCall = function (uid, body, index) {
        var updateCount = 0
        if(updateCount <= 50) {
          return clickEvent.update(uid, body, index)
        }
        return
      }
    
      $scope.notify = {
        noteTemplate : function (noteTitle, noteText, noteType, noteIcon) {
          if (userClicks < 4) {
            var notice = new PNotify({
              title: noteTitle,
              text: noteText,
              type: noteType,
              icon: noteIcon,
              animate_speed: 'fast',
              buttons: {
                sticker: true
              }
            })
            notice.get().click(function() {
              notice.remove()
            })
            $timeout(function() {
              PNotify.removeAll()
            }, 1000)
            userClicks++
          }
          else {
            userClicks = 0   
            PNotify.removeAll()
          }
        }
      }
    }])
 
  app.directive('repeat', function () {
    return {
      templateUrl: '/components/repeat.html'
    }
  })


  app.directive('ngEnter', function () {
    return function () {
      
    }
    // return function (scope, element, attrs) {
    //     element.bind("keydown keypress", function (event) {
    //         if(event.which === 13) {
    //           scope.$apply(function (){
    //               scope.$eval(attrs.myEnter)
    //           })
    //           event.preventDefault()
    //         }
    //     })
    // }
  })

}