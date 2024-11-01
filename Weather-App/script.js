document.getElementById('city-input').addEventListener('input', function() {
    const query = this.value;
    if (query.length >= 3) {
        fetchCitySuggestions(query);
    } else {
        document.getElementById('suggestions').innerHTML = '';
    }
});

document.getElementById('city-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});

async function fetchCitySuggestions(query) {
    const apiKey = 'b2b1566f402c2e90c7b7d31f9e71321c';
    const url = `https://api.openweathermap.org/data/2.5/find?q=${query}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const suggestions = data.list.map(city => `
            <a href="#" class="list-group-item list-group-item-action" onclick="selectCity('${city.name}')">
                ${city.name}, ${city.sys.country}
            </a>
        `).join('');

        document.getElementById('suggestions').innerHTML = suggestions;
    } catch (error) {
        console.error('Error fetching city suggestions:', error);
    }
}

function selectCity(city) {
    document.getElementById('city-input').value = city;
    document.getElementById('suggestions').innerHTML = '';
}

async function getWeather() {
    const city = document.getElementById('city-input').value;
    const apiKey = 'b2b1566f402c2e90c7b7d31f9e71321c';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    document.getElementById('loader').classList.remove('hidden');
    document.getElementById('weather-result').classList.add('hidden');
    document.getElementById('suggestions').innerHTML = '';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        const weatherEmoji = getWeatherEmoji(data.weather[0].main);

        const weatherHTML = `
            <div class="city-name">${data.name}, ${data.sys.country} ${weatherEmoji}</div>
            <div class="temperature display-4">${data.main.temp}°C</div>
            <p class="text-secondary">Weather: ${data.weather[0].description}</p>
            <p class="text-secondary">Humidity: ${data.main.humidity}%</p>
            <p class="text-secondary">Wind Speed: ${data.wind.speed} m/s</p>
        `;

        document.getElementById('weather-result').innerHTML = weatherHTML;
        document.getElementById('weather-result').classList.remove('hidden');
    } catch (error) {
        document.getElementById('weather-result').innerHTML = `<p class="text-danger">${error.message}</p>`;
        document.getElementById('weather-result').classList.remove('hidden');
    } finally {
        document.getElementById('loader').classList.add('hidden');
    }
}

function getWeatherEmoji(mainWeather) {
    switch (mainWeather.toLowerCase()) {
        case 'clear':
            return '☀️';
        case 'clouds':
            return '☁️';
        case 'rain':
            return '🌧️';
        case 'thunderstorm':
            return '⛈️';
        case 'snow':
            return '❄️';
        case 'mist':
            return '🌫️';
        default:
            return '';
    }
}
