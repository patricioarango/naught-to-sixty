
aplicacion.controller('ByDistanceController',['$scope','$location','$http', function($scope,$location,$http){
	$scope.mostrar_otro = false;

	$scope.quiere_otro = function(quiere_otro){
		if (quiere_otro){
			$scope.mostrar_otro = true;		
		} else {
			$scope.mostrar_otro = false;		
		}
	}

	console.log("$scope.cantidad_metros");
	console.log($scope.cantidad_metros);
}]);