import React from 'react';
import { Link } from 'react-router-dom';
import NavPage from '../Components/NavPage';

function Homepage() {
  return (
    <div>
      <NavPage />
      <h1>MemoMap</h1>
      
      <Link to="/app">Go to app</Link>
    </div>
  );
};

export default  Homepage;
