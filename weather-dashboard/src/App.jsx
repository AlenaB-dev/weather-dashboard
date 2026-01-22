import "./App.css";
import LocationHeader from "./components/LocationHeader";
import WeatherOverview from "./components/WeatherOverview";
import TemperatureNow from "./components/TemperatureNow";

function App() {
  return (
    <>
      <LocationHeader city="London" date="Monday, 22 January" />
      <WeatherOverview
        wind={12}
        humidity={65}
        weatherIcon="https://openweathermap.org/img/wn/10d@2x.png"
        description="light rain"
      />
      <TemperatureNow temperature={8.2} description="Light rain" />
    </>
  );
}

export default App;
