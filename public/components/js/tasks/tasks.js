module.exports = function (app) {
	app.controller('task', [
    '$scope', 
    '$state', 
    '$rootScope', 
    'clickEvent', 
    '$cookies',
    '$timeout',
    '$stateParams',
    'getFactory',
    '$timeout',
    function ($scope, $state, $rootScope, clickEvent, $cookies, $timeout, $stateParams, getFactory, $timeout) {
      
      $scope.displayChecked = '';
      
      /**
       * Refresh Button
       */
      $scope.reload = function () {
        $state.transitionTo($state.current, $stateParams, {
          reload: true,
          inherit: false,
          notify: true
        })
        $rootScope.spin = "spinning"
      }

      /**
       * Enter Key to Add Task
       */
      $scope.keyEnter = function (event) {
        if(clickEvent.isKeyEnter(event) === true)
          $scope.add($scope.inputText)
      }

      /**
       * Currently Not in Use
       */
      $scope.keyEnterUpdate = function (event, uid, text, index) {
        if(clickEvent.isKeyEnter(event) === true)
          $scope.makeTaskTextEditor(uid, text, index)
      }

      /**
       * Check all Tasks Button
       */
      $scope.checkAll = function () {
        $scope.allCompleteDisabled = true
        $scope.syncButtonSpin = true
        if($rootScope.array.length <= 0){
          $scope.allCompleteDisabled = true
          $scope.syncButtonSpin = false  
        }
        for(var i = 0; i < $rootScope.array.length; i++) {
          $scope.toCheck($rootScope.array[i].uid, true, $rootScope.array[i].task_text, null, true)
        }
      }

      $scope.getActiveOrCompleted = function (param) {
        $scope.displayChecked = param; 
      }

      /**
       * UnCheck all Tasks Button
      */
      $scope.uncheckAll = function () {
        $scope.allIncompleteDisabled = true
        $scope.syncButtonSpin = true
        if($rootScope.checkedArray.length <= 0){
          $scope.allIncompleteDisabled = true
          $scope.syncButtonSpin = false  
        }    
        for(var i = 0; i < $rootScope.checkedArray.length; i++) {
          $scope.toCheck($rootScope.checkedArray[i].uid, false, $rootScope.checkedArray[i].task_text, null, true)
        }  
      }

      $scope.toCheck = function (uid, status, task, index, checkAll) {
        var isUserLogged = clickEvent.isLogged()
        if(isUserLogged === true) {
          var body = {
            "status" : status
          }
          var userClick = 0
          $scope.checkDisable = true
          if(userClick <= 0 || checkAll === true) { 
            userClick++
            $scope.onUpdateCall(uid, body, index)
            .then(function(data) {
              if(($rootScope.array.length < 0 === false) && checkAll === true){
                $scope.allCompleteDisabled = false
                $scope.allCompleteShow = true 
                $scope.syncButtonSpin = false    
              }
              if(($rootScope.checkedArray.length < 0 === false) && checkAll === true){
                $scope.allIncompleteDisabled = false
                $scope.syncButtonSpin = false    
              }
              $scope.syncButtonSpin = false      
              $scope.checkDisable = false
              userClick = 0
              if(status === true && checkAll != true) {
                $scope.notify.noteTemplate("Task Completed", task, "info", "fa fa-flag-checkered")
              }
              if (status === false && checkAll != true)
                $scope.notify.noteTemplate("Task Unchecked", task, "info", "fa fa-times")
            })
          }
        }
        else {
          $scope.notify.noteTemplate("Error!", "Could not save, maybe you Logged out?", "error", "fa fa-fa-exclamation-triangle")
          $state.go('login')
        }
      }

      $scope.clearChecked = function() {
        if(angular.isDefined($rootScope.checkedArray.length)){   
          var isUserLogged = clickEvent.isLogged()
          if(isUserLogged === true) {
            for(var i = 0; i < $rootScope.checkedArray.length; i++) {
              $scope.deleteDisabled = true
              $scope.clearCheckDisabled = true
              var uid = $rootScope.checkedArray[i].uid
              clickEvent.delete(uid)
              .then(function(data) {
                $scope.syncButtonSpin = false
                $scope.deleteDisabled = false
                if(data.notice){
                  if($rootScope.checkedArray.length > 0) {
                    $scope.clearCheckDisabled = false  
                    $scope.notify.noteTemplate("Completed Tasks Cleared", data.notice, "info", "fa fa-trash-o")
                    $rootScope.checkedArray = []
                  }
                }
                if(data.errors){
                  $scope.clearCheckDisabled = false    
                  $scope.notify.noteTemplate("Something went Wrong", data.error_message, "error", "fa fa-fa-exclamation-triangle")
                }
              })
            }
            $scope.clearCheckDisabled = false
          }
          else{          
            $scope.notify.noteTemplate("Error", "Could not delete task, maybe you Logged out?", "error", "fa fa-fa-exclamation-triangle")
            $state.go('login')
          }
        }
      }

      $scope.toDeleteTask = function (uid, task, index, status) {
        var userClick = 0        
        var isUserLogged = clickEvent.isLogged()
        if(isUserLogged === true) {
          if(userClick <= 0) { 
            userClick++
            $scope.deleteDisabled = true
            $scope.syncButtonSpin = true  
            clickEvent.delete(uid)
            .then(function(data){
              userClick = 0
              if(data.notice){
                if(status === true) {
                  $rootScope.checkedArray.splice(index, 1)
                }
                if(status === false) {
                  $rootScope.array.splice(index, 1)
                }
                $scope.syncButtonSpin = false
                $scope.deleteDisabled = false
                $scope.notify.noteTemplate("Task Deleted", data.notice, "info", "fa fa-trash-o")
              }
              if(data.errors){
                $scope.syncButtonSpin = false
                $scope.deleteDisabled = false
                $scope.notify.noteTemplate("Task not deleted", data.error_message, "error", "fa fa-fa-exclamation-triangle")
              }
            })
            userClick = 0  
            $scope.syncButtonSpin = false
          }
        }
        else {
          $scope.notify.noteTemplate("Error", "Could not delete task, maybe you Logged out?", "error", "fa fa-fa-exclamation-triangle")
          $state.go('login')
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
            $scope.notify.noteTemplate("Error!", "Could not update task, maybe you Logged out?", "error", "fa fa-fa-exclamation-triangle")
            $state.go('login')
          }
      }
      
      $scope.add = function(usertext) {
        $scope.allCompleteDisabled = false  
        $scope.allIncompleteDisabled = false
        $scope.clearCheckDisabled = false      
        var isUserLogged = clickEvent.isLogged()
          if(isUserLogged === true) {
           if(usertext === "" || angular.isUndefined(usertext)) { 
              $scope.notify.noteTemplate("Error!", "Empty! Add something dummy!", "error", "fa fa-fa-exclamation-triangle")
              return 
            }
            $scope.taskButtonSpin = true
            var userClick = 0
            $scope.addDisable = true
            if(userClick <= 0 ) { 
              userClick++
              clickEvent.add(usertext)
              .then(function(data) {
                $scope.addDisable = false
                $scope.notify.noteTemplate("Task Added", usertext, "success", "fa fa-check-square-o")
                $scope.taskButtonSpin = false
                $scope.inputText = ""
              })
            }
          }
          else {
            $scope.notify.noteTemplate("Error!", "Could not Add Task, maybe you Logged out?", "error", "fa fa-fa-exclamation-triangle")
            $state.go('login')
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
          var userClick = 0          
          if (userClick < 4) {
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
            userClick++
          }
          else {
            userClick = 0   
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
}