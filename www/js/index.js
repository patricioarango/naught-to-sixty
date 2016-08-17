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
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        
    },onDeviceReady: function() {
        console.log("deviceready");

        var geooptions = { timeout: 1000,enableHighAccuracy: true };

        navigator.geolocation.watchPosition(onSuccess, onError,geooptions);

        var pushNotification = window.plugins.pushNotification;
        pushNotification.register(app.successHandler, app.errorHandler,{"senderID":"391779146922","ecb":"app.onNotificationGCM"});
        },successHandler: function(result) {
            console.log('registration Callback Success! Result = '+result);
        },errorHandler:function(error) {
            console.log("registration error");
            console.log(error);
        },onNotificationGCM: function(e) {
            switch( e.event ) {
                case 'registered':
                    if ( e.regid.length > 0 && registrado === null || registrado == "0") {
                        var url = 'http://autowikipedia.es/phonegap/insert_registerid/' + e.regid + '/naught-to-sixty';
                       //insertar_id(url,e.regid);
                    } 
                break;
                case 'message':
                  console.log("llego el mensaje");
                  localStorage.setItem("nts_registrado",1);
                  console.log('e.payload');
                  console.log(e.payload.data.uid);
                  grabar_datos_usuario(e.payload.data.uid);
                  //alert('message = '+e.message+' msgcnt = '+e.msgcnt);
                break;
                case 'error':
                  alert('GCM error = '+e.msg);
                break;
                default:
                  alert('An unknown GCM event has occurred');
                  break;
            }
        }
};//devideready

    var onSuccess = function(position) {
        var tiempo = formatear_timestamp(position.timestamp);
        $("#enviar_email").html('<p>Latitude: '          + position.coords.latitude          + ' ' +
              'Longitude: '         + position.coords.longitude         + ' ' +
              'Altitude: '          + position.coords.altitude          + ' ' +
              'Accuracy: '          + position.coords.accuracy          + ' ' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + ' ' +
              'Heading: '           + position.coords.heading           + ' ' +
              '<strong>Speed: </strong>'             + position.coords.speed             + ' ' +
              'Timestamp: '         + tiempo                + ' ');
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

function formatear_timestamp(timestamp){
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(timestamp*1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  return formattedTime;
}

function insertar_id(url,deviceid){
    console.log("estoy adentro de insertar_id");
    /*
    $.post(url, function(data) {
        if (data == "ok"){
            console.log("insercion deviceid correcta");
            window.localStorage.setItem("ganzua_deviceid",deviceid);
            mostrar_card(['principal_card']);
        }
    });
  */
}

/**/
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBvt5tGBZb3uaqZnjLmAOWFPtJcGd1nSGo",
  authDomain: "ganzua-eea1d.firebaseapp.com",
  databaseURL: "https://ganzua-eea1d.firebaseio.com",
  storageBucket: "ganzua-eea1d.appspot.com",
};
firebase.initializeApp(config);
var db = firebase.database();


