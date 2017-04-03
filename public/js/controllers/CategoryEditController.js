// START - USED SERVICES
/*
 *	CategoryService.create
 *		PARAMS: 
 *					ObjectId id - Id
 *		
 *
 *	subcategoryService.findByCategoryId
 *		PARAMS: 
 *					Objectid key - Id della risorsa CategoryId da cercare
 *		
 *
 *	CategoryService.get
 *		PARAMS: 
 *					ObjectId id - Id 
 *		
 *
 *	subcategoryService.list
 *		PARAMS: 
 *		
 *
 *	subcategoryService.strictLinkListOfCategoryId
 *		PARAMS: 
 *					Objectid key - Id subcategory to link list
 *					Array list - List of linked resource
 *		
 *
 *	CategoryService.update
 *		PARAMS: 
 *		
 *
 */
// END - USED SERVICES

// START - REQUIRED RESOURCES
/*
 * CategoryService  
 * subcategoryService  
 */
// END - REQUIRED RESOURCES

app.controller('CategoryEditController', ['$scope', '$location', '$routeParams', '$q', 'CategoryService', 'subcategoryService', 'subcategoryService',
    function ($scope, $location, $routeParams, $q, CategoryService , subcategoryService , subcategoryService) {

    	//manage create and save
		$scope.external = {};
		
    	if ($routeParams.id != 'new')
    	{
        	$scope.id = $routeParams.id;
        	$scope.obj = CategoryService.get({_id: $scope.id});
        	$scope.external._subcategoryCategoryId = subcategoryService.findByCategoryId({key: $scope.id});
        	
    	}
    	else{
    		$scope.obj = new CategoryService();
        	$scope.external._subcategoryCategoryId = [];
        	
    	}
    	
    	$scope.save = function(){
    		$scope.obj.$save().then(function(data){
    			$scope.obj=data;
    			var externalSave = [];
    			
    			$q.all(externalSave).then(function(){
        			$location.path('/categorys');
    			});
    		});
    	}
    	
    	
    		
        //manage External relation CategoryId
        		
    	$scope.list_subcategoryCategoryId = subcategoryService.query();
    	
}]);