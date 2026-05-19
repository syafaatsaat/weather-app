import "./styles.css";

class Weather {
  constructor(
    location, 
    conditions, 
    temperature, 
    feelsLike, 
    humidity,
    windSpeed
  ) {
    this.location = location;
    this.conditions = conditions;
    this.temperature = temperature;
    this.feelsLike = feelsLike;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
  }
}

async function getWeatherData(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=9QBSY4Y63DH3CXUKUBQVT85XY&contentType=json`
    );

    const json = await response.json();
    console.log(json);

    const weatherResults = new Weather(
      json.address,
      json.currentConditions.conditions,
      json.currentConditions.temp,
      json.currentConditions.feelslike,
      json.currentConditions.humidity,
      json.currentConditions.windspeed
    );
    console.log(weatherResults);
    return weatherResults;
  } catch(error) {
    console.error(error);
  }
}

function displayWeatherResults(results) {
  const locationDisplay = document.getElementById("location");
  const tempDisplay = document.getElementById("temp");
  const conditionsDisplay = document.getElementById("conditions");
  const feelsLikeDisplay = document.getElementById("feels-like");
  const humidityDisplay = document.getElementById("humidity");
  const windSpeedDisplay = document.getElementById("wind-speed");

  locationDisplay.textContent = results.location;
  tempDisplay.textContent = results.temperature;
  conditionsDisplay.textContent = results.conditions;
  feelsLikeDisplay.textContent = results.feelsLike;
  humidityDisplay.textContent = results.humidity;
  windSpeedDisplay.textContent = results.windSpeed;
}

//getWeatherData("Singapore");

const searchBtn = document.getElementById("search-btn");
const searchBar = document.getElementById("searchbar");
searchBtn.addEventListener("click", () => {
  const searchTerms = searchBar.value;
  getWeatherData(searchTerms).then(response => { 
    displayWeatherResults(response);
  });
});