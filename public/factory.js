var rest = require('../lib/utilities/restfullservice.js')
var utils = require('../lib/utilities/utils.js')

module.exports = function (app) {
	app.factory('getFactory',[ '$rootScope', '$cookies', function ($rootScope, $cookies) {
		return { 
			eachTasks : function () {

			},
				tasks : function () {
					utils.setHeader('application_api_key','bltf3d1aceb32d4fb7a')
					// $rootScope.mainPageSpinner = true
					rest.restfullService(utils.getUrl('/classes/tasks/objects'), 'GET', utils.getHeaders(), null)
		      .then(function(data) {
						$rootScope.mainPageSpinner = false
		      	$rootScope.array = []
		      	$rootScope.checkedArray = []
			      for(var i=0; i < data.objects.length; i++) {    	
			      	if($cookies.get('uid') === data.objects[i].user_reference) {
			      		if(data.objects[i].status === true){
			      			$rootScope.checkedArray.unshift(data.objects[i])
			      			$rootScope.checkedArray.sort(function(a, b) {							  
								  	return new Date(b.created_at) - new Date(a.created_at)
									})
			      		}
			      		else {
				      		$rootScope.array.unshift(data.objects[i])
				      		$rootScope.array.sort(function(a, b) {							  
									  return new Date(b.created_at) - new Date(a.created_at)
									})
			      		}
			      	}
			      }
		      	$rootScope.$apply()
	      })
			}
		}
	}])

	app.factory('clickEvent', [ '$cookies', 'getFactory', '$rootScope', function($cookies, getFactory, $rootScope) {
    return {
    	isKeyEnter : function (event) {
	      if(event.keyCode === 13)
        	return true
    	},
    	isLogged : function () {
    		if(angular.isDefined($cookies.get('auth')))
    			return true
    	},
      checkbox : function () {
      	$rootScope.button = true	
      }, 
      activate : function (token, uid) {
      	utils.setHeader('application_api_key','bltf3d1aceb32d4fb7a')
				utils.setHeader('content-type','application/json')
				return rest.restfullService(utils.getUrl('/application/users/' + uid + '/activate/' + token), 'GET', utils.getHeaders(), null)
		    .then(function(data){     	
		    	return data
				})
      },
      add : function (usertext) {
				utils.setHeader('application_api_key','bltf3d1aceb32d4fb7a')
				utils.setHeader('content-type','application/json')
				var data = {
					object :  {
						'user_reference' : $cookies.get('uid'),
							'task_text' : usertext,
						'status' : false
					}
				}
		    return rest.restfullService(utils.getUrl('/classes/tasks/objects'), 'POST', utils.getHeaders(), data)
		    .then(function(data){     	
		    	getFactory.tasks()
		    	return data
				})
      },
      delete : function (uid) {      	
				utils.setHeader('application_api_key','bltf3d1aceb32d4fb7a')
      	return rest.restfullService(utils.getUrl('/classes/tasks/objects/' + uid), 'DELETE', utils.getHeaders(), null)
		    .then(function(data){     	
		    	getFactory.tasks()
		    	return data
				})
      },
      update : function (uid,  body, index) {
      	var data = {
      		"object" : body
      	}
				utils.setHeader('application_api_key','bltf3d1aceb32d4fb7a')
		   	return new Promise (function (resolve, reject) {
	      	rest.restfullService(utils.getUrl('/classes/tasks/objects/' + uid), 'PUT', utils.getHeaders(), data)
			    .then(function(data){     	
			    	getFactory.tasks()
			    	resolve(data)
					})
				})
      },
      signup : function(user) {
      	var data = {
      		"application_user": {
		        "username" : user.username,
		        "email": user.email,
		        "first_name": user.fname,
		        "last_name": user.lname,
		        "password": user.password,
		        "password_confirmation": user.confirm_password
    			}
      	}
      	utils.setHeader('application_api_key','bltf3d1aceb32d4fb7a')
				utils.setHeader('content-type','application/json')
      	return new Promise (function (resolve, reject) {
	      	rest.restfullService(utils.getUrl('/application/users'), 'POST', utils.getHeaders(), data)
			    .then(function(data){     	
			    	resolve(data)
					})
		  	})
      },
      onGoogleSignIn : function (accessToken) {
      	var data = {
      		"application_user": {
      			"auth_data": {
              "google": {
               	"access_token": accessToken
              }
          	}
      		}
      	}
      	utils.setHeader('application_api_key','bltf3d1aceb32d4fb7a')
				utils.setHeader('content-type','application/json')
      	return new Promise (function (resolve, reject) {
	      	rest.restfullService(utils.getUrl('/application/users'), 'POST', utils.getHeaders(), data)
			    .then(function(data){     	
			    	resolve(data)
					})
		  	})
      }
    }
  }])

}