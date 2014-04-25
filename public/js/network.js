var networkApp = angular.module("NetworkApp",[]);

networkApp.controller("networkCtl",[ '$scope', '$http', function($scope, $http){
	var method = 'GET';
	var url = '/institutes/search';
	$scope.network = 'active';
	$scope.pageTitle = 'Redes';
	$scope.activeMenu = 'active';
	$scope.addPage = false;
	$scope.editPage = false;
	$scope.listPage = true;
	$scope.loading = true;
	$scope.noresultFound = false;
	$scope.errorInResponse = false;
	$scope.gotResult = false;
	$scope.results = [];
	
	$scope.sort_order = 'asc';

	$scope.params = {
			offset: 0,
			count: 10
				};
	
	//call the service to get all the institutes
	$http({
		method : method,
		url : url,
		params: $scope.params
	}).success(function(data, status) {
		$scope.status = status;
		
		if(Object.keys(data).length != 0){
			$scope.results = data;
			$scope.loading = false;
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
	
	//call the function to add the Institutes
	$scope.addInstitute = function(){
		$scope.addPage = true;
		$scope.listPage = false;
	};
	
	//call service to add the Institute in database
	$scope.saveInstitute = function(){
		$scope.loading = true;
		$scope.institute = {
				name: $scope.institute.name,
				email_domain: $scope.institute.email_domain,
				email_domain_alt: $scope.institute.email_domain_alt,
				enabled: $scope.institute.enabled
		}
		$http({
			method : 'POST',
			url : '/institutes',
			data: $scope.institute
		}).success(function(data, status) {
			//console.log(data);
			window.location = "/network";
			
		})
		.error(function(data, status) {
			console.log(data);
			$scope.errorInResponse = true;
		});
	}
	
	//fuction call to edit the Institute
	$scope.editInstitute = function(id){
		$scope.loading = true;
		$scope.editPage = true;
		$scope.listPage = false;
		var id = id; 
		$http({
			method : 'GET',
			url : '/institutes/'+id
		}).success(function(data, status) {
			if(data){
			$scope.edit = data;
			$scope.loading = false;
			}	
		})
		.error(function(data, status) {
			$scope.errorInResponse = true;
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
		$scope.searchFilter();
		
	};
	
	//function to update the Institute
	$scope.updateInstitute  = function(){
		$scope.loading = true;
		$scope.editinstitute = {
				name: $scope.edit.name,
				email_domain: $scope.edit.email_domain,
				email_domain_alt: $scope.edit.email_domain_alt,
				enabled: $scope.edit.enabled
		}
		var id = $scope.edit._id;
		$http({
			method : 'PUT',
			url : '/institutes/'+id,
			data: $scope.editinstitute
		}).success(function(data, status) {
			//console.log(data);
			window.location = "/network";
			
		})
		.error(function(data, status) {
			console.log(data);
			$scope.errorInResponse = true;
		});
	}
	
	//function to enable/disable nstitute 
	$scope.enableDisable = function(id, status){
		$scope.loading = true;
		if(status == 1)
			enabled = false;
		else
			enabled = true;
		$http({
			method : 'GET',
			url : '/institutes/'+id
		}).success(function(data, status) {
			if(data){ 
			$scope.enableData = data;
			$scope.enableData.enabled = enabled;
			$http({
				method : 'PUT',
				url : '/institutes/'+id,
				data: $scope.enableData
			}).success(function(data, status) {
				window.location = "/network";		
			})
			}	
		});
	}
	//function to cancel the add institute form
	$scope.cancelAddInstiute = function(){
		window.location = "/network";
	}
	
	$scope.setFindOnly = function() {
		$scope.results = null;
		$scope.issearch = true;
		$scope.params.offset = 0;
		
		//collect search params
		if($scope.searchitem){
			if($scope.searchitem.name)
				$scope.params.name = $scope.searchitem.name;
			else
				delete $scope.params.name;
			
			if($scope.searchitem.email_domain)
				$scope.params.email_domain = $scope.searchitem.email_domain;
			else
				delete $scope.params.email_domain;
			
			if($scope.searchitem.email_domain_alt)
				$scope.params.email_domain_alt = $scope.searchitem.email_domain_alt;
			else
				delete $scope.params.email_domain_alt;	
		}
		
		$scope.searchFilter();
	};
	
	//function call to search the institue based on the filter values 
	$scope.searchFilter = function(){
		var method = 'GET';
		var url = '/institutes/search';
		$scope.pageTitle = 'Redes';
		$scope.activeMenu = 'active';
		$scope.addPage = false;
		$scope.editPage = false;
		$scope.listPage = true;
		$scope.loading = true;
		$scope.errorInResponse = false;
		$scope.noResult = null;

		//call the service to get all the institutes
		$http({
			method : method,
			url : url,
			params: $scope.params
		}).success(function(data, status) {
			$scope.status = status;
			
			if(Object.keys(data).length != 0){ 
				$scope.results = data;
				$scope.gotResult = true;
				$scope.noresultFound = false;
				$scope.loading = false;
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
			$scope.results = data || "Request failed";
			$scope.errorInResponse = true;
		});	
	}
	
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
		$scope.searchFilter();
	};
	
}]);
