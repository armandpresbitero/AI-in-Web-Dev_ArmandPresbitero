
document.addEventListener("DOMContentLoaded", () => {
  const tempEl = document.getElementById("temperature");
  const locationEl = document.getElementById("location");
  const iconEl = document.getElementById("weather-icon");

  if (!tempEl || !locationEl || !iconEl) return;

  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    const data = await response.json();

    const temp = Math.round(data.current_weather.temperature);
    tempEl.textContent = `${temp}°C`;
    locationEl.textContent = `Lat: ${lat.toFixed(2)} | Lon: ${lon.toFixed(2)}`;

    const code = data.current_weather.weathercode;
    let icon = "01d";
    if (code >= 2 && code <= 3) icon = "02d";
    if (code >= 45 && code <= 48) icon = "50d";
    if (code >= 51 && code <= 67) icon = "09d";
    if (code >= 71 && code <= 77) icon = "13d";
    if (code >= 80 && code <= 99) icon = "11d";
    iconEl.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  });
});
