import React from "react";

function WeatherOverview({ wind, humidity, weatherIcon, description }) {
  return (
    <section classname="weather-overview">
      <div className="weather-icon">
        {" "}
        <img src={weatherIcon} alt={description} />
      </div>
      <div className="weather-details">
        <p>Wind: {wind}km/h</p>
        <p>Humidity {humidity}%</p>
      </div>
    </section>
  );
}

export default WeatherOverview;
