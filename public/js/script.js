var searchApp = angular.module("SearchApp",[]);



searchApp.controller("searchCtrl",[ '$scope', '$http', function($scope, $http){
	var method = 'GET';
	var url = '/search/do';
	
	
	$scope.sort_order = 'asc';
	
	$scope.params = {
			user_type : 'default',
			offset    : 0,
			count     : 10
				};
    
    $scope.results = [];
    $scope.gotResult = false;

	$scope.setFindOnly = function(findOnly) {
		$scope.results = null;
		$scope.params.offset = 0;
		if(!findOnly){
			findOnly = 'all';
		}
		$scope.params.user_type = findOnly;
		$scope.search();
	};

	$scope.search = function() {
		
		$scope.noResult = null;
		
		if($scope.name){
			$scope.params.name = $scope.name;
		}else{
			delete $scope.params.name;
		}
		if($scope.cellular){
			$scope.params.mobile_number = $scope.cellular;
		}else{
			delete $scope.params.mobile_number;
		}
		if($scope.email){
			$scope.params.email = $scope.email;
		}else{
			delete $scope.params.email;
		}
		if($scope.cc_number){
			$scope.params.cc_number = $scope.cc_number;
		}else{
			delete $scope.params.cc_number;
		}
		
		
		$http({
			method : method,
			url : url,
			params : $scope.params
		}).success(function(data, status) {
			$scope.status = status;
			
			if(data.results){
				$scope.results = data;
				$scope.gotResult = true;
			}else{
				$scope.noResult = 'No result found';
				$scope.gotResult = false;
			}
			
			if(data.err_messages){
				$scope.err_messages = data.err_messages;
				$scope.results = null;
				$scope.noResult = null;
			}else{
				$scope.err_messages = null;
			}
			
			console.dir($scope.params);
			console.dir($scope.results);
			
		})
		.error(function(data, status) {
			$scope.results = data || "Request failed";
			$scope.status = status;
		});
	};
	
	$scope.reOrder = function(col){
		$scope.params.sort_by = col;
		
		if($scope.sort_order === 'asc'){
			$scope.sort_order = 'desc';
		}else{
			$scope.sort_order = 'asc';
		}
		
		$scope.params.sort_order = $scope.sort_order;
		$scope.search();
		
	};
	
	$scope.getPage = function(val){
		if( val < 0 ){
			if(!$scope.gotResult && $scope.params.offset > $scope.params.count){
				$scope.params.offset = $scope.params.offset - (2*$scope.params.count);
			}else if($scope.params.offset >= 0){
				$scope.params.offset -= $scope.params.count;
			}
		}else if(val > 0){
			$scope.params.offset += $scope.params.count;
		}
		$scope.search();
	};
}]);