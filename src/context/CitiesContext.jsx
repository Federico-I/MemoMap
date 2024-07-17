import { createContext, useState, useEffect, useContext } from "react";

const ORIGIN_URL = "http://localhost:9000";

const CitiesContext = createContext(); 

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(function() {
    async function fetchCitiesData() {
      try {
        setLoading(true);
        const res = await fetch(`${ORIGIN_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        alert("Error loading data...")
      } finally {
        setLoading(false)
      }
    };

    fetchCitiesData();
  }, []);

  return (
    <CitiesContext.Provider value={{cities, loading}}>
      {children}
    </CitiesContext.Provider>
  )
};

function useCities() {
  const context = useContext(CitiesContext);
  if(context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return(context);
};

export {CitiesProvider, useCities}