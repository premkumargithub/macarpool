$(function() {
    $("#nacimiento").datepicker({
//                    showOn: 'button',
//                    buttonText: 'Show Date',
//                    buttonImageOnly: true,
//                    buttonImage: '../image/calendar.png',
//                    dateFormat: 'dd/mm/yy',
//                    constrainInput: true,

    });

    $("#soat-expedicion").datepicker({
//                    showOn: 'button',
//                    buttonText: 'Show Date',
//                    buttonImageOnly: true,
//                    buttonImage: '../image/calendar.png',
//                    dateFormat: 'dd/mm/yy',
//                    constrainInput: true
    });

    $("#soat-vencimiento").datepicker({
//                    showOn: 'button',
//                    buttonText: 'Show Date',
//                    buttonImageOnly: true,
//                    buttonImage: '../image/calendar.png',
//                    dateFormat: 'dd/mm/yy',
//                    constrainInput: true
    });

    $("#expedicion").datepicker({
//                    showOn: 'button',
//                    buttonText: 'Show Date',
//                    buttonImageOnly: true,
//                    buttonImage: '../image/calendar.png',
//                    dateFormat: 'dd/mm/yy',
//                    constrainInput: true
    });
    $(".ui-datepicker-trigger").mouseover(function() {
        $(this).css('cursor', 'pointer');
    });
});



var userDetails = angular.module("userDetails", []);

userDetails.controller('getUserId', ['$scope', '$http', function($scope, $http) {
        var vehicleId;
        var userId = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
        var url = '/users/'+userId;
        var method = 'GET';
        $scope.loading = true;
        $scope.renderPage = true;
        $scope.isDriver = true;
        $scope.results = null;
        $http({
            method: method,
            url: url
        }).success(function(data, status) {
            $scope.results = data;
            console.dir($scope.results);
        });

        var urlsecond = '/vehicles/of/'+userId;

        $scope.output = null;
        $http({
            method: method,
            url: urlsecond
        }).success(function(data, status) {
        	if(Object.keys(data).length == 0){
        		$scope.isDriver = false;
        	}
            $scope.output = data;
            $scope.loading = false;
            $scope.renderPage = true;
            console.dir($scope.output);
        });
        $scope.vehicledetails = function(indexNumber) {
            $scope.vehicle = $scope.output[indexNumber];
            vehicleId = $scope.vehicle._id;
        }
        $scope.uploadImage = function(indexNumber) {
            $scope.vehicle = $scope.output[indexNumber];
        }

        $scope.uploadFile = function(files, filename) {
            $('.uptext').show();
            console.log(filename);
            var fd = new FormData();
            //Take the first selected file
            fd.append("file", files[0]);
            uploadUrl = '/files/';
            $http.post(uploadUrl, fd, {
                withCredentials: true,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function(data) {

                $('.uptext').hide();
                console.log(data.file_id);
                $('.' + filename).children().attr('src', '/files/temp/' + data.file_id);
                if (filename == 'file_id_driving_license_img') {
                    var postData = {'file_id_driving_license_img': data.file_id};
                } else if (filename == 'file_id_insurance_img') {
                    var postData = {'file_id_insurance_img': data.file_id};
                } else if (filename == 'file_id_owner_slip_img') {
                    var postData = {'file_id_owner_slip_img': data.file_id};
                } else if (filename == 'file_id_vehicle_img') {
                    var postData = {'file_id_vehicle_img': data.file_id};
                }


                console.dir(postData);
                $http({
                    url: '/vehicles/' + vehicleId,
                    method: "GET",
                    data: postData
                }).success(function(data, status, headers, config) {
                    console.log("status" + status);
                    //$scope.persons = data; // assign  $scope.persons here as promise is resolved here 
                }).error(function(data, status, headers, config) {
                    //$scope.status = status;
                });

            }).error(function() {
                $('.uptext').hide();
            });

        }

        $scope.send = function() {

            var gender = document.getElementsByName("checkout_method");


            if ((gender[0].checked == false) && (gender[1].checked == false))
            {
                alert("Please Select at least one option");
            } else {
                var postData = {userId: userId, admin_status: $scope.checkout_method, comment: $scope.comment};
                $http({
                    url: '/users/me/status',
                    method: "POST",
                    data: postData
                }).success(function(data, status, headers, config) {
                    if (data.emailStatus == true) {
                        window.location = '/search';
                    } else {
                        alert('Something Goes Wrong');
                    }
                }).error(function(data, status, headers, config) {

                });
            }
        }



    }]);
$(function() {
    $('.slider').cycle({
        fx: 'scrollHorz',
        speed: 'fast',
        timeout: 0,
        next: '.ph_r',
        prev: '.ph_l'
    });
    $('.slider a').click(function() {
        $('.upload').show();
        var newClass = $(this).attr('class');
        $('.upload input').attr('class', newClass);
    });
});