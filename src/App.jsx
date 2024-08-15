import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { CitiesProvider } from './context/CitiesContext';
import { AuthProvider } from './context/FakeAuthContext';
import ProtectedRoute from './pages/ProtectedRoute';

// import Product from './pages/Product';
// import Pricing from './pages/Pricing';
// import Homepage from './pages/Homepage';
// import PageNotFound from './pages/PageNotFound';
// import AppLayout from './pages/AppLayout';
// import Login from './pages/Login';

import CityList from './Components/CityList';
import CountryList from './Components/CountryList';
import City from './Components/City';
import Form from './Components/Form';
import SpinnerFullPage from './Components/SpinnerFullPage';

const Homepage = lazy(() => import ("./pages/Homepage"));
const Product = lazy(() => import ("./pages/Product"));
const Pricing = lazy(() => import ("./pages/Pricing"));
const Login = lazy(() => import ("./pages/Login"));
const AppLayout = lazy(() => import ("./pages/AppLayout"));
const PageNotFound = lazy(() => import ("./pages/PageNotFound"));


function App() {

  return (
    <CitiesProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="/login" element={<Login />}/>
              <Route path='app' element={ 
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>} 
                >
                <Route index element={<Navigate replace to="cities"/>} />
                <Route path='cities' element={<CityList />} />
                <Route path="cities:id" element={<City />} />
                <Route path='countries' element={<CountryList />} />
                <Route path='form' element={<Form/>} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </CitiesProvider>
  )
};

export default App;
