'use client'
import React, { useCallback, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loaders from './Loaders';
import { LOGIN, MYCOURSES } from '@/utils/page-urls';

export const Navbar = () => {
  const [user, isLoading] = useAuthState(auth);
  const [isActive, setIsActive] = useState(false);
  const navbarRef = useRef(null);

  const handlesignOut = useCallback(() => { signOut(auth); }, []);

  const handleBurgerClick = () => {
    setIsActive(prevState => !prevState);
  };

  // Menü dışı tıklamaları kontrol etme
  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (isLoading) { 
    return <Loaders/>; 
  }

  return (
    <section className="hero has-background-primary-25">
      <style jsx>{`
        .navbar-item.has-dropdown.is-hoverable .navbar-dropdown {
          left: auto;
          right: 0;
        }

        .navbar-item.has-dropdown.is-hoverable .navbar-dropdown .navbar-item {
          white-space: normal;
          word-wrap: break-word;
          overflow-wrap: break-word;
          width: 200px;
        }

        .navbar-item.has-dropdown.is-hoverable .navbar-dropdown .navbar-item p {
          margin-bottom: 0;
        }
      `}</style>
      <nav className="navbar is-primary" role="navigation" aria-label="main navigation" ref={navbarRef}>
        <div className="navbar-brand">
          {/* <Link className="navbar-item" href="/">
            Home
          </Link> */}

          <button
            className={`navbar-burger ${isActive ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded={isActive}
            onClick={handleBurgerClick}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div id="navbarBasicExample" className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <Link className="navbar-item" href={MYCOURSES} onClick={() => setIsActive(false)}>Anasayfa</Link>
            <a className="navbar-item" href="/add-course" onClick={() => setIsActive(false)}>Kurs Ekle</a>
            <Link className="navbar-item" href="/courses" onClick={() => setIsActive(false)}>Kurslarım</Link>
            <div className="navbar-item has-dropdown is-hoverable">
              {/* <p className="navbar-link" onClick={() => setIsActive(false)}>Daha Fazlası</p> */}
              <div className="navbar-dropdown">
                <Link className='navbar-item' href="/about" onClick={() => setIsActive(false)}>Yorumlar</Link>
                <Link className="navbar-item" href="/teachers" onClick={() => setIsActive(false)}>Eğitmenler</Link>
                <Link className="navbar-item" href="/contact" onClick={() => setIsActive(false)}>İletişim</Link>
                <hr className="navbar-divider" />
                <Link className="navbar-item" href="/requestandcomplaint" onClick={() => setIsActive(false)}>İstek Ve Şikayet</Link>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              {
                !user ? <Link className='navbar-link' href={LOGIN}>Login</Link> : <div className="buthrefns">
                <div className="navbar-item has-dropdown is-hoverable">
                <p className="navbar-link" onClick={() => setIsActive(false)}>Profile</p>
                  <div className="navbar-dropdown">
                    <p className="navbar-item">{user?.displayName}</p>
                    <p className="navbar-item">{user?.email}</p>
                    <p className='navbar-item'>
                      <button className="button is-danger" onClick={handlesignOut}>Çıkış yap</button>
                    </p>
                  </div>
                </div>
              </div>
              }
              
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
};