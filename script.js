const API_KEY = "87268975ad594f0ee4fecc96a4a72044";

getCurrentLocation();

function darkmode() {
  var body = document.body;
  var btn = document.getElementById("dark");
  var sbtn = document.getElementById("search-btn");
  body.classList.toggle("bg-dark")
  btn.classList.toggle("bg-white")
  sbtn.classList.toggle("bg-white")
}


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
  const CITY = document.getElementById("search-city").value;
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
      let icon = data.weather[0].icon;
      let city = data.name;
      let temp = data.main.temp;
      let country = data.sys.country;
      let windSpeed = data.wind.speed;
      document.getElementById('not').innerHTML = ``;
      SendWeatherReport(id, desc, city, weather, temp, windSpeed, country, icon, data);
    })
    .catch((error) => {
      document.getElementById('not').innerHTML = `not found`;
      console.log(error);
    });
}

function SendWeatherReport(id, desc, city, weather, temp, windSpeed, country, icon) {
  const date = new Date();
  document.getElementById("w-report").innerHTML = `${weather}`;
  temp = temp - 273.15;
  document.getElementById("t-report").innerHTML = `${temp.toFixed(2)} &#8451`;
  document.getElementById("wi-report").innerHTML = `${windSpeed} KpH`;
  document.getElementById("city").innerHTML = `${city}`;
  document.getElementById('time').innerHTML = `${date.toLocaleTimeString()}`;
  document.getElementById('date').innerHTML = `${date.toDateString()}`;
  document.getElementById("location").innerHTML = `- ${city},${country}`;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  document.getElementById("logo").src = iconUrl;
}

