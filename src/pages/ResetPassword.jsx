import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import eyeIcon from '../asset/icons/eye.png'; // путь к вашей иконке

const ResetPassword = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleNewPassword = (e) => {
    e.preventDefault(); // предотвращаем возможные проблемы с формой
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPassword = (e) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };

  const isFormValid = () => {
    return (
      formData.newPassword.trim() !== '' &&
      formData.confirmPassword.trim() !== '' &&
      formData.newPassword === formData.confirmPassword
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      console.log('Пароль изменён');
      navigate('/login');
    }
  };

  return (
    <div className="auth-page">
      <div className="page-wrapper">
        <div className="image-side"></div>
        <div className="auth-container">
          <div className="form-main">
            <div className="form-header">
              <h2 className="form-title">Восстановите пароль</h2>
            </div>

            <form className="form-fields-container" onSubmit={handleSubmit}>
              <div className="inputs-group">
                <div className="fields-group">
                  {/* Поле Новый пароль с глазом */}
                  <div className="field-wrapper">
                    <label className="field-label">Новый пароль</label>
                    <div className="password-wrapper">
                      <input 
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className="field-input password-input" 
                        required
                      />
                      <button 
                        type="button"
                        className={`eye-button ${showNewPassword ? 'eye-button-active' : ''}`}
                        onClick={toggleNewPassword}
                        aria-label={showNewPassword ? "Скрыть пароль" : "Показать пароль"}
                      >
                        <img src={eyeIcon} alt="" className="eye-image" />
                      </button>
                    </div>
                  </div>

                  {/* Поле Подтвердите пароль с глазом */}
                  <div className="field-wrapper">
                    <label className="field-label">Подтвердите пароль</label>
                    <div className="password-wrapper">
                      <input 
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="field-input password-input" 
                        required
                      />
                      <button 
                        type="button"
                        className={`eye-button ${showConfirmPassword ? 'eye-button-active' : ''}`}
                        onClick={toggleConfirmPassword}
                        aria-label={showConfirmPassword ? "Скрыть пароль" : "Показать пароль"}
                      >
                        <img src={eyeIcon} alt="" className="eye-image" />
                      </button>
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
                  onClick={() => navigate('/welcome')}
                >
                  Сохранить изменения
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;