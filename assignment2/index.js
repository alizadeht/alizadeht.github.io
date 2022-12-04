document
    .querySelector(".search-bar")
    .addEventListener("keyup", function(event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();

});

let weather = {
    apiKey: "93196bf04bf9c3222a80dd93c555e87f",
    fetchWeather: function(city) {
        fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&appid=" +
                this.apiKey
            )
            .then((response) => {
                return response.json();
            })
            .then((data) => this.showWeather(data));
    },


    showWeather: function(data) {
        const { name } = data;
        const { country } = data.sys;
        const { icon, description } = data.weather[0];
        const { temp, feels_like, temp_min, temp_max, humidity, pressure } = data.main;
        const { speed, deg } = data.wind;
        const { lon, lat } = data.coord;


        document.querySelector(".city").innerText = "Now weather in " + name + "," + country;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = Math.floor(temp) + "°C";
        document.querySelector(".feels_like").innerText =
            "Feels like: " + Math.floor(feels_like) + "°C";
        document.querySelector(".temp_min").innerText =
            "Minimum temperature: " + Math.floor(temp_min) + "°C";
        document.querySelector(".temp_max").innerText =
            "Maximum temperature: " + Math.floor(temp_max) + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".pressure").innerText =
            "Pressure: " + pressure + "  " + "hPa";
        document.querySelector(".wind").innerText =
            "Wind speed: " + Math.floor((speed) * (5 / 18)) + " m/s";
        document.querySelector(".deg").innerText =
            "Wind degree: " + deg + "°";

        document.querySelector(".lat").innerText =
            "Latitude: " + lat;
        document.querySelector(".lon").innerText =
            "Longitude: " + lon;


        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
}

function onSuccess(position) {
    const { latitude, longitude } = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=93196bf04bf9c3222a80dd93c555e87f`;
    fetchData();
}