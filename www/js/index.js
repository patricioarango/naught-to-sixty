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
//variable para registro unico
//localStorage.setItem("ganzua_registrado",0);
if (localStorage.getItem("nts_registrado") === null) {
    var registrado = "0";
} else {
    var registrado = localStorage.getItem("nts_registrado");
}
//id de tirada
if (localStorage.getItem("nts_id_tirada") === null) {
    var nts_id_tirada = "0";
} else {
    var nts_id_tirada = Number(localStorage.getItem("nts_id_tirada")) + 1;
}
var watchID;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        
    },onDeviceReady: function() {
        console.log("deviceready");


        
        window.FirebasePlugin.onTokenRefresh(function(token) {
                // save this server-side and use it to push notifications to this device
                console.log(token);
                window.localStorage.setItem("fire_msg_token",token);
            }, function(error) {
                window.FirebasePlugin.getToken(function(token) {
                    // save this server-side and use it to push notifications to this device
                    console.log(token);
                    window.localStorage.setItem("fire_msg_token",token);
                }, function(error) {
                    console.error(error);
                });                
                console.error(error);
            });

        window.FirebasePlugin.onNotificationOpen(function(notification) {
            console.log(notification);
        }, function(error) {
            console.error(error);
        });

        
        }
};//devideready

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD2PzScF-ihOBqL6hF3U5dDaUL6qo-pSPg",
    authDomain: "naught-to-sixty.firebaseapp.com",
    databaseURL: "https://naught-to-sixty.firebaseio.com",
    storageBucket: "naught-to-sixty.appspot.com",
    messagingSenderId: "401824998671"
};
appfire = firebase.initializeApp(config);
var db = appfire.database(); 

var token = window.localStorage.getItem("fire_msg_token"); 

db.ref('tokens/').set(token);  