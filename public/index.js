var angular 						= require('angular')
var ui_router 					= require('angular-ui-router')
var angular_cookies 		= require('angular-cookies')
var ngDraggable					= require('ngdraggable')

/*************************************************************************
 * JS files required in Index.js
 *************************************************************************/
var login 							= require('./components/js/login/login.js')
var register						= require('./components/js/register/register.js')
var dashboard 					= require('./components/js/dashboard/dashboard.js')
var tasks 							= require('./components/js/tasks/tasks.js')
var activate 						= require('./components/js/activate/activate.js')
var config							= require('./config.js')
var controller					= require('./controller.js')
var factory							= require('./factory.js')
var run 								= require('./run.js')

/*************************************************************************
 * Initializing Application Module
 *************************************************************************/
var app 								= angular.module('matriarch', ['ui.router', 'ngCookies', 'ngDraggable'])

/*************************************************************************
 * Calling all JS files
 *************************************************************************/
login(app)
register(app)
dashboard(app)
tasks(app)
activate(app)
config(app)

/*************************************************************************
 * Main Controller  
 *************************************************************************/
controller(app)

/*************************************************************************
 * Main factory
 *************************************************************************/
factory(app)

/*************************************************************************
 * Run
 *************************************************************************/
run(app)