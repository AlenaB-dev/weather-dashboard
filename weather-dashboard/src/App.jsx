import "./App.css";
import LocationHeader from "./components/LocationHeader";
import WeatherOverview from "./components/WeatherOverview";
import TemperatureNow from "./components/TemperatureNow";

function App() {
  return (
    <>
      <LocationHeader city="London" date="Monday, 22 January" />
      <WeatherOverview>Weather</WeatherOverview>
      <TemperatureNow> now is 22 degree</TemperatureNow>
    </>
  );
}

export default App;
