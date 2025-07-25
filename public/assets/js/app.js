
document.addEventListener("DOMContentLoaded", () => {
  fetch("https://api.open-meteo.com/v1/forecast?latitude=43.7&longitude=-79.42&current=temperature_2m,weathercode&timezone=auto")
    .then(res => res.json())
    .then(data => {
      const temperature = data.current.temperature_2m;
      const code = data.current.weathercode;
      const locationName = "Toronto, Canada";
      const condition = {
        0: "Clear sky ☀️",
        1: "Mainly clear 🌤",
        2: "Partly cloudy ⛅️",
        3: "Overcast ☁️",
        45: "Fog 🌫",
        48: "Depositing rime fog 🌫",
        51: "Drizzle 🌦",
        61: "Rain 🌧",
        71: "Snow ❄️",
        80: "Rain showers 🌧"
      }[code] || "Unknown";

      document.getElementById("location").textContent = locationName;
      document.getElementById("temperature").textContent = `${temperature}°C`;
      document.getElementById("description").textContent = condition;
      document.getElementById("icon").textContent = condition.split(" ")[1] || "☁️";
    });
});
