import React from "react";
import { useState } from "react";
import styles from "./Login.module.css";
import NavPage from "../Components/NavPage";
import { useAuth } from "../context/FakeAuthContext";
import Button from "../Components/Button";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { logIn, logOut } = useAuth();

  function handleSubmit(e){
    e.preventDefault();

    if (email && password) logIn();
  }

  return (
    <main className={styles.login}>
      <NavPage />
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
