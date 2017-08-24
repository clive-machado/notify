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
      var userClicks = 0
      // $scope.allCompleteShow = true 

      // $scope.CompleteInit = function () {
      //   // getFactory.tasks()
      //   $timeout(function() {
      //     console.log('check array', $rootScope.checkedArray);
      //     if(angular.isDefined($rootScope.checkedArray)){
      //       if($rootScope.checkedArray.length >= 0){
      //         $scope.allCompleteShow = true
      //       }
      //       else {
      //         $scope.allCompleteShow = false
      //       }
      //     }
      //     else {
      //       $scope.allCompleteShow = false
      //     }
      //   }, 2000);
      // }

      // $scope.IncompleteInit = function () {
      //   // getFactory.tasks()
      //   $timeout(function() {
      //     console.log('array', $rootScope.array);
      //     if(angular.isDefined($rootScope.array)){
      //       if($rootScope.array.length >= 0){
      //         $scope.allIncompleteShow = true
      //         console.log('in arr', $scope.allIncompleteShow);
      //       }
      //       else {
      //         $scope.allIncompleteShow = false
      //       }
      //     }
      //     else {
      //       $scope.allIncompleteShow = false
      //     }
      //   }, 2000);
      // }

      $scope.reload = function () {
        $state.transitionTo($state.current, $stateParams, {
          reload: true,
          inherit: false,
          notify: true
        })
        $rootScope.spin = "spinning"
      }


      // $scope.areTheyChecked = function () {
      //   var checkedArr = $rootScope.checkedArray
      //   $scope.emptyMessage = true
      //   if(angular.isDefined(checkedArr)) {
      //     if(checkedArr.length <= 0 ){
      //       $scope.isAnyChecked = false
      //     }
      //     if(checkedArr.length >= 1 ){
      //       $scope.isAnyChecked = true
      //     }
      //   }
      //   if(angular.isUndefined(checkedArr)) {
      //       $scope.isAnyChecked = false
      //   }
      // }

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

      $scope.keyEnterUpdate = function (event, uid, text, index) {
        if(clickEvent.isKeyEnter(event) === true)
          $scope.makeTaskTextEditor(uid, text, index)
      }

      $scope.checkAll = function () {
        // $scope.notify.noteTemplate("Syncing ...", "", "", "fa fa-spinner spinning")
        $scope.allCompleteDisabled = true
        $scope.syncButtonSpin = true
        // $scope.allCompleteShow = false 
        if($rootScope.array.length <= 0){
          $scope.allCompleteDisabled = true
          $scope.syncButtonSpin = false  
        }
        for(var i = 0; i < $rootScope.array.length; i++) {
          $scope.toCheck($rootScope.array[i].uid, true, $rootScope.array[i].task_text, null, true)
        }
        // var isUserLogged = clickEvent.isLogged()
        // if(isUserLogged === true) {
        //   var body = {
        //     "status" : status
        //   }            
        //   $scope.onUpdateCall(uid, body, index)
        //   .then(function(data) {

        //   })
        // }
        // else {
        //   $scope.notify.noteTemplate("Error!", "Could not save, maybe you Logged out?", "error", "fa fa-fa-exclamation-triangle")
        //   $state.go('login')
        // }
      }

      $scope.uncheckAll = function () {
       // $scope.notify.noteTemplate("Syncing ...", "", "", "fa fa-spinner spinning")
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
          // $scope.notify.noteTemplate("Syncing ...", "", "", "fa fa-spinner spinning") 
          var userClick = 0
          $scope.checkDisable = true
          if(userClick <= 0 || checkAll === true) { 
            userClick++
            $scope.onUpdateCall(uid, body, index)
            .then(function(data) {
              console.log($rootScope.array.length, "length")
              if(($rootScope.array.length < 0 === false) && checkAll === true){
                $scope.allCompleteDisabled = false
                $scope.allCompleteShow = true 
                // $scope.notify.noteTemplate("All Tasks Completed", task, "info", "fa fa-flag-checkered")
                $scope.syncButtonSpin = false    
              }
              if(($rootScope.checkedArray.length < 0 === false) && checkAll === true){
                $scope.allIncompleteDisabled = false
                // $scope.notify.noteTemplate("Task All Unchecked", task, "info", "fa fa-times")
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
        // $scope.notify.noteTemplate("Syncing ...", "", "", "fa fa-spinner spinning") 
        // $scope.clearCheckDisabled = true
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
        var isUserLogged = clickEvent.isLogged()
        if(isUserLogged === true) {
          var userClick = 0
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