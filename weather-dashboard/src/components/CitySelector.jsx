import { useState, useEffect } from "react";
import cityStyle from "./CitySelector.module.css";

function CitySelector({ onSelect }) {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  // Debounce
  useEffect(() => {
    if (!query) {
      setCities([]);
      return;
    }

    const handler = setTimeout(() => {
      setLoading(true);

      fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`,
      )
        .then((res) => res.json())
        .then((data) => setCities(data))
        .catch(() => setCities([]))
        .finally(() => setLoading(false));
    }, 500); // postpone query for 500 mlsec

    //drop timer
    return () => clearTimeout(handler);
  }, [query, API_KEY]);

  return (
    <div className={cityStyle.citySection}>
      <input
        type="text"
        placeholder="Pick another city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && cities.length > 0 && (
        <ul className={cityStyle.cityList}>
          {cities.map((c) => (
            <li
              className={cityStyle.cityItem}
              key={`${c.name}-${c.lat}-${c.lon}`}
              onClick={() => {
                onSelect({
                  name: c.name,
                  lat: c.lat,
                  lon: c.lon,
                }); // передаём выбранный город
                setQuery(""); // очищаем поле
                setCities([]);
              }}
            >
              {c.name},{c.state ? c.state + ", " : ""}
              {c.country}
            </li>
          ))}
        </ul>
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default CitySelector;
