/*
 * DO NOT EDIT THIS FILE
 * PLEASE EDIT ./custom/CategoryCustomServic.js
 * 
 */

app.factory('CategoryService', ['$resource', '$rootScope', 'CategoryServiceCustom',
  function($resource, $rootScope, CategoryServiceCustom){
    return $resource( $rootScope.baseUrl + "/Category/:_id", {_id:'@_id'}, $.extend({
    }, CategoryServiceCustom));
}]);