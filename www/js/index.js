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

        var geooptions = { maximumAge: 1000, timeout: 15000,enableHighAccuracy: true };

        watchID = navigator.geolocation.watchPosition(onSuccess, onError,geooptions);

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
                       insertar_id(url,e.regid);
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
    var contador_geolocalizaciones = 0;
    var distancia = 0;
    var tirada = {};
    var onSuccess = function(position) {
        var tiempo = formatear_timestamp(position.timestamp);
        var d = new Date(position.timestamp);
        var n = d.toTimeString();
        /*$("#geo_values").html('<p>Latitude: '          + position.coords.latitude          + ' ' +
              'Longitude: '         + position.coords.longitude         + ' ' +
              'Altitude: '          + position.coords.altitude          + ' ' +
              'Accuracy: '          + position.coords.accuracy          + ' ' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + ' ' +
              'Heading: '           + position.coords.heading           + ' ' +
              '<strong>Speed: </strong>'             + (position.coords.speed * 3.6)             + ' ' +
              'Timestamp: '         + tiempo                + ' '+
              'Hora normal: ' + n);*/
        //distancia
        if (contador_geolocalizaciones == 0){
          $("#cargando").hide();
          $("#distance_contenedor").show();
          $("#start_engine").show();          
          localStorage.setItem("lat_inicial",position.coords.latitude);
          localStorage.setItem("long_inicial",position.coords.longitude);
        } else {
          //calculamos la distancia
          var lata = localStorage.getItem("lat_inicial");
          var longa = localStorage.getItem("long_inicial");
          distancia = (getDistanceFromLatLonInKm(lata,longa,position.coords.latitude,position.coords.longitude) * 1000);
        }

        $("#distance_contenedor").text(parseInt(distancia) + " m");
        localStorage.setItem("nts_distancia",parseInt(distancia));
        var current_speed = (position.coords.speed * 3.6).toFixed(2); 
          $("#speed_contenedor").text(current_speed + " km/h");
          $(".determinate").css("width", current_speed);
        localStorage.setItem("nts_velocidad",current_speed);
        control_velocidad(current_speed);
        
        //guardamos la tirada
        tirada[contador_geolocalizaciones] = {"nro": contador_geolocalizaciones,"velocidad": current_speed,"distancia": parseInt(distancia),"lat_inicial":localStorage.getItem("lat_inicial"), "long_inicial": localStorage.getItem("long_inicial"),"lat": position.coords.latitude, "long": position.coords.longitude};
        contador_geolocalizaciones++;
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

function formatear_timestamp(timestamp){
  //console.log("timestamp");
  //console.log(timestamp);
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(timestamp);
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

var has_started = false;
function insertar_id(url,deviceid){
    $.post(url, function(data) {
        if (data == "ok"){
           localStorage.setItem("nts_registrado",1);
            //window.localStorage.setItem("ganzua_deviceid",deviceid);
            //mostrar_card(['principal_card']);
        }
    });
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

//id de firebase
if (localStorage.getItem("nts_id_firebase") === null) {
  firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });  

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var isAnonymous = user.isAnonymous;
      var nts_id_firebase = user.uid;
      // ...
    } else {
      // User is signed out.
      // ...
    }
    // ...
  });  

} else {
    var nts_id_firebase = localStorage.getItem("nts_id_firebase");
}

var speed = 1;
function simulador(){
    $(".determinate").css("width", speed);
    $("#speed_contenedor").text(speed + " km/h");
    control_velocidad(speed);
    speed++;
}

//countdown
var count = 3;
var interval = 2000;
function updateTimer(){
    if(count > 0){
        $("#content").fadeOut('slow', function(){
            $("#content").text(count);
            $("#content").fadeIn();
            count--;
        });

    }
    else if(count == 0){
        $("#content").fadeOut('slow', function(){
            $("#content").text("Go!!");
              sw_start();
            /*$("#content").fadeIn(function(){
            });*/
            count--;
        });

    } 
    else {
        $("#content").fadeOut();
        clearInterval(interval);
    }

}

$("#start_engine").click(function(){
  has_started = true;
  $("#start_engine").hide();
    $("#start_engine").hide("fast", function(){
      setInterval(function(){updateTimer()},interval);
    });
});

//chronometer
var timercount = 0;
var timestart  = null;
var tiempo;
function showtimer() {
    /*if(timercount) {
        clearTimeout(timercount);
        clockID = 0;
    }*/
    if(!timestart){
        timestart = new Date();
    }
    var timeend = new Date();
    var timedifference = timeend.getTime() - timestart.getTime();
    timeend.setTime(timedifference);
    var minutes_passed = timeend.getMinutes();
    if(minutes_passed < 10){
        minutes_passed = "0" + minutes_passed;
    }
    var seconds_passed = timeend.getSeconds();

    var miliseconds_passed = timeend.getMilliseconds();
    if(miliseconds_passed < 10){
        miliseconds_passed = "00" + miliseconds_passed;
    } else if (miliseconds_passed < 100){
        miliseconds_passed = "0" + miliseconds_passed;
    }
    tiempo = seconds_passed + "." + miliseconds_passed;
    control_tiempo(seconds_passed);
    $("#time_contenedor").html(seconds_passed + "." + miliseconds_passed).fadeIn("slow");
    //timercount = setTimeout("showtimer()", 10);
}

