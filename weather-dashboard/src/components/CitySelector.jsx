import { useState, useEffect } from "react";

function CitySelector({ onSelect }) {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    if (!query) {
      setCities([]);
      return;
    }

    setLoading(true);

    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`,
    )
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch(() => setCities([]))
      .finally(() => setLoading(false));
  }, [query, API_KEY]);

  return (
    <div className="">
      <input
        type="text"
        placeholder="Type city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && cities.length > 0 && (
        <ul>
          {cities.map((c) => (
            <li
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
