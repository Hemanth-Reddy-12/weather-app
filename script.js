const API_KEY = "87268975ad594f0ee4fecc96a4a72044";

getCurrentLocation();

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      console.log("Latitude: " + lat + " Longitude: " + lng);

      const LL_LINK = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`;
      getWeather(LL_LINK);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

document.getElementById("search-btn").onclick = function getCity() {
  const CITY = document.getElementById("city").value;
  const LINK = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}`;
  getWeather(LINK);
};

function getWeather(LINK) {
  fetch(LINK)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let weather = data.weather[0].main;
      let id = data.weather[0].id;
      let desc = data.weather[0].description;
      let city = data.name;
      let temp = data.main.temp;
      let country = data.sys.country;
      let windSpeed = data.wind.speed;
      SendWeatherReport(id, desc, city, weather, temp, windSpeed, country);
    })
    .catch((error) => {
      document.getElementById(
        "result"
      ).innerHTML = `<p class="display-2">city not found</p>`;
    });
}

function SendWeatherReport(id, desc, city, weather, temp, windSpeed, country) {
  let w = `<span style="color: #F05454">weather</span><br>${weather}`;
  document.getElementById("weather").innerHTML = w;
  temp = temp - 273.15;
  let t = `<span style="color: #F05454">temperature</span><br>${temp.toFixed(
    2
  )} &#8451`;
  document.getElementById("temp").innerHTML = t;
  let speed = `<span style="color: #F05454">wind Speed</span><br>${windSpeed}`;
  document.getElementById("wind").innerHTML = speed;
  document.getElementById("location").innerHTML = `${city},${country}`;
  logo = getWeatherIcon(id);
  document.getElementById("desc").innerHTML = desc;
  document.getElementById("logo").innerHTML = logo;
}

function getWeatherIcon(weatherId) {
  // Map the weather ID to a corresponding emoji
  if (weatherId >= 200 && weatherId < 300) {
    // Thunderstorm
    return `<i class="fas fa-solid fa-cloud-bolt fa-beat fa-7x"></i>`;
  } else if (weatherId >= 300 && weatherId < 600) {
    // Rain
    return `<i class="fas fa-solid fa-cloud-rain fa-bounce fa-7x"></i>`;
  } else if (weatherId >= 600 && weatherId < 700) {
    // Snow
    return `<i class="fas fa-regular fa-snowflake fa-spin fa-7x"></i>`;
  } else if (weatherId >= 700 && weatherId < 800) {
    // Atmosphere (fog, mist, haze, etc.)
    return `<i class="fas fa-solid fa-smog fa-fade fa-7x"></i>`;
  } else if (weatherId === 800) {
    // Clear
    return `<i class="fas fa-solid fa-sun fa-spin fa-7x"></i>`;
  } else if (weatherId > 800 && weatherId < 900) {
    // Cloudy
    return `<i class="fas fa-solid fa-wind fa-7x"></i>`;
  } else {
    // Unknown
    return `<i class="fas fa-solid fa-circle-question fa-shake fa-7x"></i>`;
  }
}
