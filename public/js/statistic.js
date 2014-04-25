var networkApp = angular.module("StatisticApp",[]);

networkApp.controller("statisticCtl",[ '$scope', '$http', function($scope, $http){
	var method = 'GET';
	var url = '/getstatistics';
	$scope.loading = true;
	$scope.displayPage = false;
	$scope.pageTitle = 'Estadísticas';
	$scope.statistic = 'active';
	$scope.params = {};
	
	//call the service to get all the institutes
	$http({
		method : method,
		url : url,
		params: $scope.params
	}).success(function(data, status) {
		$scope.status = status;
		
		if(data){ 
			$scope.results = data;
			$scope.loading = false;
			$scope.gotResult = true;
			$scope.displayPage = true;
		}else{
			$scope.results = data;
			$scope.noresultFound = true;
			$scope.gotResult = false;
			$scope.loading = false;
			$scope.displayPage = true;
		}

		console.dir($scope.results);
		
	})
	.error(function(data, status) {
		$scope.errorInResponse = true;
		$scope.results = data || "Request failed";
	});
	
}]);
