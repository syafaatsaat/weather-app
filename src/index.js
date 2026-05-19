import "./styles.css";

class Weather {
  constructor(
    location, 
    conditions, 
    temperature, 
    feelsLike, 
    humidity,
    windSpeed,
    icon
  ) {
    this.location = location;
    this.conditions = conditions;
    this.temperature = temperature;
    this.feelsLike = feelsLike;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
    this.icon = icon;
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
      json.days[0].conditions,
      json.days[0].temp,
      json.days[0].feelslike,
      json.days[0].humidity,
      json.days[0].windspeed,
      json.days[0].icon
    );
    console.log(weatherResults);
    return weatherResults;
  } catch(error) {
    console.error(error);
  }
}

async function displayWeatherResults(results) {
  const locationDisplay = document.getElementById("location");
  const tempDisplay = document.getElementById("temp");
  const conditionsDisplay = document.getElementById("conditions");
  const feelsLikeDisplay = document.getElementById("feels-like");
  const humidityDisplay = document.getElementById("humidity");
  const windSpeedDisplay = document.getElementById("wind-speed");
  const iconDisplay = document.getElementById("icon");

  locationDisplay.textContent = results.location;
  tempDisplay.textContent = results.temperature + "°C";
  conditionsDisplay.textContent = results.conditions;
  feelsLikeDisplay.textContent = results.feelsLike + "°C";
  humidityDisplay.textContent = results.humidity + "%";
  windSpeedDisplay.textContent = results.windSpeed + " km/h";

  const iconModule = await import(`./assets/${results.icon}.svg`);
  console.log(iconModule);
  iconDisplay.src = iconModule.default;
}

getWeatherData("Singapore").then(response => {
  displayWeatherResults(response);
});

const searchBtn = document.getElementById("search-btn");
const searchBar = document.getElementById("searchbar");
searchBtn.addEventListener("click", () => {
  const searchTerms = searchBar.value;
  getWeatherData(searchTerms).then(response => { 
    displayWeatherResults(response);
  });
});