"use strict";
if(typeof(WeatherSpace === "undefined")) {
    var WeatherSpace = {};
}
$(document).ready(function() {
    WeatherSpace = function() {
        var openurlLat = "http://api.openweathermap.org/data/2.5/weather?lat=",
            openurlLong = "&lon=",
            openurlAPI = "&units=imperial&appid=21a26e9b5858ddbb099ad4c5a96bd377",
            fTemp = true;
            $.getJSON("http://ip-api.com/json", function(data) {
                var positionLat = data["lat"];
                var positionLong = data["lon"];
                console.log(positionLat);
                console.log(positionLong);
                var weatherAPI = openurlLat + positionLat + openurlLong + positionLong + openurlAPI;
              console.log(weatherAPI);
                $.getJSON(weatherAPI, function(json) {
                  console.log(json);
                    let weatherTemp = json["main"].temp,
                        weatherLocation = json.name,
                        weatherCondition = json["weather"][0].description,
                        weatherWD = json["wind"].deg,
                        weatherWindSpeed = json["wind"].speed,
                        checkTemp = false;
                    
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
                    if (weatherCondition == "Sky is Clear" || weatherCondition == "few clouds" || weatherCondition == "broken clouds"
                        || weatherCondition == "scattered clouds" || weatherCondition == "overcast clouds" || weatherCondition == "fog") {
                        $(".stylejumbo").css({
                            "background-image": "url(https://gojacobsons.files.wordpress.com/2014/09/img_8643.jpg)",
                            "background-size": "1150px 800px",
                            "background-repeat": "no-repeat"
                        });
                    }
                    if (weatherCondition == "mist" || weatherCondition == "thunderstorm" || weatherCondition == "rain"
                        || weatherCondition == "shower rain" || weatherCondition == "light rain" || weatherCondition == "moderate rain") {
                        $(".stylejumbo").css({
                            "background-image": "url(http://www.toptenpack.com/wp-content/uploads/2014/05/rain-wallpapers-download.jpg)",
                            "background-size": "1150px 800px",
                            "background-repeat": "no-repeat"
                        });
                    }
                    if (weatherCondition == "snow") {
                        $(".stylejumbo").css({
                            "background-image": "url(http://az616578.vo.msecnd.net/files/2016/01/09/635879112155223228-319755513_635861833670816810507191518_6670-perfect-snow-1920x1080-nature-wallpaper.jpg)",
                            "background-size": "1150px 800px",
                            "background-repeat": "no-repeat"
                        });
                    }
                    weatherTemp >= 80 && weatherTemp <= 100 ? ($(".stylejumbo h1").css({
                        "text-shadow": "0px 0px 2px red, 1px 1px 5px rgb(255, 103, 0)"
                    }), $(".stylejumbo li").css({
                        "background-color": "rgba(255, 150, 125, 0.3)"
                    })) 
                    
                    : checkTemp = false;
                    
                    weatherTemp >= 60 && weatherTemp < 80 ? ($(".stylejumbo h1").css({
                        "text-shadow": "0px 0px 2px yellow, 1px 1px 5px rgb(212, 255, 0)" 
                    }), $(".stylejumbo li").css({
                        "background-color": "rgba(212, 255, 0, 0.3)"
                    }))  
                    
                    : checkTemp = false;
                    
                    weatherTemp <= 59 ? ($(".stylejumbo h1").css({
                        "text-shadow": "0px 0px 2px rgb(23, 175, 255), 1px 1px 5px blue" 
                    }), $(".stylejumbo li").css({
                        "background-color": "rgba(23, 175, 255, 0.3)"
                    }))  
                    
                    : checkTemp = false;
                    
                    $(".jumbotron h1").append(Math.floor(weatherTemp) + " &#186;F");
                    $(".location").append(weatherLocation);
                    $(".condition").append(weatherCondition);
                    $(".wind").append(weatherWD + " " + weatherWindSpeed + " MPH");
                    
                            function convertTemp(temp, CorF) {
                                if (CorF == "c") {
                                    return temp * 1.8 + 32;
                                }else {
                                    return (temp - 32) * .5556;
                                }
                            }
                            $(".buttonstyle").on("click", function() {

                                if (fTemp) {
                                    weatherTemp = convertTemp(weatherTemp, "f");
                                    $(".jumbotron h1").fadeOut(function() {
                                        $(".jumbotron h1").text(Math.floor(weatherTemp)).append(" &#186;C");
                                    });
                                    $(".jumbotron h1").fadeIn();
                                    fTemp = false;
                                } else {
                                    weatherTemp =  convertTemp(weatherTemp, "c");
                                    $(".jumbotron h1").fadeOut(function() {
                                        $(".jumbotron h1").text(Math.floor(weatherTemp)).append(" &#186;F");
                                    });
                                    $(".jumbotron h1").fadeIn();
                                    fTemp = true;
                                } 
                            });
                });        
            });
    }
    WeatherSpace();
});
