var searchResultsList = document.querySelector("#search-results");
var oneDayHeader = document.querySelector("#one-day-header");
var oneDayWind = document.querySelector("#one-day-wind");
var oneDayTemp = document.querySelector("#one-day-temp");
var oneDayHumidity = document.querySelector("#one-day-humidity");
var oneDayUV = document.querySelector("#one-day-uv");
var searchResults = document.querySelector("#search-results");
var fiveDayForecastColumns = document.querySelector("#five-day");

let buttonArray = JSON.parse(localStorage.getItem("previousSearch")) || []

// Gives buttons to show search history
recentlySearchedColumn = function () {
    searchResults.innerHTML = "";
    for (i = 0; i < buttonArray.length; i++) {
        var recentlySearchedBtn = document.createElement("button")
        searchResultsList.appendChild(recentlySearchedBtn);
        recentlySearchedBtn.innerText = (buttonArray[i]);
        recentlySearchedBtn.classList.add("btn-primary");
        recentlySearchedBtn.classList.add("btn-lg");
        recentlySearchedBtn.classList.add("btn-submit");
    }
}

recentlySearchedColumn();


// Press submit, adds another search history button, makes those buttons useable
document.querySelector("#searchBtn").addEventListener("click", function (event) {
    event.preventDefault();
    var cityName = document.getElementById("search-box").value;
    if (!cityName) {
        alert("Please enter a city");
        return;
    }
    buttonArray.push(cityName)
    localStorage.setItem("previousSearch", JSON.stringify(buttonArray));
    recentlySearchedColumn();
    searchApi(cityName);
});
searchResultsList.addEventListener("click", function (event) {
    searchApi(event.target.innerText);
})


// function that fills in weather columns
function searchApi(cityName) {
    fiveDayForecastColumns.innerHTML = "";

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=5a6c381eff5da6821375839c867e53a4`

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // Adds data to 1-Day-Forecast
            oneDayHeader.innerText = cityName;
            var weatherWind = data.wind.speed;
            oneDayWind.innerText = ("Wind: " + weatherWind + "mph");
            var weatherTemp = data.main.temp;
            oneDayTemp.innerText = ("Temperature: " + weatherTemp + "°F");
            var weatherHumidity = data.main.humidity;
            oneDayHumidity.innerText = ("Humidity: " + weatherHumidity + "%");

            // lat and long for oneCallURL
            var weatherLon = data.coord.lon;
            var weatherLat = data.coord.lat;

            let oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${weatherLat}&lon=${weatherLon}&units=imperial&appid=5a6c381eff5da6821375839c867e53a4`

            fetch(oneCallUrl).then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data)

                // UVI for one day forecast
                var weatherUVI = data.current.uvi;
                oneDayUV.innerText = (weatherUVI);

                if (weatherUVI <= 2) {
                    oneDayUV.classList.add("safe")
                }
                else if (weatherUVI <= 5) {
                    oneDayUV.classList.add("mostly-safe")
                }
                else if (weatherUVI < 8) {
                    oneDayUV.classList.add("dangerous")
                }
                else {
                    oneDayUV.classList.add("very-dangerous")
                }

                // 5 day forecast
                for (i = 0; i < 5; i++) {
                    let newDay = document.createElement("div");
                    newDay.classList.add("day")

                    let date = document.createElement("h3")
                    newDay.appendChild(date);
                    let today = new Date();
                    var fiveDayDate = (today.getMonth() + "/" + (today.getDate() + i))
                    date.innerText = fiveDayDate;

                    let iconCode = data.daily[i].weather[0].icon
                    let iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`
                    let icon = document.createElement("img");
                    icon.src = iconUrl;
                    newDay.appendChild(icon);

                    let temp = document.createElement("p")
                    newDay.appendChild(temp);
                    var fiveDayTemp = data.daily[i].temp.day;
                    temp.innerText = ("Temperature: " + fiveDayTemp + "°F");

                    let wind = document.createElement("p")
                    newDay.appendChild(wind);
                    var fiveDayWind = data.daily[i].wind_speed;
                    wind.innerText = ("Wind: " + fiveDayWind + "mph");

                    let humidity = document.createElement("p")
                    newDay.appendChild(humidity);
                    var fiveDayHumidity = data.daily[i].humidity;
                    humidity.innerText = ("Humidity: " + fiveDayHumidity + "%");

                    fiveDayForecastColumns.appendChild(newDay)
                }
            })
        });
}