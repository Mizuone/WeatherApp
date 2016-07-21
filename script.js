"use strict";
if(typeof(WeatherSpace === "undefined")) {
    var WeatherSpace = {};
}
$(document).ready(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    }else {
        $(".jumbotron").text("Your browser doesn't support this App!");
    }
    WeatherSpace = function() {
        var weatherAPI = "'http://api.openweathermap.org/data/2.5/&appid=21a26e9b5858ddbb099ad4c5a96bd377&units=imperial&forecast?lat='+position.coords.latitude+
                                    '&lon='+position.coords.longitude+'&callback=?'"
    }
    WeatherSpace();
});