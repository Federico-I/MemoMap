import React from 'react';
import NavApp from './NavApp';
import Logo from './Logo';
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
        <Logo />
        <NavApp />

        <p>Cities</p>
        <footer className={styles.footer}>
            <p className={styles.copyright}>
                &copy; Copyright {new Date().getFullYear()} by you know who..
            </p>
        </footer>
    </div>
  )
};

export default  Sidebar;