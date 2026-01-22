import React from "react";

function LocationHeader({ city, date }) {
  return (
    <header className="location-header">
      <h1 className="city">{city}</h1>
      <p className="date">{date}</p>
    </header>
  );
}

export default LocationHeader;
