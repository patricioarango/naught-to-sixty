/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */ 
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        
    },onDeviceReady: function() {
        console.log("deviceready");
};//devideready

function insertar_id(url,deviceid){
    $.post(url, function(data) {
        if (data == "ok"){
            console.log("insercion deviceid correcta");
        }
    });
}
/*
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBvt5tGBZb3uaqZnjLmAOWFPtJcGd1nSGo",
    authDomain: "ganzua-eea1d.firebaseapp.com",
    databaseURL: "https://ganzua-eea1d.firebaseio.com",
    storageBucket: "ganzua-eea1d.appspot.com",
};
firebase.initializeApp(config);
var db = firebase.database();

(function() {
    var aplicacion = angular.module('App', ['ngAnimate',"firebase"]);

    aplicacion.factory("Auth", ["$firebaseAuth",function($firebaseAuth) {
        return $firebaseAuth();
      }
    ]);

    aplicacion.controller('ntsController',['$scope','Auth','$http',function($scope,Auth,$http){
        console.log("en el controllers");        
    }]);//ntsController
})();//doc ready


(function() {
    var aplicacion = angular.module('App', ['ngAnimate']);

    aplicacion.controller('ntsController',['$scope','$http',function($scope,$http){
        console.log("en el controllers");        
    }]);//ntsController
})();//doc ready*/