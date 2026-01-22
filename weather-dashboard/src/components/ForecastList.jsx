import ForecastItem from "./ForecastItem";

function ForecastList({ forecast }) {
  return (
    <div>
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
