import "./App.css";
import LocationHeader from "./components/LocationHeader";
import WeatherOverview from "./components/WeatherOverview";
import TemperatureNow from "./components/TemperatureNow";
import ForecastList from "./components/ForecastList";
import ChangeCityButton from "./components/ChangeCityButton";

function App() {
  const forecastMock = [
    { day: "Tue", temp: 18, icon: "/sun.png" },
    { day: "Wend", temp: 16, icon: "/cloud.png" },
    { day: "Thur", temp: 19, icon: "/sun.png" },
  ];

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
      <ForecastList forecast={forecastMock} />
      <ChangeCityButton onclick={() => alert("Change city")} />
    </>
  );
}

export default App;
