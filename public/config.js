module.exports = function (app) {
	app.config(states)
}

function states($stateProvider, $locationProvider, $urlRouterProvider) {
	$locationProvider.hashPrefix('')
	$stateProvider
	.state('home', state.home)
	.state('login', state.login)
	.state('register', state.register)
	.state('dashboard', state.dashboard)
	$urlRouterProvider
	.otherwise('/home')

}

var state = {
	home : {
		url : '/home',
		views: 
		{ 
			'' : {
				templateUrl : '/components/header.html',				
			},
			'navbar@home' : {
				templateUrl : '/components/navbar.html'
			},
			data : {
				requiredLogin : false
			}	
		}	
	},
	login : {
		url : '/Login',
		views: 
		{ 
			'' : {
				templateUrl : '/components/login.html',				
			},
			'navbar@login' : {
				templateUrl : '/components/navbar.html'
			},
			data : {
				requiredLogin : false
			}	
		}
	},
	register : {
		url : '/Register',
		views: 
		{ 
			'' : {
				templateUrl : '/components/register.html',				
			},
			'navbar@register' : {
				templateUrl : '/components/navbar.html'
			},
			data : {
				requiredLogin : false
			}	
		}
	},
	dashboard : {
		url : '/Dashboard',
		views: { 
			'' : 
			{
				templateUrl : '/components/dashboard.html',
			},
			'navbar@dashboard' : 
			{
				templateUrl : '/components/navbar.html',
				controller : 'dashboard' 
			},
			'task@dashboard' : 
			{
				templateUrl : '/components/tasks.html',
				controller : 'task' 
			},
			data : {
				requiredLogin : true
			}	
		}
	}
}


