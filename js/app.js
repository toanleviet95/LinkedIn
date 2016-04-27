var app = angular.module("my_app",['ngSanitize']);
app.controller("my_controller", function($scope, $http){
    $http({
        method: 'GET',
        url: 'database/data.json'
    }).success(function(data, status, headers, config){
        $scope.database = data;
    }).error(function(data, status, headers, config){
        alert('Lỗi nhận được dữ liệu từ JSON!');
    });
});