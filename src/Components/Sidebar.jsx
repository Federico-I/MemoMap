import React from 'react';
import NavApp from './NavApp';
import Logo from './Logo';
import styles from "./Sidebar.module.css";
import { Outlet } from 'react-router-dom';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
        <Logo />
        <NavApp />

        <Outlet />
        
        <footer className={styles.footer}>
            <p className={styles.copyright}>
                &copy; Copyright {new Date().getFullYear()} by you know who..
            </p>
        </footer>
    </div>
  )
};

export default  Sidebar;