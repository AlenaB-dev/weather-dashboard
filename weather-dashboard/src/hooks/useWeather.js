import { useState, useEffect, use } from "react";
import { fetchWeather } from "../services/weatherApi";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export function useWeather(lat, lon, cityName) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const url = cityName
    ? `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    : lat && lon
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      : null;

  useEffect(() => {
    if (!url) return; // if no url - exit

    setIsLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch weather");
        return res.json();
      })
      .then((data) => setWeather(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [url]);

  return { weather, error, isLoading };
}