function sw_start(){
  has_started = true;
  //simulador_velocidad = setInterval(function(){simulador()},50);

  timestart   = new Date();
  $("#time_contenedor").html("00:00");
  //showtimer();
  timercount  = setInterval(function(){showtimer()}, 10);
}

function show_extra_time(){
  $("#time_contenedor_mensaje").show();
  $("#time_contenedor_mensaje").html("<p >tu auto es una tortuga, ¿qué querés testear?</p>");
  $("#speed_contenedor").css("font-size","2em");
  $("#time_contenedor").css("font-size","4em");
  $("#restart_engine").show();
}

var stop_speed = 30;
function control_velocidad(velocidad){
  if (parseInt(velocidad) >= parseInt(stop_speed) && has_started){ 
    //detenemos el watch del geolocalizador
    navigator.geolocation.clearWatch(watchID);
    //detenemos el simulador
    //clearInterval(simulador_velocidad);
    //detenemos el cronometro
    clearTimeout(timercount);
    //alert("tu tiempo fue de: " + tiempo);
    localStorage.setItem("nts_tiempo",tiempo);
    tirada_finalizada();
  }
  if (has_started == false){
    if (velocidad > 0){
      $("#speed_not_zero").show();
      $("#start_engine").hide();
    } else {
      $("#speed_not_zero").hide();
      $("#start_engine").show();    
    }
  } 
}

var stop_one = 25;
var stop_two = 30;
function control_tiempo(segundos){
  console.log(timercount);
  if (segundos > stop_one && segundos < stop_two){
    $("#time_contenedor").fadeOut();
  } 
  if (segundos >= stop_two){
    show_extra_time();
    //detenemos el simulador
    //clearInterval(simulador_velocidad);
    //detenemos el cronometro
    //clearInterval(timercount);
  }

}
/*
function Stop() {
    if(timercount) {
        clearTimeout(timercount);
        timercount  = 0;
        var timeend = new Date();
        var timedifference = timeend.getTime() - timestart.getTime();
        timeend.setTime(timedifference);
        var minutes_passed = timeend.getMinutes();
        if(minutes_passed < 10){
            minutes_passed = "0" + minutes_passed;
        }
        var seconds_passed = timeend.getSeconds();
        if(seconds_passed < 10){
            seconds_passed = "0" + seconds_passed;
        }
        var milliseconds_passed = timeend.getMilliseconds();
        if(milliseconds_passed < 10){
            milliseconds_passed = "00" + milliseconds_passed;
        }
        else if(milliseconds_passed < 100){
            milliseconds_passed = "0" + milliseconds_passed;
        }
        $("#tiempo_final").html(minutes_passed + ":" + seconds_passed + "." + milliseconds_passed);
        console.log("tiempo final");
        console.log(minutes_passed + ":" + seconds_passed + "." + milliseconds_passed);
    }
    timestart = null;
}
*/
/*function Reset() {
    timestart = null;
    document.timeform.timetextarea.value = "00:00";
    document.timeform.laptime.value = "";
}*/

$(document).on("click","#restart_engine",function(){
  window.location.reload();
});

function tirada_finalizada(){
  db.ref('usuario/'+nts_id_firebase+'/'+nts_id_tirada).set({tirada});

  localStorage.setItem("tirada_"+ nts_id_tirada,JSON.stringify(tirada));
  
  $("#container").empty();
  $("#container").append('<div class="row"><div class="col s12">');
  $("#container").append("<p>tu tiempo fue de:  " + localStorage.getItem("nts_tiempo") + " </p> " + 
                        "<p> y tu distancia de: " + localStorage.getItem("nts_distancia") + " </p> " + 
                        "<p> y tu velocidad máxima fue: " + localStorage.getItem("nts_velocidad") + " </p> ");
  $("#container").append('<table>'+
        '<thead>'+
         ' <tr>'+
              '<th data-field="id">nro</th>'+
              '<th data-field="name">velocidad</th>'+
              '<th data-field="price">distancia</th>'+
              '<th data-field="price">lat_inicial</th>'+
              '<th data-field="price">long_inicial</th>'+
              '<th data-field="price">lat</th>'+
              '<th data-field="price">long</th>'+
         ' </tr>'+
        '</thead><tbody>');
  $.each(tirada, function(key, value){
      $("#container").append('<tr><td data-field="id">'+value.nro+'</td>'+
                '<td data-field="name">'+value.velocidad+'</td>'+
                '<td data-field="price">'+value.distancia+'</td>'+
                '<td data-field="price">'+value.lat_inicial+'</td>'+
                '<td data-field="price">'+value.long_inicial+'</td>'+
                '<td data-field="price">'+value.lat+'</td>'+
                '<td data-field="price">'+value.long+'</td></tr>');
  });
  $("#container").append('</tbody></table>');
  $("#container").append('</div></div>');
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}