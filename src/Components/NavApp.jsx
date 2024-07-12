import React from 'react';
import styles from "./NavApp.module.css";
import { NavLink } from 'react-router-dom';

function NavApp() {
  return (
    <div className={styles.nav}>
        <ul>
          <li>
            <NavLink to="cities">Cities</NavLink>
          </li>
          <li>
            <NavLink to="countries">Countries</NavLink>
          </li>
        </ul>
    </div>
  )
}

export default NavApp;
