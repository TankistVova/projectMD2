import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../asset/logo.svg'; // Убедись, что путь к логотипу верный
import './Auth.css';

const LoadScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Имитация загрузки: через 3 секунды перекидываем пользователя в личный кабинет
    const timer = setTimeout(() => {
      navigate('/dashboard'); // Или любой другой путь твоего основного приложения
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="load-screen">
      <div className="load-content">
        <h1 className="welcome-text">Добро пожаловать!</h1>
        <h2 className="user-name">Чушкина Марина</h2>
        
        <div className="logo-wrapper">
          <img src={logo} alt="Цифровая Аптечка" className="load-logo" />
          <div className="logo-text">
            <span>ЦИФРОВАЯ</span>
            <span className="bold-text">АПТЕЧКА</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadScreen;