function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    } 
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
return days[day];
}

function displayForecast(response) {
let forecast = response.data.daily;
let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;

forecast.forEach(function (forecastDay, index) {
if (index < 6) {
forecastHTML = forecastHTML + `
<div class="col-2">
  <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
  <img src="${changeWeatherIcon(forecastDay.weather[0].icon)}" 
  width="50"
  id="forecast-icon"/>

  <div class="forecast-temperature">
  <span class="forecast-temp-max">${Math.round(forecastDay.temp.max)}° / </span>
  <span class="forecast-temp-min">${Math.round(forecastDay.temp.min)}°</span>
  </div>
</div>`;}
console.log(response.data)
});

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
};


function changeWeatherIcon(icon) {
    iconNumber = icon.slice(0);
    let icons = {
      "01d": "img/clear-sky.png",
      "01n": "img/clear-sky-night.png",
      "02d": "img/few-clouds.png",
      "02n": "img/few-clouds-night.png",
      "03d": "img/scattered-clouds.png",
      "03n": "img/few-clouds-night.png",
      "04d": "img/broken-clouds.png",
      "04n": "img/broken-clouds.png",
      "09d": "img/shower-rain.png",
      "09n": "img/shower-rain-night.png",
      "10d": "img/rain.png",
      "10n": "img/rain-night.png",
      "11d": "img/thunderstorm.png",
      "11n": "img/thunderstorm.png",
      "13d": "img/snow.png",
      "13n": "img/snow.png",
      "50d": "img/mist.png",
      "50n": "img/mist.png",
    };
    
    return icons[iconNumber];
  }

function getForecast(coordinates) {
let apiKey = "2b5667a8237d1b01430707e2a1deb6dc";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response){
    let temperatureElement = document.querySelector("#current-temperature");
    celsiusTemperature = response.data.main.temp;
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    let cityElement = document.querySelector("#city").innerHTML = response.data.name;
    let descriptionElement = document.querySelector("#description").innerHTML = response.data.weather[0].description;
    let humidityElement = document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    let windElement = document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    let dateElement = document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);
    document.querySelector("#main-icon")
    .setAttribute("src", `${changeWeatherIcon(response.data.weather[0].icon)}`);


    getForecast(response.data.coord);

}

function search(city) {
let apiKey = "2b5667a8237d1b01430707e2a1deb6dc";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

search("Kyiv");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


function celsiusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#current-temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
  }
  let celsius = document.querySelector("#C");
  celsius.addEventListener("click", celsiusTemperature);
  

  function farenheitTemperature(event) {
    event.preventDefault();
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    let temperatureElement = document.querySelector("#current-temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  }

  let fahrenheit = document.querySelector("#F");
  fahrenheit.addEventListener("click", farenheitTemperature);

  