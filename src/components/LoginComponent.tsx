"use client";
import React, { useState, useCallback } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!email || !password) {
        return;
      }

      signInWithEmailAndPassword(auth, email, password).then(()=>{
        router.push('/courses')
      }).catch((e) => {
        console.log(e);
      });
    },
    [email, password]
  );

  return (
    <div>
      <div className="container">
        <div className="field mt-6	">
          <p className="control has-icons-left has-icons-right">
            <input
              className="input"
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
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <span className="icon is-small is-left ">
              <i className="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button onClick={handleSubmit} className="button is-success">
              Giriş Yap
            </button>
          </p>
          <p>
            Şifreni mi unuttun?{" "}
            <Link href="/forgotpassword"> Şifreyi değiştir</Link>
          </p>
          <p>
            henüz hesabın yokmu? <Link href="/register"> Kayıt ol</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
