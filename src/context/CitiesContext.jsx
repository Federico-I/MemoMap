import React, { useReducer } from "react"; 
import { createContext, useContext, useState, useEffect } from "react";

const ORIGIN_URL = "http://localhost:9000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  laoding: false,
  currentCity: {},
}

function reducer( state, action ) {
  switch(action.type) {

    case "loading": 
      return {
        ...state,
        loading: false,
      }

    case "cities/loaded":
      return {
       ...state,
       loading: false,
       cities: action.payload, 
      };

    case "cities/created":

    case "cities/deleted":

    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, loading, currentCity }, dispatch] = useReducer( reducer, initialState);

  {/*
    const [cities, setCities] = useState[];
    const [loading, setLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});  
  */}


  useEffect(function() {
    async function fetchCitiesData() {
      dispatch({ type: "loading" });

      try {
        
        const res = await fetch(`${ORIGIN_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loading", payload:data });
      } catch (error) {
        alert("Error loading data...")
      } finally {
        setLoading(false)
      }
    };

    fetchCitiesData();
  }, []);

  async function getCity(id) {
      try {
        setLoading(true);
        const res = await fetch(`${ORIGIN_URL}/cities/${id}`);
        const data = await res.json();
        setCurrentCity(data);
      } catch (error) {
        alert("Error loading data...")
      } finally {
        setLoading(false)
      }
  };

  async function createCity(newCity) {
    try {
      setLoading(true);
      const res = await fetch(`${ORIGIN_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      // update state with data from API
      setCities((cities) => [...cities, data]);
      setCurrentCity(data);
    } catch (error) {
      alert("Error uploading data...")
    } finally {
      setLoading(false)
    }
  };

  async function deleteCity(id) {
    try {
      setLoading(true);
      await fetch(`${ORIGIN_URL}/cities/${id}`, {
        method: "DELETE",
      });
  
      // update state with data from API
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      alert("Error deleting data...")
    } finally {
      setLoading(false)
    };
  };

  return (
    <CitiesContext.Provider value={{cities, loading, currentCity, getCity, createCity, deleteCity}}>
      {children}
    </CitiesContext.Provider>
  )
};

function useCities() {
  const context = useContext(CitiesContext);
  if(context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
};

export { CitiesProvider, useCities };