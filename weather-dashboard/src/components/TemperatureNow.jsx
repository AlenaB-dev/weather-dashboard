import styles from "./Glass.module.css";
import tempStyle from "./TemperatureNow.module.css";

function TemperatureNow({ temperature, description }) {
  return (
    <section className={`${tempStyle.temperatureNow} ${styles.glass}`}>
      <h2 className={tempStyle.temperatureValue}>
        {Math.round(temperature)}°C
      </h2>
      <span className={tempStyle.weatherDescription}>{description}</span>
    </section>
  );
}

export default TemperatureNow;
