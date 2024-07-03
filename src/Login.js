import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Buttonn = styled.button`
  font-family: Rubik, sans-serif;
  font-size: 15px;
  color: #000;
  font-weight: bold;
  background-color: #fff;
  border: 1px solid rgba(137, 137, 137, 1);
  border-radius: 50px;
  padding: 15px 30px;
  cursor: pointer;
  @media (max-width: 991px) {
    padding: 15px 20px;
  }
`;

const Login = ({ className }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
    document.body.style.overflowY = 'auto';
  };

  const handleHide = () => {
    setShow(false);
    document.body.style.overflowY = 'hidden'; 
  };

  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.keyCode === 27) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [handleClose]);

  return (
    <>
      <Buttonn onClick={handleShow}>Log in</Buttonn>
      <Modal
        show={show}
        onHide={handleHide}
        backdrop="static"
        keyboard={false}
        centered
        scrollable
        className={className}
      >
        <Modal.Header closeButton style={{ display: 'flex', flexDirection: 'column-reverse' }}>
          <Modal.Title>Log in with</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SocialLoginOptions />
          <Divider />
          <LoginForm />
          <SignupPrompt />
        </Modal.Body>
      </Modal>
    </>
  );
};

const SocialLoginOptions = () => {
  const socialOptions = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/93acce7c007ce7b98cb4a5b8d1e1625bb33c91bc26117f850de213e6e46d258b?apiKey=d22a939618da4e96809232126d1f951c&", alt: "Social Login Option 1" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e239ff8292f58f9257cb678422e0cc58bf9166003ba475d96e3ce355b1ddab70?apiKey=d22a939618da4e96809232126d1f951c&", alt: "Social Login Option 2" },
  ];

  return (
    <div className="social-login-options">
      {socialOptions.map((option, index) => (
        <button key={index} className="social-login-button">
          <img loading="lazy" src={option.src} alt={option.alt} />
        </button>
      ))}
    </div>
  );
};
  
const Divider = () => (
  <div className="divider">
    <span className="divider-line"></span>
    <span className="divider-text">or</span>
    <span className="divider-line"></span>
  </div>
);

const LoginForm = () => (
  <form className="login-form">
    <label htmlFor="username" className="visually-hidden">Username</label>
    <input type="text" id="username" className="login-input" placeholder="username" />
    <label htmlFor="password" className="visually-hidden">Password</label>
    <input type="password" id="password" className="login-input" placeholder="password" />
    <button type="submit" className="login-button">Login</button>
  </form>
);

const SignupPrompt = () => (
  <p className="signup-prompt">
    Not a member yet? <a href="#" className="signup-link">Sign up.</a>
  </p>
);

const StyledLoginPage = styled(Login)`
  .modal-content {
    border-radius: 10px;
    background-color: #fff;
    max-width: 400px;
    width: 100%;
    padding: 25px 30px 30px; /* Adjust padding as needed */
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;

    @media (max-width: 991px) {
      padding: 25px 20px 30px;
    }
  }

  .modal-header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

  }

  .modal-title {
    color: #4b4b4b;
    margin-top: -20px;
    font: 400 25px Rubik, sans-serif;
    align-self: flex-start;
    margin-top: -7.6%;
  }

  .social-login-options {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 30px;
    margin-top: 30px;

    @media (max-width: 991px) {
      flex-direction: column;
      align-items: center;
    }
  }

  .social-login-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0 10%;
  }

  .social-login-button img {
    width: 60px;
    height: 60px;
  }

  .divider {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 36px;
  }

  .divider-line {
    flex-grow: 1;
    height: 1px;
    background-color: #4f4f4f;
  }

  .divider-text {
    padding: 0 20px;
    color: #575555;
    font: 400 18px Rubik, sans-serif;
  }

  .login-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 22px;
    margin-bottom: 36px;
  }

  .login-input {
    font: 400 18px Rubik, sans-serif;
    color: #6b6b6b;
    background-color: #efefef;
    border: none;
    border-radius: 10px;
    padding: 14px 20px;
    width: 100%;
  }

  .login-button {
    background-color: #1877f2;
    color: #fff;
    font: 400 18px Rubik, sans-serif;
    border: none;
    border-radius: 10px;
    padding: 18px 60px;
    cursor: pointer;
    align-self: center;
  }

  .signup-prompt {
    font: 400 18px Rubik, sans-serif;
    color: #575555;
    text-align: center;
  }

  .signup-link {
    color: #005ae0;
    text-decoration: none;
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

export default StyledLoginPage;