var searchResultsList = document.querySelector("#search-results")


document.querySelector("#searchBtn").addEventListener("click",function(event){
    event.preventDefault();
    
    navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        console.log(lat);
        console.log(long);

    });
var recentlySearchedBtn = document.createElement("button")
searchResultsList.appendChild(recentlySearchedBtn);
recentlySearchedBtn.innerText = (event.previousElementSibling.value);
recentlySearchedBtn.classList.add(btn-primary);
recentlySearchedBtn.classList.add(btn-lg);
recentlySearchedBtn.classList.add(btn-submit);
// Then add event listeners to these buttons that place their text in the search bar when clicked on


});
    // let url = `https://api.openweathermap.org/data/2.5/weather?q=${event.target.previousElementSibling.value}&appid=5a6c381eff5da6821375839c867e53a4`

    // 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}'}

    // https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid={API key}

//     fetch(url).then(function(response){
//         console.log(response)
//     })

//     console.log(url)
// })


