
document.addEventListener('DOMContentLoaded', function () {
  const weatherIcon = document.getElementById('weather-icon');
  const conditionText = document.getElementById('condition');

  function getIcon(condition) {
    const iconMap = {
      clear: '☀️',
      sunny: '☀️',
      'partly-cloudy': '⛅',
      cloudy: '☁️',
      overcast: '☁️',
      rain: '🌧️',
      drizzle: '🌦️',
      snow: '❄️',
      thunderstorm: '🌩️',
      windy: '🌬️',
      fog: '🌫️',
      mist: '🌫️'
    };
    return iconMap[condition] || '❓';
  }

  async function fetchWeather() {
    try {
      const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=43.65107&longitude=-79.347015&current=temperature_2m,weathercode&timezone=auto');
      const data = await response.json();
      const temperature = data.current.temperature_2m;
      const weatherCode = data.current.weathercode;

      const condition = mapWeatherCodeToCondition(weatherCode);

      document.getElementById('temperature').textContent = temperature + '°';
      conditionText.textContent = condition.charAt(0).toUpperCase() + condition.slice(1);
      weatherIcon.textContent = getIcon(condition);
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
    }
  }

  function mapWeatherCodeToCondition(code) {
    if ([0, 1].includes(code)) return 'clear';
    if ([2, 3].includes(code)) return 'partly-cloudy';
    if ([45, 48].includes(code)) return 'fog';
    if ([51, 53, 55, 56, 57].includes(code)) return 'drizzle';
    if ([61, 63, 65, 66, 67].includes(code)) return 'rain';
    if ([71, 73, 75, 77].includes(code)) return 'snow';
    if ([80, 81, 82].includes(code)) return 'rain';
    if ([95, 96, 99].includes(code)) return 'thunderstorm';
    return 'cloudy';
  }

  fetchWeather();
});
