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
  // selected city
  const [selectedCity, setSelectedCity] = useState(null);

  // geolocation
  const { city, position, error: geoError } = useGeolocation();

  // API's coords: choosed city or geolocation
  const lat = selectedCity?.lat ?? position?.lat;
  const lon = selectedCity?.lon ?? position?.lon;

  // weather
  const {
    weather,
    error: weatherError,
    isLoading: weatherLoading,
  } = useWeather(lat, lon);

  // forecast for three days ahead
  const {
    forecast,
    isLoading: forecastLoading,
    error: forecastError,
  } = useForecast(lat, lon);

  // country code in country name
  const regionName = new Intl.DisplayNames(["en"], { type: "region" });
  // city name in heading
  let cityLabel = "Detecting location...";
  if (selectedCity) {
    const countryName = selectedCity.country
      ? regionName.of(selectedCity.country)
      : "";
    cityLabel = `${selectedCity.name}${selectedCity.state ? `, ${selectedCity.state}` : ""}, ${countryName}`;
  } else if (geoError) {
    cityLabel = "Location unavailable";
  } else if (city) {
    cityLabel = city;
  }

  // current date
  const date = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // background image state
  const getWeatherClass = (condition) => {
    switch (condition) {
      case "Rain":
      case "Drizzle":
        return "weather-rain";
      case "Clear":
        return "weather-sun";
      case "Clouds":
        return "weather-clouds";
      case "Snow":
        return "weather-snow";
      default:
        return "weather-default";
    }
  };

  const weatherClass = getWeatherClass(weather?.weather[0]?.main);

  // determining the time of day
  let timeOfDayClass = "day"; // day time by default

  if (weather?.sys?.sunrise && weather?.sys?.sunset) {
    const sunrise = weather.sys.sunrise;
    const sunset = weather.sys.sunset;
    const currentTime = Math.floor(Date.now() / 1000);

    if (currentTime < sunrise || currentTime > sunset) {
      timeOfDayClass = "night";
    } else if (currentTime >= sunrise && currentTime < sunrise + 3600) {
      timeOfDayClass = "sunrise";
    } else if (currentTime <= sunrise && currentTime > sunset - 3600) {
      timeOfDayClass = "sunset";
    } else {
      timeOfDayClass = "day";
    }
  }

  return (
    <div className={`app ${weatherClass} ${timeOfDayClass}`}>
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
    </div>
  );
}

export default App;
