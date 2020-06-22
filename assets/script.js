// Global variables
var apikey = "0f5de43a2478789af66c29a4ecce0d69";
var searchBtn = $("#searchBtn");
var cityInput = $(".cityInput");
var oneDayTemperature = $(".temperature");
var oneDayHumidity = $(".humidity");
var oneDayWindSpeed = $(".wind-speed");
var oneDayUvIndex = $(".uv-index");
var cityName = $(".city-name");
var weatherIcon = $(".icon");
var date = $(".date");
var cardsContainer = $(".cards-container");
var cities = $(".cities");
var citiesList = $(".city-list");
var savedCities = [];

// 5 day weather forecast variables
var day1Img = $(".day1-img");
var day2Img = $(".day2-img");
var day3Img = $(".day3-img");
var day4Img = $(".day4-img");
var day5Img = $(".day5-img");

var day1Temp = $(".day1-temp");
var day2Temp = $(".day2-temp");
var day3Temp = $(".day3-temp");
var day4Temp = $(".day4-temp");
var day5Temp = $(".day5-temp");

var day1Hum = $(".day1-humidity");
var day2Hum = $(".day2-humidity");
var day3Hum = $(".day3-humidity");
var day4Hum = $(".day4-humidity");
var day5Hum = $(".day5-humidity");

var day1 = $(".date1");
var day2 = $(".date2");
var day3 = $(".date3");
var day4 = $(".date4");
var day5 = $(".date5");

// hide 5 day forecast cards
cardsContainer.hide();

//store array of cities
var savedCity = JSON.parse(localStorage.getItem("savedCityList"));

//if local storage is not empty then create buttons for the cities in the array
if (savedCity !== null) {

    for (var i = 0; i < savedCity.length; i++) {
        var bt = $("<button>");
        bt.attr("class", "btn btn-light btn-block cities");
        bt.attr("type", "button");

        // bt.attr("aria-disabled", "true");
        bt.text(savedCity[i]);
        citiesList.prepend(bt)
        savedCities.push(savedCity[i])
    }
}


// when city search button clicks it runs ajax calls
searchBtn.click(function () {
    var cityToSearch = cityInput.val();
    cityInput.val(""); //empty input upon search button click


//if input is not empty then store create buttons
if(cityToSearch !== ""){
    var bt = $("<button>");
    bt.attr("class", "btn btn-light btn-block cities");
    bt.attr("type", "button");

    // bt.attr("aria-disabled", "true");
    bt.text(cityToSearch);
    citiesList.prepend(bt);

    savedCities.push(cityToSearch);
    localStorage.setItem("savedCityList", JSON.stringify(savedCities));
}

    //run main weather ajax and five day forecast ajax
    oneDayAjax(cityToSearch);
    fiveDayAjax(cityToSearch);

});

//when cities in the list are clicked run them through the main weather ajax and five day forecast ajax calls
$(".cities").click(function(){
    var cityClicked = $(this).text();
    oneDayAjax(cityClicked);
    fiveDayAjax(cityClicked);
});


//main weather function
function oneDayAjax(city){
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey + "&units=imperial";

    // ajax call for main weather api
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {

        // display temp, wind speed, humidity, and city name for main weather
        oneDayTemperature.text("Temp: " + data.main.temp);
        oneDayWindSpeed.text("Wind speed: " + data.wind.speed);
        oneDayHumidity.text("Humidity: " + data.main.humidity);
        cityName.text(data.name);

        // get todays date
        var d = new Date();
        var a = new Date();
        var t = new Date();
        date.text("(" + (d.getMonth() + 1) + "/" + (a.getDate()) + "/" + (t.getFullYear()) + ")");


        var icon = data.weather[0].icon; //grab icon id
        var iconURL = "http://openweathermap.org/img/wn/" + icon + ".png"; // url for weather icon api
        var iconImg = $("<img>");
        iconImg.attr("src", iconURL);
        weatherIcon.empty().append(iconImg); //append icon img onto img tag


        // get lattitude and longitude for UV index
        var MyLat = data.coord.lat;
        var MyLon = data.coord.lon;

        // UV index url and lattitude and longitude depending on user location
        var UVurl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + MyLat + "&lon=" + MyLon + "&appid=" + apikey;

        // ajax call for UV index
        $.ajax({
            url: UVurl,
            method: "GET"
        }).then(function (response) {
            oneDayUvIndex.text("UV-Index: " + response.value); //display UV index on main weather
        });
    });
}

