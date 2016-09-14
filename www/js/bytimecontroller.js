
aplicacion.controller('ByTimeController',['$scope','$location','$http','$window', function($scope,$location,$http,$window){
	$scope.velocidad = localStorage.getItem("velocidad");
}]);