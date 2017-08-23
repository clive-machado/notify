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
	.state('activate', state.activate)
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
			'footer@home' : {
				templateUrl : '/components/footer.html'
			},
			data : {
				requiredLogin : false
			}	
		}	
	},
	login : {
		url : '/login',
		views: 
		{ 
			'' : {
				templateUrl : '/components/login.html',				
			},
			'navbar@login' : {
				templateUrl : '/components/navbar.html'
			},
			'footer@login' : {
				templateUrl : '/components/footer.html'
			},
			data : {
				requiredLogin : false
			}	
		}
	},
	register : {
		url : '/register',
		views: 
		{ 
			'' : {
				templateUrl : '/components/register.html',				
			},
			'navbar@register' : {
				templateUrl : '/components/navbar.html'
			},
			'footer@register' : {
				templateUrl : '/components/footer.html'
			},
			data : {
				requiredLogin : false
			}	
		}
	},
	dashboard : {
		url : '/dashboard',
		views: { 
			'' : 
			{
				templateUrl : '/components/dashboard.html',
			},
			'navbar@dashboard' : {
				templateUrl : '/components/navbar.html',
				controller : 'dashboard' 
			},
			'task@dashboard' : {
				templateUrl : '/components/tasks.html',
				controller : 'task' 
			},
			'footer@dashboard' : {
				templateUrl : '/components/footer.html'
			},
			data : {
				requiredLogin : true
			}	
		}
	},
	activate : {
		url : '/Activate',
		views: 
		{ 
			'' : {
				templateUrl : '/components/activate.html',				
			},
			'navbar@activate' : {
				templateUrl : '/components/navbar.html'
			},
			'footer@activate' : {
				templateUrl : '/components/footer.html'
			},
			data : {
				requiredLogin : false
			}	
		}
	}
}


