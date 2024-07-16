import React from "react";
import styles from "Module.module.css"

function Button ({ children, oncClick, type }) {
    return(
        <button className={`${styles.btn} ${styles[type]}`} onClick={oncClick}>{children}</button>
    )
};

export default Button;