var angular 						= require('angular')
var ui_router 					= require('angular-ui-router')
var rest 								= require('rest')

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