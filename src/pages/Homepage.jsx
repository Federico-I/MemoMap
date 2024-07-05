import React from 'react';
import { Link } from 'react-router-dom';
import NavPage from '../Components/NavPage';
import NavApp from '../Components/NavApp';

function Homepage() {
  return (
    <div>
      <NavPage />
      <NavApp />
      <h1 className='testing'>MemoMap</h1>

      <Link to="/app">Go to app</Link>
    </div>
  );
};

export default  Homepage;
