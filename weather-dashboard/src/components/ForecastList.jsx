import ForecastItem from "./ForecastItem";
import listStyle from "./ForecastList.module.css";
import styles from "./Glass.module.css";

function ForecastList({ forecast }) {
  return (
    <div className={`${listStyle.list} ${styles.glass}`}>
      {forecast.map((item) => (
        <ForecastItem
          key={item.day}
          day={item.day}
          temp={item.temp}
          icon={item.icon}
        />
      ))}
    </div>
  );
}

export default ForecastList;
