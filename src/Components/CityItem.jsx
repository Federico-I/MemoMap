import React from "react";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../context/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityItem({ cityData }) {

  const {currentCity, deleteCity} = useCities();
  const {cityName, emoji, date, id, position} = cityData;

  function handleDelete(e) {
    e.preventDefault();
    deleteCity(id);
  };

  return(
  <li>
    <Link className={`${styles.CityItem} ${id === currentCity.id ? styles["cityItem--active"] : ""}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.delete} onClick={handleDelete}>&time;</button>
    </Link>  
  </li>
  );
}

export default CityItem;