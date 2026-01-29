import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export function useForecast(lat, lon) {
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;

    setIsLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch forecast");
        return res.json();
      })
      .then((data) => {
        //first forecast of each day
        const dailyForecast = data.list
          .filter((item) => item.dt_txt.includes("12:00:00"))
          .slice(0, 3); // showing first three days

        const mapped = dailyForecast.map((item) => ({
          day: new Date(item.dt_txt).toLocaleDateString("en-GB", {
            weekday: "short",
          }),
          temp: `$Math.round(item.main.temp)°C`,
          icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
        }));

        setForecast(mapped);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [lat, lon]);

  return { forecast, isLoading, error };
}
