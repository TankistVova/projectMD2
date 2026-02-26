import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const ForgotPasswordPhone = () => {
  const navigate = useNavigate();
  
  // Состояние для поля телефона
  const [phone, setPhone] = useState('');

  // Простейшая проверка: номер не пустой и начинается с +
  const isFormValid = () => {
    return phone.trim() !== '' && phone.startsWith('+');
  };

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      navigate('/forgotPasswordPhoneCode');
    }
  };

  return (
    <div className="auth-page">
      <div className="page-wrapper">
        <div className="image-side"></div>
        <div className="auth-container">
          <div className="form-main">
            {/* Верхний блок с заголовком */}
            <div className="form-header">
              <h2 className="form-title">Забыли пароль?</h2>
              <p className="form-subtitle">Введите ваш номер телефона для восстановления доступа.</p>
            </div>

            {/* Форма */}
            <form className="form-fields-container" onSubmit={handleSubmit}>
              {/* Группа полей */}
              <div className="inputs-group">
                <div className="fields-group">
                  {/* Поле телефона */}
                  <div className="field-wrapper">
                    <label className="field-label">Номер телефона</label>
                    <input 
                      type="tel" 
                      className="field-input" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Кнопка */}
              <div className="button-group">
                <button 
                  type="submit"
                  className="register-btn"
                  disabled={!isFormValid()}
                  style={{
                    opacity: !isFormValid() ? 0.5 : 1,
                    cursor: !isFormValid() ? 'not-allowed' : 'pointer'
                  }}
                  onClick={() => navigate('/forgotPasswordPhoneCode')}
                >
                  Сбросить пароль
                </button>
              </div>
            </form>

            {/* Нижняя часть (другой способ) */}
            <div className="form-footer">
              <div className="login-link-row" style={{ marginTop: -8, fontWeight: '600', color: '#69C3BF' }}>
                <span className="login-link" onClick={() => navigate('/forgotPasswordEmail')}>
                  Другой способ
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPhone;