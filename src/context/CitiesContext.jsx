import React, { useReducer } from "react"; 
import { createContext, useContext, useEffect } from "react";

const ORIGIN_URL = "http://localhost:9000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  laoding: false,
  currentCity: {},
  error: "",
};

function reducer( state, action ) {
  switch(action.type) {

    case "loading": 
      return {
        ...state,
        loading: true,
      }

    case "cities/loaded":
      return {
       ...state,
       loading: false,
       cities: action.payload, 
      };

    case "city/loaded": 
      return{
        ...state,
        loading: false,
        currentCity: action.payload,
      }

    case "city/created":
      return {
        ...state,
        loading: false,
        cities: [...state.cities, action.payload],
      };

    case "city/deleted":
      return {
        ...state,
        loading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };

    case "rejected":
      return{
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  };
}

function CitiesProvider({ children }) {
  const [{ cities, loading, currentCity }, dispatch] = useReducer( reducer, initialState);
  
  
   // const [cities, setCities] = useState[];
   // const [loading, setLoading] = useState(false);
   // const [currentCity, setCurrentCity] = useState({}); 


  useEffect(function() {
    async function fetchCitiesData() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${ORIGIN_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loading", payload:data });
      } catch (error) {
        dispatch({ type: "rejected", payload: "Error loading data..." })
      }
    };

    fetchCitiesData();
  }, []);

  async function getCity(id) {
    dispatch({ type: "loading" });

      try {
        const res = await fetch(`${ORIGIN_URL}/cities/${id}`);
        const data = await res.json();

        dispatch({ type: "city/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "rejeted", payload: "Error loading city..."});
      } 
  };

  async function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${ORIGIN_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      // update state with data from API
      dispatch({ type: "city/created", payload: data });
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch({ type: "rejeted", payload: "Error uploading data..."});
    } 
  };

  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${ORIGIN_URL}/cities/${id}`, {
        method: "DELETE",
      });
  
      // update state with data from API
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({ type: "rejeted", payload: "Error deleting data..."});
    } 
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