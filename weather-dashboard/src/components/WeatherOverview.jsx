import overviewStyle from "./WeatherOverview.module.css";

function WeatherOverview({ wind, humidity, weatherIcon, description }) {
  return (
    <section className={overviewStyle.weatherOverview}>
      <div className={overviewStyle.weatherIcon}>
        {" "}
        <img src={weatherIcon} alt={description} />
      </div>
      <div className={overviewStyle.weatherDetails}>
        <p>Wind: {wind}km/h</p>
        <p>Humidity {humidity}%</p>
      </div>
    </section>
  );
}

export default WeatherOverview;
