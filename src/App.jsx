import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';
import CityList from './Components/CityList';

const ORIGIN_URL = "http://localhost:9000";


function App() {

  const [cities, setCities] = useState({});
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
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />}/>
        <Route path='app' element={<AppLayout />} >
          <Route index element={<CityList />} />
          <Route path='cities' element={<CityList cities={cities} isloading={loading}/>} />
          <Route path='countries' element={<p>Countries</p>} />
          <Route path='form' element={<p>Form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
