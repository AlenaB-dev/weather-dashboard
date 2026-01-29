const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function fetchWeather(lat, lon) {
  if (!lat || !lon) throw new Error("Latitude and longitude are required");

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
  );

  if (!res.ok) throw new Error("Failed to fetch weather");
  return res.json();
}
