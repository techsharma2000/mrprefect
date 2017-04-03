app.run(['$location', '$rootScope', 'AccessManager', function($location, $rootScope, AccessManager ) {

	$rootScope.properties = properties;
	$rootScope.baseUrl = $rootScope.properties.endpoint;
	
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
    	try{
    		$rootScope.title = current.$$route.originalPath;
    	}
    	catch(e){}
    });
    
	$rootScope.dateFilter = function(date) {
		if (date)
			return date.toISOString()
	}
	
	//SECURITY

	$rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
		if (rejection == AccessManager.UNAUTHORIZED) {
			$location.path("/login");
		}
	});

} ]);

//LOGIN
app.controller('LoginController', [
		'$scope',
		'$rootScope',
		'$http',
		'$location',
		'$cookies',
		'UserProfile',
function($scope, $rootScope, $http, $location, $cookies, UserProfile) {

	$scope.login = function() {
		var hash = CryptoJS.MD5($scope.password);
		$http.defaults.headers.common['pass'] = hash;
		$http.defaults.headers.common['user'] = $scope.user;
		UserProfile.then(function(user) {
			user.$refresh().then(
				function() {
					//if is auth remember cookies
					if (user.$isAuthenticated() && $scope.remember) {
						var date = new Date();
						date.setYear(3000);
						var opt = {
							expires : date
						};
						$cookies.put('mrperfect99_user', user.user, opt);
						$cookies.put('mrperfect99_pass', hash, opt);
					}
					
					//login
					$location.path('/');
				});
		})

	};
} ]);

//LOGOUT
app.controller('LogoutController', [ '$scope', '$location',	'$cookies', 'UserProfile', '$http',
function($scope, $location, $cookies, UserProfile, $http) {

	$cookies.remove('mrperfect99_user');
	$cookies.remove('mrperfect99_pass');
	$http.defaults.headers.common['pass'] = null;
	$http.defaults.headers.common['user'] = null;

	UserProfile.then(function(user){
		user.$refresh().then(function() {
			$location.path("/login");
		});
	});
	
} ]);

// MENU
app.controller('MenuController', [ '$scope', 'UserProfile',
 function($scope, UserProfile) {
	UserProfile.then(function(user){
		$scope.user = user;
	});
} ]);

//ACCESS MANAGER
app.factory("AccessManager", [
		"$q",
		"UserProfile",
function($q, UserProfile) {

	var Access = {

		OK : 200,
		UNAUTHORIZED : 401,

		//FUNCTION ACCESS MANAGER
		hasRole : function(role) {
			var deferred = $q.defer();
			UserProfile.then(function(userProfile) {
				if (userProfile.$hasRole(role)) {
					deferred.resolve(Access.OK);
				} else {
					deferred.reject(Access.UNAUTHORIZED);
				}
			});
			return deferred.promise;
		},
		isAuthenticated : function() {
			var deferred = $q.defer();
			UserProfile.then(function(userProfile) {
				if (userProfile.$isAuthenticated()) {
					deferred.resolve(Access.OK);
				} else {
					deferred.reject(Access.UNAUTHORIZED);
				}
			});
			return deferred.promise;
		},
		getUser : function() {
			return UserProfile.$$state.value;
		}

	};

	return Access;

} ]);

//USER PROFILE
app.factory("UserProfile", [
		"$q",
		"User",
		'$cookies',
		'$http',
function($q, User, $cookies, $http) {

	"use strict";

	var userProfile = {};

	var fetchUserProfile = function() {
		var deferred = $q.defer();
		
		//IF HAS COOKIES SET 
		if ($cookies.get('mrperfect99_user')) {
			$http.defaults.headers.common['user'] = $cookies.get('mrperfect99_user');
			$http.defaults.headers.common['pass'] = $cookies.get('mrperfect99_pass');
		};
		
		//CALL SERVER
		User.profile(function(response) {
			for ( var prop in userProfile) {
				if (userProfile.hasOwnProperty(prop)) {
					delete userProfile[prop];
				}
			}

			//FUNCTIONS USER PROFILE
			deferred.resolve(angular.extend(userProfile, response, {
				$refresh : fetchUserProfile,
				$hasRole : function(role) {
					// NON AUTHENTICATED
					if (!userProfile.roles) 
						return false;

					// ADMIN
					if (userProfile.roles.indexOf("ADMIN") != -1)
						return true;
					
					// PRIVATE PAGE
					if (role.length == 0)
						return true;
					
					//CHECK ROLE
					if (Array.isArray(role)){
						for (var i in role) {
							for (var j in userProfile.roles) {
								if (role[i] == userProfile.roles[j])
									return true
							}	
						}
						return false;

					}
					else {
						if (userProfile.roles)
							return userProfile.roles.indexOf(role) >= 0;
						else
							return false;	
					}
						
				},
				$isAuthenticated : function() {
					return userProfile.user != null;
				}
			}));
		});
		return deferred.promise;
	};
	return fetchUserProfile();
} ]);

//USER RESOURCE
app.factory("User", [ "$resource", function($resource) {
	"use strict";
	return $resource(properties.endpoint + '/Login', {}, {
		profile : {
			method : "GET"
		}
	});
} ]);