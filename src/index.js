import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Главная страница (твой лендинг)
import App from './App';

// Страницы авторизации
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPasswordEmail from './pages/ForgotPasswordEmail';
import ForgotPasswordEmailCode from './pages/ForgotPasswordEmailCode';
import ForgotPasswordPhone from './pages/ForgotPasswordPhone';
import ForgotPasswordPhoneCode from './pages/ForgotPasswordPhoneCode';
import ResetPassword from './pages/ResetPassword';
import LoadScreen from './pages/LoadScreen';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Главная страница */}
        <Route path="/" element={<App />} />

        {/* Вход и Регистрация */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Восстановление через Email */}
        <Route path="/forgotPasswordEmail" element={<ForgotPasswordEmail />} />
        <Route path="/forgotPasswordEmailCode" element={<ForgotPasswordEmailCode />} />

        {/* Восстановление через Телефон */}
        <Route path="/forgotPasswordPhone" element={<ForgotPasswordPhone />} />
        <Route path="/forgotPasswordPhoneCode" element={<ForgotPasswordPhoneCode />} />

        {/* Финальный сброс пароля и выбор способа */}
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/welcome" element={<LoadScreen />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);