import overviewStyle from "./WeatherOverview.module.css";
import styles from "./Glass.module.css";

function WeatherOverview({ weather, isLoading, error }) {
  if (isLoading) return <p>Loading weather...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!weather) return null;

  const { main, weather: details, wind } = weather;
  const iconUrl = `http://openweathermap.org/img/wn/${details[0].icon}@2x.png`;

  return (
    <section className={`${overviewStyle.weatherOverview} ${styles.glass}`}>
      <div className={overviewStyle.weatherIcon}>
        <img src={iconUrl} alt={details[0].description} />
      </div>
      <div className={overviewStyle.weatherDetails}>
        <p>Wind: {wind.speed}m/s</p>
        <p>Humidity {main.humidity}%</p>
      </div>
    </section>
  );
}

export default WeatherOverview;
