// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import { useURLPosition } from "../hooks/useURLPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {

  const [lat, lng] = useURLPosition();
  const [isLoadingCoords, setIsLoadingCoords] = useState(false);

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");

  useEffect(function () {

    if(!lat && !lng) return;


    async function fetchCityData() {
      try {
        setIsLoadingCoords(true);
        setGeocodingError("");

        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if(!data.countryCode) throw new Error("That doesn't seem to be a city. Click somewhere else ;)")

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));

      } catch (err) {
        setGeocodingError(err.message)
      } finally {
        setIsLoadingCoords(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  if(isLoadingCoords) return <Spinner />;

  if(!lat && !lng) return <Message message="Start by clickling on the map" />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        {/* 
         <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
         */}
        <DatePicker />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button>Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
