import React from 'react';
import style from "CityList.module.css";
import Spinner from './Spinner';
import City from './City';

function CityList({ cities, loading }) {

  if(loading) 
    return (<Spinner />);

  return (
    <div className={style.CityList}>
      {cities.map((city) => <City cityData={city}/>)}
    </div>
  );
}

export default CityList;