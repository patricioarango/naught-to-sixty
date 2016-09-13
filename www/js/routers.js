 var aplicacion = angular.module('aplicacion', ['ngRoute','ngAnimate']);
 aplicacion.config(function ($compileProvider){
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    }).config(function ($routeProvider) {
    $routeProvider
        .when('/', {
              templateUrl : 'bytime.html',
              controller  : 'ByTimeController'
          })
        .when('/bydistance', {
              templateUrl : 'bydistance.html',
              controller  : 'ByDistanceController'
          })
          .when('/ranking', {
              templateUrl : 'ranking.html',
              controller  : 'RankingController'
          });
  });

