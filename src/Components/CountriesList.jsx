import React from 'react';
import style from "CountryList.module.css";
import Spinner from './Spinner';
import CountryItem from './CountryItem';
import Message from './Message';

function CountryList({ cities, loading }) {

  if(loading) 
    return (<Spinner />);
  
  if(!cities.length)
    return (<Message message="No cities added yet, please select one."/>);

  const countries = [];

  return (
    <div className={style.countryList}>
      {countries.map((country) => <CountryItem cityData={country.data} />)}
    </div>
  );
}

export default CountryList;