
aplicacion.controller('ByTimeController',['$scope','$location','$http', function($scope,$location,$http){
	console.log("en controller");
	console.log(aplicacion.velocidad);
	$scope.velocidad = "la puta madre";
}]);