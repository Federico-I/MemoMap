import React from 'react';
import NavApp from './NavApp';
import Logo from './Logo';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
        <Logo />
        <NavApp />

        <p>Cities</p>
        <footer>
            <p>
                &copy; Copyright
            </p>
        </footer>
    </div>
  )
};

export default  Sidebar;