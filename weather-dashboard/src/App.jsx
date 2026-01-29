import "./App.css";
import LocationHeader from "./components/LocationHeader";
import WeatherOverview from "./components/WeatherOverview";
import TemperatureNow from "./components/TemperatureNow";
import ForecastList from "./components/ForecastList";
import ChangeCityButton from "./components/ChangeCityButton";
import { useGeolocation } from "./hooks/useGeolocation";

function App() {
  const forecastMock = [
    { day: "Tue", temp: "18°C", icon: "/sun.png" },
    { day: "Wend", temp: "16°C", icon: "/cloud.png" },
    { day: "Thur", temp: "19°C", icon: "/sun.png" },
  ];

  // use geolocation
  const { city, position, error, isLoading } = useGeolocation();

  let cityLabel = "Detecting location...";

  if (error) cityLabel = "Location unavailable";
  if (city) cityLabel = city;

  const date = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <>
      <LocationHeader city={cityLabel} date={date} />
      <WeatherOverview
        wind={12}
        humidity={65}
        weatherIcon="https://openweathermap.org/img/wn/10d@2x.png"
        description="light rain"
      />
      <TemperatureNow temperature={8.2} description="Light rain" />
      <ForecastList forecast={forecastMock} />
      <ChangeCityButton onclick={() => alert("Change city")} />
    </>
  );
}

export default App;
