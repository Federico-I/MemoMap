import React from 'react';
import style from "./CityList.module.css";
import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from './Message';
import { useCities } from '../context/CitiesContext';

function CityList() {
  const {cities, loading} = useCities();

  if(loading) 
    return (<Spinner />);
  
  if(!cities.length)
    return (< Message message="Please select a city to start your journey!" />);

  return (
    <ul className={style.cityList}>
      {cities.map((city) => (<CityItem cityData={city} key={city.id}/>))}
    </ul>
  );
}

export default CityList;