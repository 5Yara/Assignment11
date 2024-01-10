// let findCity = document.getElementById('#findCity');
let todayName = document.getElementById('todayName');
let todayDate = document.getElementById('todayDate');
let todayMonth = document.getElementById('todayMonth');
let cityLocation = document.getElementById('cityLocation');
let todayTemperature = document.getElementById('todayTemperature');
let todayForecastIcon = document.getElementById('todayForecastIcon');
let descOfWeather = document.getElementById('descOfWeather');
let humidity = document.getElementById('humidity');
let windSpeed = document.getElementById('windSpeed');
let windDirection = document.getElementById('windDirection');

let Nextday = document.getElementsByClassName('Nextday');
let NextDayForecastIcon = document.getElementsByClassName('NextDayForecastIcon');
let maxTemp = document.getElementsByClassName('maxTemp');
let minTemp = document.getElementsByClassName('minTemp');
let NextDayDescOfWeather = document.getElementsByClassName('NextDayDescOfWeather');

let searchCity = document.getElementById('searchCity');

async function getWeather(cityName) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6a1945082ea748fc95f180026240901&q=${cityName}&days=3`);
    let result = await response.json();
    return result;
}



function displayTodayWeather(data) {
    let dateOfToday = new Date();
    todayName.innerHTML = dateOfToday.toLocaleDateString('en-US', { weekday: 'long' });
    todayDate.innerHTML = dateOfToday.getDate();
    todayMonth.innerHTML = dateOfToday.toLocaleDateString('en-US', { month: 'long' });
    cityLocation.innerHTML = data.location.name;
    todayTemperature.innerHTML = data.current.temp_c;
    todayForecastIcon.setAttribute('src', data.current.condition.icon);
    descOfWeather.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity + "%";
    windSpeed.innerHTML = data.current.wind_kph + "Km/h";
    windDirection.innerHTML = data.current.wind_dir;
}

function displayNextDayWeather(data) {
    for (let i = 0; i < 2; i++) {
        let theDayAfterToday = new Date(data.forecast.forecastday[i + 1].date);
        Nextday[i].innerHTML = theDayAfterToday.toLocaleDateString('en-US', { weekday: 'long' });
        NextDayForecastIcon[i].setAttribute('src', 'data.forecast.forecastday[i+1].day.condition.icon');
        maxTemp[i].innerHTML = data.forecast.forecastday[i + 1].day.maxtemp_c;
        minTemp[i].innerHTML = data.forecast.forecastday[i + 1].day.mintemp_c;
        NextDayDescOfWeather[i].innerHTML = data.forecast.forecastday[i + 1].day.condition.text;
    }
}

async function weather(city = 'cairo') {
    let getWeatherData = await getWeather(city);
    if (!getWeatherData.error) {
        displayTodayWeather(getWeatherData);
        displayNextDayWeather(getWeatherData);
    }
}

weather();

searchCity.addEventListener('input', function () {
    weather(searchCity.value)
})