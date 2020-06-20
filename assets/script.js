// Global variables
var apikey = "0f5de43a2478789af66c29a4ecce0d69"
var searchBtn= $("#searchBtn")
var cityInput = $(".cityInput")
var oneDayTemperature = $(".temperature")
var oneDayHumidity = $(".humidity")
var oneDayWindSpeed = $(".wind-speed")
var oneDayUvIndex = $(".uv-index")



searchBtn.click(function(){
var cityToSearch= cityInput.val()
console.log(cityToSearch);
                    
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ cityToSearch +"&appid="+apikey+"&units=imperial"

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(data){
    console.log(data);
    oneDayTemperature.text("Temp: "+data.main.temp)
    oneDayWindSpeed.text("Wind speed: "+data.wind.speed)
    oneDayHumidity.text("Hunidity: "+data.main.humidity)
    var MyLat= data.coord.lat
    var MyLon= data.coord.lon

    var UVurl = "https://api.openweathermap.org/data/2.5/uvi?lat="+ MyLat + "&lon=" + MyLon + "&appid="+ apikey

    $.ajax({
        url: UVurl,
        method: "GET"
    }).then(function(response){
        oneDayUvIndex.text("UV-Index: "+ response.value)
    })

})

var fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityToSearch + "&appid="+ apikey

$.ajax({
    url: fiveDayUrl,
    method: "GET"
}).then(function(fiveDayResponse){
    console.log(fiveDayResponse)
})

})


// Dynamically create city list 



// Display city searched and its info from Weather Map API





