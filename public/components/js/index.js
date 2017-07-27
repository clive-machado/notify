var angular 						= require('angular')
var ui_router 					= require('angular-ui-router')
var request 						= require('request')

var app = angular.module('matriarch', ['ui.router'])

app.config( ($stateProvider, $locationProvider, $urlRouterProvider) => {
	$locationProvider.hashPrefix('')

	$stateProvider
	.state('home', {
		url : '/home',
		templateUrl : '/components/header.html' 
	})

	$stateProvider
	.state('login', {
		url : '/login',
		templateUrl : '/components/login.html' 
	})
	
	$stateProvider
	.state('register', {
		url : '/register',
		templateUrl : '/components/register.html', 
	})

	$urlRouterProvider
	.otherwise('/home')

})

app.controller('mainApp', ['$scope', ($scope)=>{
	$scope.homeHeading = "Welcome to the Gaurdian of the Notes"
	$scope.bannerline = "We are from the Galaxy Galafray our services will help you build things your slimy little brain forgets. So go ahead and Sign In." 
}])

app.controller('loginApp', ['$scope', ($scope) => {
	
	$scope.login = (uname, pass) => {
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
	}

	request(opt, (req, res) => {
		console.log(res)
	})

}])



