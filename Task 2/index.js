const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {
    const APIKey = '448008ac828425eb996ad03de1da7268';
    const city = document.querySelector('.search-box input').value;
    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                cityHide.textContent = city;
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            if (cityHide.textContent === city) {
                return;
            } else {
                cityHide.textContent = city;
                container.style.height = '555px';
                container.classList.add('active');
                weatherDetails.classList.add('active');
                error404.classList.remove('active');
                setTimeout(() => {
                    container.classList.remove('active');
                }, 2500);

                let imagePath = '';
                switch (json.weather[0].main) {
                    case 'Clear':
                        imagePath = 'images/clear.png';
                        break;
                    case 'Rain':
                        imagePath = 'images/rain.png';
                        break;
                    case 'Snow':
                        imagePath = 'images/snow.png';
                        break;
                    case 'Clouds':
                        imagePath = 'images/cloud.png';
                        break;
                    case 'Mist':
                    case 'Haze':
                        imagePath = 'images/mist.png';
                        break;
                    default:
                        imagePath = 'images/cloud.png';
                        break;
                }

                console.log('Image Path:', imagePath); // Debugging line to check image path
                image.onerror = function() {
                    console.error('Error loading image:', imagePath);
                };
                image.onload = function() {
                    console.log('Image loaded successfully:', imagePath);
                };
                image.src = imagePath;

                temperature.innerHTML = `${json.main.temp}<span>°C</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${json.wind.speed} km/h`;

                const infoWeather = document.querySelector('.info-weather');
                const infoHumidity = document.querySelector('.info-humidity');
                const infoWind = document.querySelector('.info-wind');
                const cloneInfoWeather = infoWeather.cloneNode(true);
                const cloneInfoHumidity = infoHumidity.cloneNode(true);
                const cloneInfoWind = infoWind.cloneNode(true);
                cloneInfoWeather.id = "clone-info-weather";
                cloneInfoWeather.classList.add('active-clone');

                cloneInfoHumidity.id = "clone-info-humidity";
                cloneInfoHumidity.classList.add('active-clone');

                cloneInfoWind.id = "clone-info-wind";
                cloneInfoWind.classList.add('active-clone');
                setTimeout(() => {
                    infoWeather.insertAdjacentElement("afterend", cloneInfoWeather);
                    infoHumidity.insertAdjacentElement("afterend", cloneInfoHumidity);
                    infoWind.insertAdjacentElement("afterend", cloneInfoWind);
                }, 2200);

                const cloneWeather = document.querySelectorAll('.info-weather.active-clone');
                const totalCloneWeather = cloneWeather.length;
                const cloneWeatherFirst = cloneWeather[0];

                const cloneHumidity = document.querySelectorAll('.info-humidity.active-clone');
                const cloneHumidityFirst = cloneHumidity[0];

                const cloneWind = document.querySelectorAll('.info-wind.active-clone');
                const cloneWindFirst = cloneWind[0];

                if (totalCloneWeather > 0) {
                    cloneWeatherFirst.classList.remove('active-clone');
                    cloneHumidityFirst.classList.remove('active-clone');
                    cloneWindFirst.classList.remove('active-clone');

                    setTimeout(() => {
                        cloneWeatherFirst.remove();
                        cloneHumidityFirst.remove();
                        cloneWindFirst.remove();
                    }, 2200);
                }
            }
        });
});
