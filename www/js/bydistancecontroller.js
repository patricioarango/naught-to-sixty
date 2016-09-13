
aplicacion.controller('ByDistanceController',['$scope','$location','$http', function($scope,$location,$http){
	$scope.mostrar_otro = false;

	$scope.quiere_otro = function(){
		$scope.mostrar_otro = true;		
	}

	console.log("$scope.cantidad_metros");
	console.log($scope.cantidad_metros);
}]);