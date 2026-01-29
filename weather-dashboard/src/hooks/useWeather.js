import { useState, useEffect, use } from "react";
import { fetchWeather } from "../services/weatherApi";

export function useWeather(lat, lon) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!lat || !lon) return;

    setIsLoading(true);
    fetchWeather(lat, lon)
      .then((data) => setWeather(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [lat, lon]);

  return { weather, error, isLoading };
}
