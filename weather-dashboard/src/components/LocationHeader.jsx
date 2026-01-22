import headerStyle from "./LocationHeader.module.css";
import styles from "./Glass.module.css";

function LocationHeader({ city, date }) {
  return (
    <header className={`${headerStyle.locationHeader} ${styles.glass}`}>
      <h1 className={headerStyle.city}>{city}</h1>
      <p className={headerStyle.date}>{date}</p>
    </header>
  );
}

export default LocationHeader;
