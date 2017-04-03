// START - USED SERVICES
/*
 *	subcategoryService.delete
 *		PARAMS: 
 *					ObjectId id - Id
 *		
 *
 *	subcategoryService.list
 *		PARAMS: 
 *		
 *
 */
// END - USED SERVICES

// START - REQUIRED RESOURCES
/*
 * subcategoryService  
 */
// END - REQUIRED RESOURCES


//CRUD LIST FOR [object Object]

app.controller('subcategoryListController', ['$scope', 'subcategoryService',
    function ($scope, subcategoryService ) {
		
    	$scope.list = subcategoryService.query();
    	
    	$scope.remove = function(){
    		var id = $('#removeModal').modal().data()['bs.modal'].options.id;
    		subcategoryService.remove({_id: id}).$promise.then(function(){
    			$scope.list = subcategoryService.query();
    		});
    	}
}]);