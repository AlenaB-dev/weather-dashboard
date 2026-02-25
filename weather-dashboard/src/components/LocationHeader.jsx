import headerStyle from "./LocationHeader.module.css";
import styles from "./Glass.module.css";

function LocationHeader({ city, date }) {
  const [mainCity, subCity] = city.split(/,(.+)/);

  return (
    <header className={`${headerStyle.locationHeader} ${styles.glass}`}>
      <h1 className={headerStyle.city}>
        {mainCity}
        {subCity && <span className={headerStyle.citySub}>{subCity}</span>}
      </h1>
      <p className={headerStyle.date}>{date}</p>
    </header>
  );
}

export default LocationHeader;
