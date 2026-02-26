import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const ForgotPasswordPhoneCode = () => {
  const navigate = useNavigate();
  const inputs = useRef([]);
  const wrapperRef = useRef(null);
  const labelRef = useRef(null);

  const [code, setCode] = useState(['', '', '', '', '']);
  const [containerWidth, setContainerWidth] = useState(0);
  const [labelLeftPadding, setLabelLeftPadding] = useState(0);
  
  // Таймер
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Измеряем ширину контейнера при монтировании и ресайзе
  useEffect(() => {
    const updateWidth = () => {
      if (wrapperRef.current) {
        setContainerWidth(wrapperRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Обновляем отступ метки при изменении ширины
  useEffect(() => {
    if (wrapperRef.current) {
      const SQUARE_SIZE = 50;
      const MAX_GAP = 30;
      const totalSquaresWidth = 5 * SQUARE_SIZE; // 250px
      const wrapperWidth = wrapperRef.current.offsetWidth;

      if (wrapperWidth > totalSquaresWidth + 4 * MAX_GAP) {
        // Режим центрирования с фиксированным gap = 30px
        const contentWidth = totalSquaresWidth + 4 * MAX_GAP; // 250 + 120 = 370px
        const padding = (wrapperWidth - contentWidth) / 2;
        setLabelLeftPadding(padding);
      } else {
        setLabelLeftPadding(0);
      }
    }
  }, [containerWidth]);

  // Таймер обратного отсчёта
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResend = () => {
    setTimer(60);
    setCanResend(false);
    // Здесь можно добавить логику повторной отправки СМС
    console.log('СМС отправлен повторно');
  };

  // Склонение слова "секунда"
  const getSecondsWord = (count) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return 'секунд';
    if (lastDigit === 1) return 'секунда';
    if (lastDigit >= 2 && lastDigit <= 4) return 'секунды';
    return 'секунд';
  };

  // Определяем стили для контейнера квадратов
  const getWrapperStyles = () => {
    const SQUARE_SIZE = 50;
    const MAX_GAP = 30;
    const totalSquaresWidth = 5 * SQUARE_SIZE; // 250px

    if (containerWidth < totalSquaresWidth) {
      return {
        display: 'flex',
        gap: '8px',
        justifyContent: 'flex-start',
        overflowX: 'auto',
        paddingBottom: '4px',
      };
    }

    if (containerWidth <= totalSquaresWidth + 4 * MAX_GAP) {
      // Режим растяжения до краёв
      return {
        display: 'flex',
        justifyContent: 'space-between',
        gap: 0,
      };
    } else {
      // Режим центрирования с фиксированным gap
      return {
        display: 'flex',
        justifyContent: 'center',
        gap: `${MAX_GAP}px`,
      };
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value.length === 1 && index < 4) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && code[index] === '') {
      inputs.current[index - 1].focus();
    }
  };

  const isFormValid = () => code.every(digit => digit !== '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      navigate('/reset-password');
    }
  };

  return (
    <div className="auth-page">
      <div className="page-wrapper">
        <div className="image-side"></div>
        <div className="auth-container">
          <div className="form-main">
            <div className="form-header">
              <h2 className="form-title">Введите код подтверждения</h2>
              <p className="form-subtitle">
                Мы отправили вам по СМС код подтверждения. Введите его ниже, чтобы изменить пароль.
              </p>
            </div>

            <form className="form-fields-container" onSubmit={handleSubmit}>
              <div className="inputs-group">
                <div className="fields-group">
                  <div className="field-wrapper">
                    <label
                      className="field-label"
                      ref={labelRef}
                      style={{ paddingLeft: labelLeftPadding,  marginBottom: -10}}
                    >
                      Код
                    </label>
                    <div
                      className="code-inputs-wrapper"
                      ref={wrapperRef}
                      style={getWrapperStyles()}
                    >
                      {[0, 1, 2, 3, 4].map((i) => (
                        <input
                          key={i}
                          ref={(el) => (inputs.current[i] = el)}
                          type="text"
                          maxLength="1"
                          className="code-input"
                          value={code[i]}
                          onChange={(e) => handleChange(e, i)}
                          onKeyDown={(e) => handleKeyDown(e, i)}
                          required
                        />
                      ))}
                    </div>

                    {/* Таймер / ссылка повторной отправки */}
                    <div className="timer-wrapper">
                      {!canResend ? (
                        <span className="timer-text">
                          Отправить код повторно через{' '}
                          <span className="timer-highlight">{timer}</span>{' '}
                          {getSecondsWord(timer)}
                        </span>
                      ) : (
                        <span
                          className="resend-link"
                          onClick={handleResend}
                        >
                          Отправить повторно
                        </span>
                      )}
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
                    cursor: !isFormValid() ? 'not-allowed' : 'pointer',
                  }}
                  onClick={() => navigate('/resetPassword')}
                >
                  Подтвердить
                </button>
              </div>
            </form>

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

export default ForgotPasswordPhoneCode;