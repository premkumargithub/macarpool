var networkApp = angular.module("VehicleApp",[]);

networkApp.controller("vehicleCtl",[ '$scope', '$http', function($scope, $http){
	var method = 'GET';
	var url = '/vehicles/search';
	$scope.pageTitle = 'Carros';
	$scope.vehicle = 'active';
	$scope.loading = true;
	$scope.noresultFound = false;
	$scope.errorInResponse = false;
	$scope.gotResult = false;
	$scope.results = [];
	
	$scope.sort_order = 'asc';
	
	$scope.params = {
			offset    : 0,
			count     : 10
				};
	
	//call the service to get all the institutes
	$http({
		method : method,
		url : url,
		params: $scope.params
	}).success(function(data, status) {
		$scope.status = status;
		
		if((Object.keys(data).length != 0)){
			$scope.results = data;
			$scope.loading = false;
			$scope.listPage = true;
			$scope.gotResult = true;
		}else{
			$scope.noresultFound = true;
			$scope.gotResult = false;
			$scope.loading = false;
		}

		console.dir($scope.results);
		
	})
	.error(function(data, status) {
		$scope.errorInResponse = true;
		$scope.results = data || "Request failed";
	});
	
	$scope.setFindOnly = function() {
		$scope.results = null;
		$scope.params.offset = 0;
		$scope.issearch = true;
		
		//collect search params
		if($scope.searchitem){
			if($scope.searchitem.plate_num)
				$scope.params.plate_num = $scope.searchitem.plate_num;
			else
				delete $scope.params.plate_num;
			
			if($scope.searchitem.user_cc)
				$scope.params.user_cc = $scope.searchitem.user_cc;
			else
				delete $scope.params.user_cc;
			
			if($scope.searchitem.user_name)
				$scope.params.user_name = $scope.searchitem.user_name;
			else
				delete $scope.params.user_name;
		}
		
		$scope.search();
	};
	
	//Function call to search the vehicles
	$scope.search = function(){ 
		var method = 'GET';
		var url = '/vehicles/search';
		$scope.loading = true;
		$scope.errorInResponse = false;
		$scope.gotResult = false;
		
		$http({
			method : method,
			url : url,
			params: $scope.params
		}).success(function(data, status) {
			$scope.status = status;
			
			if((Object.keys(data).length != 0)){
				$scope.results = data;
				$scope.loading = false;
				$scope.listPage = true;
				$scope.gotResult = true;
				$scope.noresultFound = false;
				$scope.issearch = false;
			}else{
				if($scope.issearch){
					$scope.issearch = false;
				    $scope.noresultFound = true;
				}
				$scope.gotResult = false;
				$scope.loading = false;
			}

			console.dir($scope.results);
			
		})
		.error(function(data, status) {
			$scope.errorInResponse = true;
			$scope.results = data || "Request failed";
		});
	}
	
	//function to call reorder the records 
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
	
	//call function for pagination
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
