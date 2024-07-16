import React from "react";
import styles from "./CountryItem.module.css";

function CountryItem({ countryData }) {
  return (
    <li className={styles.countryItem}>
      <span>{countryData.emoji}</span>
      <span>{countryData.country}</span>
    </li>
  );
}

export default CountryItem;
