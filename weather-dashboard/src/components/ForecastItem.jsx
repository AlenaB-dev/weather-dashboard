function ForecastItem({ day, temp, icon }) {
  return (
    <section className="forecast-item">
      <p>{day}</p>
      <h3>{temp}</h3>
      <img src={icon} alt="Weather icon" />
    </section>
  );
}

export default ForecastItem;
