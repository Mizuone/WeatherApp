"use strict";
if(typeof(WeatherSpace === "undefined")) {
    var WeatherSpace = {};
}
$(document).ready(function() {
    WeatherSpace = function() {
        var openurlLat = "http://api.openweathermap.org/data/2.5/find?lat=",
            openurlLong = "&lon=",
            openurlAPI = "&cnt=10&units=imperial&appid=21a26e9b5858ddbb099ad4c5a96bd377";
        
            if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
                
                var weatherAPI = openurlLat + position.coords.latitude + openurlLong + position.coords.longitude + openurlAPI;
                $.getJSON(weatherAPI, function(json) {
                    let weatherTemp = json.list[0].main.temp,
                        weatherLocation = json.list[0].name,
                        weatherCondition = json.list[0].weather[0].description,
                        weatherWD = json.list[0].wind.deg,
                        weatherWindSpeed = json.list[0].wind.speed;
                    
                    switch(true) {
                        case weatherWD == 360: weatherWD = "N"; break;
                        case weatherWD >= 0 && weatherWD <= 45: weatherWD = "NE"; break;
                        case weatherWD >= 45 && weatherWD <= 90: weatherWD = "E"; break;
                        case weatherWD >= 90 && weatherWD <= 135: weatherWD = "SE"; break;
                        case weatherWD >= 135 && weatherWD <= 180: weatherWD = "S"; break;
                        case weatherWD >= 180 && weatherWD <= 225: weatherWD = "SW"; break;
                        case weatherWD >= 225 && weatherWD <= 270: weatherWD = "W"; break;
                        case weatherWD >= 270 && weatherWD <= 315: weatherWD = "NW"; break;
                        case weatherWD >= 315 && weatherWD <= 360: weatherWD = "N"; break;
                            
                        default: weatherWD = "null"; break;
                    }
                    if (weatherCondition == "Sky is Clear" || weatherCondition == "few clouds") {
                        $(".stylejumbo").css({
                            "background-image": "url(https://gojacobsons.files.wordpress.com/2014/09/img_8643.jpg)",
                            "background-size": "1150px, 100px, cover",
                            "background-repeat": "no-repeat"
                        });
                    }
                    
                    $(".jumbotron h1").append(Math.floor(weatherTemp) + " &#186;F");
                    $(".location").append(weatherLocation);
                    $(".condition").append(weatherCondition);
                    $(".wind").append(weatherWD + " " + weatherWindSpeed + " MPH");
                });        
        });
        }else {
            $(".jumbotron").text("Your browser doesn't support this App!");
        }
        
    }
    WeatherSpace();
});
