import React from "react";

function TemperatureNow({ temperature, description }) {
  return (
    <section className="temperature-now">
      <h2 className="temperature-value">{Math.round(temperature)}°C</h2>
      <span className="weather-description">{description}</span>
    </section>
  );
}

export default TemperatureNow;
