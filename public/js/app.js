var app = angular.module('mrperfect99_App', [
'ngRoute',
'ngResource',
'ngCookies'
]).config(function ($routeProvider) {
	
	$routeProvider
// START - ROUTE
	.when('/categorys/:id', {
	  templateUrl: 'html/CategoryEdit.html',
	  resolve: {
		  AccessManager: ["AccessManager", function(AccessManager) { return AccessManager.isAuthenticated(); }]
	  },
	})
	.when('/categorys', {
	  templateUrl: 'html/CategoryList.html',
	  resolve: {
		  AccessManager: ["AccessManager", function(AccessManager) { return AccessManager.isAuthenticated(); }]
	  },
	})
	.when('/home', {
	  templateUrl: 'html/Home.html',
	  resolve: {
		  AccessManager: ["AccessManager", function(AccessManager) { return AccessManager.isAuthenticated(); }]
	  },
	})
	.when('/subcategorys/:id', {
	  templateUrl: 'html/subcategoryEdit.html',
	  resolve: {
		  AccessManager: ["AccessManager", function(AccessManager) { return AccessManager.isAuthenticated(); }]
	  },
	})
	.when('/subcategorys', {
	  templateUrl: 'html/subcategoryList.html',
	  resolve: {
		  AccessManager: ["AccessManager", function(AccessManager) { return AccessManager.isAuthenticated(); }]
	  },
	})

// END - ROUTE

// INSERT HERE YOUR CUSTOM ROUTES
		

// DEFAULT ROUTES
	.when('/login', {
	    templateUrl: 'html/Login.html',
	    controller: 'LoginController'
	})
	.when('/logout', {
	      templateUrl: 'html/Login.html',
	      controller: 'LogoutController',
    	  resolve: {
    		  AccessManager: ["AccessManager", function(AccessManager) { return AccessManager.isAuthenticated(); }]
    	  },
	})
	.when('/', {
	      templateUrl: 'html/Home.html',
    	  resolve: {
    		  AccessManager: ["AccessManager", function(AccessManager) { return AccessManager.isAuthenticated(); }]
    	  },
	})
	.otherwise({
		templateUrl: 'html/404.html',
	});
	
});