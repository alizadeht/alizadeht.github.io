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
                    if (!response.ok) {
                        alert("Error,check again!");
                        throw new Error("Error,check again!");
                    }
                    return response.json();
                })
                .then((data) => this.displayWeather(data));
        }