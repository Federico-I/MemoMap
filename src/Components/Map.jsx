import React, { useEffect, useState } from 'react';
import styles from "./Map.module.css";
import { useNavigate } from 'react-router-dom';
import { MapContainer, useMap, useMapEvent } from 'react-leaflet';
import { Marker, Popup, TileLayer } from 'leaflet';
import { useCities } from '../context/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button';
import { useURLPosition } from '../hooks/useURLPosition';

function Map() {

  const { cities } =useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {isLoading: isLoadingCoords, position: geolocationCoords, getPosition} = useGeolocation();
  const [mapLat, mapLng] = useURLPosition();


  useEffect(
    function() {
      if(mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect( function() {
    if(geolocationCoords) setMapPosition([geolocationCoords.lat, geolocationCoords.lng]);
  }, [geolocationCoords]);

  return (
    <div className={styles.mapContainer} >
      {!geolocationCoords && (<Button type="position" oncClick={getPosition}>{isLoadingCoords ? "Loadings..." : "use coords of your position"}</Button>)}
      <MapContainer center={[mapLat, mapLng]} zoom={8} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        { cities.map((city) => (
          <Marker position={[city.position.lat, city.position.lng]} key={city.id}  >
            <Popup>
             <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <CenterView position={mapPosition} />
        <ClickAction />
      </MapContainer>
    </div>
  )
};

function CenterView({ position }) {
  const map = useMap();
  map.setView(position);
  return(null);
};

function ClickAction() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
};

export default Map;