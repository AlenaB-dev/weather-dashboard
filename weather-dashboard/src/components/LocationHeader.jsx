import headerStyle from "./LocationHeader.module.css";

function LocationHeader({ city, date }) {
  return (
    <header className={headerStyle.locationHeader}>
      <h1 className={headerStyle.city}>{city}</h1>
      <p className={headerStyle.date}>{date}</p>
    </header>
  );
}

export default LocationHeader;
