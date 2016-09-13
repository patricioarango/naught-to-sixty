
aplicacion.controller('ByTimeController',['$scope','$location','$http', function($scope,$location,$http){
    var geooptions = { timeout: 30000,enableHighAccuracy: true };
    watchID = navigator.geolocation.watchPosition(onSuccess, onError,geooptions);

        $scope.onSuccess = function(position) {
        	var tiempo = formatear_timestamp(position.timestamp);
        	var d = new Date(position.timestamp);
        	var n = d.toTimeString();
	        var current_speed = (position.coords.speed * 3.6).toFixed(2); 
    	    $("#speed_contenedor").text(current_speed + " km/h");
        	$(".determinate").css("width", current_speed);
        	control_velocidad(current_speed);
    	};
    	$scope.control_velocidad(velocidad) = function(){
    		$scope.velocidad = velocidad;
    	}
    	// onError Callback receives a PositionError object
    	$scope.onError = function(error) {
	        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    	}    	
}]);