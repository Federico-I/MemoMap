import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from "./NavPage.modules.css";

function NavPage() {
  return (
    <nav className={styles.nav}>
        <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/pricing">Pricing</NavLink>
            </li>
            <li>
              <NavLink to="/product">Product</NavLink>
            </li>
        </ul>
    </nav>
  );
};

export default NavPage;