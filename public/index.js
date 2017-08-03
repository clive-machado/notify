var angular 						= require('angular')
var ui_router 					= require('angular-ui-router')

/*************************************************************************
 * JS files required in Index.js
 *************************************************************************/
var login 							= require('./components/js/login/login.js')
var dashboard 					= require('./components/js/dashboard/dashboard.js')
var config							= require('./config.js')
var controller					= require('./controller.js')
var run 								= require('./run.js')

/*************************************************************************
 * Initializing Application Module
 *************************************************************************/
var app 								= angular.module('matriarch', ['ui.router'])

/*************************************************************************
 * Calling all JS files
 *************************************************************************/
login(app)
dashboard(app)
config(app)

/*************************************************************************
 * Main Controller  
 *************************************************************************/
controller(app)

/*************************************************************************
 * Runs during App Initialization
 *************************************************************************/
run(app)