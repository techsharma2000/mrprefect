// START - USED SERVICES
/*
 *	subcategoryService.create
 *		PARAMS: 
 *					ObjectId id - Id
 *		
 *
 *	subcategoryService.findByCategoryId
 *		PARAMS: 
 *					Objectid key - Id della risorsa CategoryId da cercare
 *		
 *
 *	subcategoryService.get
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
 *	subcategoryService.update
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

app.controller('subcategoryEditController', ['$scope', '$location', '$routeParams', '$q', 'subcategoryService', 'CategoryService',
    function ($scope, $location, $routeParams, $q, subcategoryService , CategoryService) {

    	//manage create and save
		$scope.external = {};
		
    	if ($routeParams.id != 'new')
    	{
        	$scope.id = $routeParams.id;
        	$scope.obj = subcategoryService.get({_id: $scope.id});
        	
    	}
    	else{
    		$scope.obj = new subcategoryService();
        	
    	}
    	
    	$scope.save = function(){
    		$scope.obj.$save().then(function(data){
    			$scope.obj=data;
    			var externalSave = [];
    			
    			$q.all(externalSave).then(function(){
        			$location.path('/subcategorys');
    			});
    		});
    	}
    	
    	
    		
        //manage relation CategoryId
        		
    	$scope.list_Category = CategoryService.query();

}]);