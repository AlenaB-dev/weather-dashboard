import "./App.css";
import LocationHeader from "./components/LocationHeader";
import WeatherOverview from "./components/WeatherOverview";
import TemperatureNow from "./components/TemperatureNow";
import ForecastList from "./components/ForecastList";
import CitySelector from "./components/CitySelector";
import { useGeolocation } from "./hooks/useGeolocation";
import { useWeather } from "./hooks/useWeather";
import { useForecast } from "./hooks/useForecast";
import { useState } from "react";

function App() {
  // select another city
  const [selectedCity, setSelectedCity] = useState(null);

  // use geolocation
  const { city, position, error: geoError } = useGeolocation();

  const lat = selectedCity?.lat ?? position?.lat;
  const lon = selectedCity?.lon ?? position?.lon;

  const {
    weather,
    error: weatherError,
    isLoading: weatherLoading,
  } = useWeather(lat, lon);

  const handleChangeCity = () => {
    const newCity = prompt("Enter city name:");
    if (newCity) setCustomCity(newCity);
  };

  let cityLabel = "Detecting location...";

  if (geoError) cityLabel = "Location unavailable";
  if (city) cityLabel = city;

  const date = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // forecast for three days ahead
  const {
    forecast,
    isLoading: forecastLoading,
    error: forecastError,
  } = useForecast(position?.lat, position?.lon);

  return (
    <>
      <LocationHeader city={cityLabel} date={date} />
      <div>
        <WeatherOverview
          weather={weather}
          isLoading={weatherLoading}
          error={weatherError}
          weatherIcon="https://openweathermap.org/img/wn/10d@2x.png"
        />
        {geoError && <p>{geoError}</p>}
      </div>

      <TemperatureNow
        temperature={weather?.main.temp}
        description={weather?.weather[0].description}
      />
      <div>
        {forecastLoading && <p>Loading forecast...</p>}
        {forecastError && <p>{forecastError}</p>}
        <ForecastList forecast={forecast} />
      </div>

      <CitySelector onSelect={setSelectedCity} />
    </>
  );
}

export default App;
