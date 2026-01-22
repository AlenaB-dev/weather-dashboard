import React from "react";

function TemperatureNow({ temperature, description }) {
  return (
    <section className="temperature-now">
      <p className="temperature-value">{Math.round(temperature)}°C</p>
      <p className="weather-description">{description}</p>
    </section>
  );
}

export default TemperatureNow;
