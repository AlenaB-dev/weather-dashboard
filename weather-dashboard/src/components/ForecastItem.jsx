import itemStyle from "./ForecastItem.module.css";

function ForecastItem({ day, temp, icon }) {
  return (
    <section className={itemStyle.item}>
      <p>{day}</p>
      <h3>{temp}</h3>
      <img src={icon} alt={day} width={50} height={50} />
    </section>
  );
}

export default ForecastItem;
