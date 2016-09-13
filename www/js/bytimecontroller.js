
aplicacion.controller('ByTimeController',['$scope','$location','$http','$window', function($scope,$location,$http,$window){
	var geooptions = { timeout: 30000,enableHighAccuracy: true };

        watchID = $window.navigator.geolocation.watchPosition(function(position){
        	console.log(position);
        	$scope.velocidad = position.coords.speed;
        }, function(error){
        	console.log(error);
        },geooptions);
	/*console.log("en controller");
	console.log(current_speed);
	$scope.velocidad = current_speed;*/
}]);