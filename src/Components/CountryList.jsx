import React from 'react';
import style from "./CountryList.module.css";
import Spinner from './Spinner';
import CountryItem from './CountryItem';
import Message from './Message';
import { useCities } from '../context/CitiesContext';

function CountryList() {
  const {cities, loading} = useCities();

  if( loading ) 
    return ( <Spinner /> );
  
  if(!cities.length)
    return ( <Message message="No cities added yet, please select one."/> );

  const countries = cities.reduce((arr, city) => { 
      if (!arr.map(el => el.city).includes(city.country)) 
        return [...arr, {country: city.country, emoji: city.emoji}]; 
      else return arr;
    
    }, []);

  return (
    <div className={style.countryList}>
      {countries.map((country) => <CountryItem countryData={country.data} key={country.country}/>)}
    </div>
  );
}

export default CountryList;