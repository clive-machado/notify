
var angular 						= require('angular')
var ui_router 					= require('angular-ui-router')
var request 						= require('request')
var routes 							= require('./')
var app = angular.module('matriarch', ['ui.router'])

var a = null

app.controller('mainApp', ['$scope', function ($scope) {
	$scope.homeHeading = "Welcome to the Gaurdian of the Notes"
	$scope.bannerline = "We are from the Galaxy Galafray our services will help you build things your slimy little brain forgets. So go ahead and Sign In." 
	$scope.login = 'Login'
	$scope.register = 'Register'
}])

app.controller('dashboard', function ($scope) {
	$scope.login = 'Register'	
	$scope.register = 'Logout'
})

app.config( function ($stateProvider, $locationProvider, $urlRouterProvider) {
	$locationProvider.hashPrefix('')
	// $rootScope.$on("$stateChangeError", console.log.bind(console));

	$stateProvider
	.state('home', { 
		url : '/home',
		views: 
		{ 
			'' : {
				templateUrl : '/components/header.html',				
			},
			'navbar@home' : {
				templateUrl : '/components/navbar.html'
			}
		}	
	})
	
	$stateProvider
	.state('login', {
		url : '/Login',
		views: 
		{ 
			'' : {
				templateUrl : '/components/login.html',				
			},
			'navbar@login' : {
				templateUrl : '/components/navbar.html'
			}
		}	
	})
	
	$stateProvider
	.state('register', {
		url : '/Register',
		views: 
		{ 
			'' : {
				templateUrl : '/components/register.html',				
			},
			'navbar@register' : {
				templateUrl : '/components/navbar.html'
			}
		}
	})

	$stateProvider
	.state('dashboard', {
		url : '/dashboard',
		views: 
			{ 
				'' : {
				templateUrl : function redirect ($stateParams) {
				if ( a != null )
					{	
						// console.log('sadas');	
						return '/components/dashboard.html'
					}
				},
			},
			'navbar@dashboard' : {
				templateUrl : '/components/navbar.html',
				controller : 'dashboard'	
			}
		},	
	})
 
	$urlRouterProvider
	.otherwise('/home')

})

app.controller('loginApp', ['$scope', '$state', ($scope, $state, loginService) => {
	
	$scope.login = function (uname, pass){
    var opt = {
    	url : "https://api.built.io/v1/application/users/login",
    	method : "post",
    	headers : { 
    		'application_api_key' : 'bltf3d1aceb32d4fb7a',
    		'content-type' : 'application/json'
    	},
    	form : {
    		"application_user": {
    			"username" : uname,
    			"password" : pass
  			}
    	}
    }
		request(opt, function (err, res, body){
			if (typeof body == "string")
        body = JSON.parse(body)
      	if(body.error_message)
      		alert(body.error_message)
      	if(body.application_user){
      		a = body.application_user.authtoken
      		$state.go('dashboard')	
      	}
		})
	}
}])
