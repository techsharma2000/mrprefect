// START - USED SERVICES
/*
 *	CategoryService.delete
 *		PARAMS: 
 *					ObjectId id - Id
 *		
 *
 *	CategoryService.list
 *		PARAMS: 
 *		
 *
 */
// END - USED SERVICES

// START - REQUIRED RESOURCES
/*
 * CategoryService  
 */
// END - REQUIRED RESOURCES


//CRUD LIST FOR [object Object]

app.controller('CategoryListController', ['$scope', 'CategoryService',
    function ($scope, CategoryService ) {
		
    	$scope.list = CategoryService.query();
    	
    	$scope.remove = function(){
    		var id = $('#removeModal').modal().data()['bs.modal'].options.id;
    		CategoryService.remove({_id: id}).$promise.then(function(){
    			$scope.list = CategoryService.query();
    		});
    	}
}]);