# Weather Dashboard
https://katean004.github.io/weather-dashboard/
![](https://i.gyazo.com/3c9f7e0ee80506b0020f32a151902486.png)

# Purpose
To request and retrieve data from the Weather API using specific parameters and organize the information. 

# User Story
Traveler wants to see the weather outlook for multiple cities so they can plan their trip accordingly. 

# Acceptance Criteria
GIVEN a weather dashboard with form inputs:

WHEN I search for a city
    THEN I am presented with current and future conditions for that city and that city is added to the search history

WHEN I view current weather conditions for that city
    THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

WHEN I view the UV index
    THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

WHEN I view future weather conditions for that city
    THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity

WHEN I click on a city in the search history
    THEN I am again presented with current and future conditions for that city

WHEN I open the weather dashboard
    THEN I am presented with the last searched city forecast
