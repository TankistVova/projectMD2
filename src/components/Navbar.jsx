import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../asset/logo.svg';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <img 
            src={logo} 
            alt="Цифровая Аптечка" 
            onClick={() => navigate('/')} 
            style={{ cursor: 'pointer' }} 
          />
        </div>
        
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <ul className={`menu ${menuOpen ? 'active' : ''}`}>
          <li><a href="/">Главная</a></li>
          <li><a href="/about">Коротко о нас</a></li>
          <li><a href="/pharmacy">Аптечки</a></li>
          <li><a href="/service">Сервис</a></li>
        </ul>

        <div className="navbar-right">
          <button className="login-button" onClick={() => navigate('/login')}>
            Войти
          </button>
          <button className="register-button" onClick={() => navigate('/register')}>
            Зарегистрироваться
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;