function getWeather() {
    const apiKey = '448008ac828425eb996ad03de1da7268';
    const city = document.getElementById('city').value;
    if (!city) {                                        /*so if user has not entered a locatuion and directly presses on search, this should appear*/
        alert('Please enter the location');  
        return;
    }
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    
    fetch(currentWeatherUrl)    /*it will extract the weather from the api which is stored in the variable*/
        .then(response => response.json())
        .then(data => {
            displayWeather(data); 
        })
        .catch(error => {
            console.error('Error cannot fetch current weather:', error);
            alert('Error fetching current weather data, try again');
        });
    
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error cannot fetch forecast data:', error);
            alert('Error fetching hourly forecast data, try again');
        });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    
   
    
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';
    
    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        const temperatureHTML = `<p>${temperature}°C</p>`;
        const weatherHTML = `<p>${cityName}</p> <p>${description}</p>`;
        
        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;
        showImage();  /*this will show weather image*/
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    
    if (!hourlyForecastDiv) {
        console.error('Hourly forecast element not found');
        return;
    }
    
    const next24Hours = hourlyData.slice(0, 8);  /*it will divide 24 hours into 8 times*/
    
    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
        const hourlyItemHtml = `<div class="hourly-item"><span>${hour}:00</span> <img src="${iconUrl}" alt="Hourly Weather Icon"> <span>${temperature}°C</span></div>`;
        
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    if (weatherIcon) {
        weatherIcon.style.display = 'block';
    }
}