// five day weather forecast function
// Array values will be updated in the future so it's not hardcoded to a certain time...
function fiveDayAjax(city){
    var fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apikey + "&units=imperial";

    cardsContainer.show();

    $.ajax({
        url: fiveDayUrl,
        method: "GET"
    }).then(function (fiveDay) {

        //dates for each of the 5 days
        var firstDay = fiveDay.list[2].dt_txt;
        var secondDay = fiveDay.list[10].dt_txt;
        var thirdDay = fiveDay.list[18].dt_txt;
        var fourthDay = fiveDay.list[26].dt_txt;
        var fifthDay = fiveDay.list[34].dt_txt;

        // display dates
        day1.text(firstDay);
        day2.text(secondDay);
        day3.text(thirdDay);
        day4.text(fourthDay);
        day5.text(fifthDay);


        // icons for each of the 5 days
        var icon1 = fiveDay.list[2].weather[0].icon;
        var icon2 = fiveDay.list[10].weather[0].icon;
        var icon3 = fiveDay.list[18].weather[0].icon;
        var icon4 = fiveDay.list[26].weather[0].icon;
        var icon5 = fiveDay.list[34].weather[0].icon;

        //dynamically generate img tags for icons
        var icon1URL = "http://openweathermap.org/img/wn/" + icon1 + ".png";
        var icon2URL = "http://openweathermap.org/img/wn/" + icon2 + ".png";
        var icon3URL = "http://openweathermap.org/img/wn/" + icon3 + ".png";
        var icon4URL = "http://openweathermap.org/img/wn/" + icon4 + ".png";
        var icon5URL = "http://openweathermap.org/img/wn/" + icon5 + ".png";

        // create icon img tags and give it iconURL
        var icons1Img = $("<img>");
        icons1Img.attr("src", icon1URL);
        day1Img.empty().append(icons1Img);

        var icons2Img = $("<img>");
        icons2Img.attr("src", icon2URL);
        day2Img.empty().append(icons2Img);

        var icons3Img = $("<img>");
        icons3Img.attr("src", icon3URL);
        day3Img.empty().append(icons3Img);

        var icons4Img = $("<img>");
        icons4Img.attr("src", icon4URL);
        day4Img.empty().append(icons4Img);

        var icons5Img = $("<img>");
        icons5Img.attr("src", icon5URL);
        day5Img.empty().append(icons5Img);


        // temperatures for each of the 5 days
        var temp1 = fiveDay.list[2].main.temp;
        var temp2 = fiveDay.list[10].main.temp;
        var temp3 = fiveDay.list[18].main.temp;
        var temp4 = fiveDay.list[26].main.temp;
        var temp5 = fiveDay.list[34].main.temp;


        // display temps
        day1Temp.text("Temp: " + temp1 + "F");
        day2Temp.text("Temp: " + temp2 + "F");
        day3Temp.text("Temp: " + temp3 + "F");
        day4Temp.text("Temp: " + temp4 + "F");
        day5Temp.text("Temp: " + temp5 + "F");


        //humidity for each of the 5 days
        var hum1 = fiveDay.list[2].main.humidity;
        var hum2 = fiveDay.list[10].main.humidity;
        var hum3 = fiveDay.list[18].main.humidity;
        var hum4 = fiveDay.list[26].main.humidity;
        var hum5 = fiveDay.list[34].main.humidity;


        //display humdity
        day1Hum.text("Humidity: " + hum1 + "%");
        day2Hum.text("Humidity: " + hum2 + "%");
        day3Hum.text("Humidity: " + hum3 + "%");
        day4Hum.text("Humidity: " + hum4 + "%");
        day5Hum.text("Humidity: " + hum5 + "%");

    });

}






