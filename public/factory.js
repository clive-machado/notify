var rest = require('../lib/utilities/restfullservice.js')
var utils = require('../lib/utilities/utils.js')

module.exports = function (app) {
	app.factory('getFactory',[ '$rootScope', '$cookies', function ($rootScope, $cookies) {
		return { 
				tasks : function () {
					utils.setHeader('application_api_key','bltf3d1aceb32d4fb7a')
					rest.restfullService(utils.getUrl('/classes/tasks/objects'), 'GET', utils.getHeaders(), null)
		      .then(function(data) {
		      	$rootScope.array = []
			      for(var i=0; i <= (data.objects.length - 1); i++) {    	
			      	if($cookies.get('uid') === data.objects[i].user_reference)
			      		$rootScope.array.push(data.objects[i])
			      }
		      	$rootScope.$apply()
	      })
			}
		}
	}])

	app.factory('clickEvent',[ '$cookies', 'getFactory', function($cookies, getFactory) {
    return {
      checkbox : function () {

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
		    rest.restfullService(utils.getUrl('/classes/tasks/objects'), 'POST', utils.getHeaders(), data)
		    .then(function(data){     	
		    	getFactory.tasks()
				})
      },
      delete : function () {      	
      	var uid = ""
				utils.setHeader('application_api_key','bltf3d1aceb32d4fb7a')
      	rest.restfullService(utils.getUrl('/classes/tasks/objects?uid=' + uid), 'DELETE', utils.getHeaders(), data)
		    .then(function(data){     	
		    	getFactory.tasks()
				})
      }
    }
  }])

}