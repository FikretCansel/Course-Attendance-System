'use client'
import React from "react";
import { useState, useCallback } from "react";
import { auth } from "../Firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
export const RegisterComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!email || !password) {
        return;
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then((auth) => {
          updateProfile(auth.user, { displayName: name });
        })
        .catch((e) => {
          console.log("kayıt olunamadı ", e);
        });
    },
    [name, email, password]
  );

  return (
    <div>
      <form onSubmit={handleSubmit} className="signup">
        <div className="container">
          <div className="field mt-6	">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input"
                id="1"
                type="name"
                placeholder="isim"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
              </span>
            </p>
          </div>

          <div className="field 	">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input"
                id="1"
                type="email"
                placeholder="E-posta"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />

              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
              </span>
            </p>
          </div>

          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                id="2"
                type="password"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>

          <div className="field">
            <p className="control">
              <button className="button is-success">Kayıt Ol</button>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
