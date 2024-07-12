import React from 'react';
import style from "CityList.module.css";
import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from './Message';

function CityList({ cities, loading }) {

  if(loading) 
    return (<Spinner />);
  
  if(!cities.length)
    return (<Message message="No cities added yet, please select one."/>);

  return (
    <div className={style.CityList}>
      {cities.map((city) => <CityItem cityData={city.data} key={city.id}/>)}
    </div>
  );
}

export default CityList;