import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import eyeIcon from '../asset/icons/eye.png'; // путь к вашей иконке

const Login = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const isFormValid = () => formData.login.trim() !== '' && formData.password.trim() !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      console.log('Вход:', formData);
      navigate('/welcome');
    }
  };

  return (
    <div className="auth-page">
      <div className="page-wrapper">
        <div className="image-side"></div>
        <div className="auth-container">
          <div className="form-main">
            <div className="form-header">
              <h2 className="form-title">Вход в аккаунт</h2>
            </div>

            <form className="form-fields-container" onSubmit={handleSubmit}>
              <div className="inputs-group">
                <div className="fields-group">
                  {/* Поле Логин */}
                  <div className="field-wrapper">
                    <label className="field-label">Логин</label>
                    <input 
                      type="text" 
                      name="login"
                      value={formData.login}
                      onChange={handleInputChange}
                      className="field-input" 
                      required
                    />
                  </div>

                  {/* Поле Пароль с глазом */}
                  <div className="field-wrapper">
                    <label className="field-label">Пароль</label>
                    <div className="password-wrapper">
                      <input 
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="field-input password-input" 
                        required
                      />
                      <button 
                        type="button"
                        className={`eye-button ${showPassword ? 'eye-button-active' : ''}`}
                        onClick={togglePassword}
                        aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                      >
                        <img src={eyeIcon} alt="" className="eye-image" />
                      </button>
                    </div>
                    <div className="link-wrapper">
                      <span className="link" onClick={() => navigate('/forgotPasswordEmail')}>
                        Забыли пароль?
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="button-group">
                <button 
                  type="submit"
                  className="register-btn"
                  disabled={!isFormValid()}
                  style={{
                    opacity: !isFormValid() ? 0.5 : 1,
                    cursor: !isFormValid() ? 'not-allowed' : 'pointer'
                  }}
                >
                  Войти
                </button>
              </div>
            </form>

            <div className="form-footer">
              <div className="divider-row">
                <div className="divider-line"></div>
                <p className="divider-text">или</p>
                <div className="divider-line"></div>
              </div>
              <div className="login-link-row">
                Нет аккаунта? 
                <span className="login-link" onClick={() => navigate('/register')}>
                  Зарегистрироваться
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;