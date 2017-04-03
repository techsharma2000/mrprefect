app.directive('ngAuth', ['UserProfile', function (UserProfile) {
 
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {
            	UserProfile.then(function(user){
    				if (!user.$hasRole(attributes.ngAuth))
                		$(element).remove();
            	})
            }
        };
    }]);


app.directive('ngLink', ['$location', function($location) {
    return {
        link: function(scope, element, attrs) {

            $(element).on('mousedown', function(e) {
            	if( e.which == 2 ){
            		e.preventDefault();
            		e.stopPropagation();
            	}
            });
            
            $(element).on('mouseup', function(e) {
            	if( e.which == 3 ) return;
            	var params = {};
            	if (attrs.ngLinkParams)
            		params = JSON.parse(attrs.ngLinkParams);
            	
            	if( e.which == 1 ){
	                scope.$apply(function() {
	                    $location.path(attrs.ngLink).search(params);
	                });
            	}
            	
            	if( e.which == 2 ){
            		e.preventDefault();
            		e.stopPropagation();
            		window.open('#'+attrs.ngLink + "?" + $.param( params ));
            		return false;
            	}
            });
        }
    }
}]);