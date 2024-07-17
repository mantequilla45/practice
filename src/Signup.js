import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from './firebase';

const Button = styled.button`
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

const Signup = ({ className }) => {
  const [show, setShow] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

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
  }, []);

  return (
    <>
      <Button onClick={handleShow}>Sign Up</Button>
      <Modal
        show={show}
        onHide={handleHide}
        backdrop="static"
        keyboard={false}
        centered
        scrollable
        className={className}
      >
        <Modal.Header closeButton style={{ borderBottom: 'none', display: 'flex', flexDirection: 'column-reverse' }}>
          <p className="modal-description">Cure your sickness today!</p>
          <Modal.Title>Create your account</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{padding: '0px 60px', overflowY: 'auto' }}>
            <p className="social-text">Sign up with</p>
            <SocialSignupOptions />
            <Divider />
          
          <SignupForm handleClose={handleClose}/>
          <LoginPrompt />
        </Modal.Body>
      </Modal>
    </>
  );
};

const SocialSignupOptions = () => {
  const socialOptions = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/03d894b07dcfd1cb03e468a3f61e659330e220a5c3b711c0c8ac7d0125d3c97f?apiKey=d22a939618da4e96809232126d1f951c&", alt: "Social Sign Up Option 1" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b13ae373b38e6c864bc633586a29f085659e6a73c8f4bb0742d5a64a2d0996f1?apiKey=d22a939618da4e96809232126d1f951c&", alt: "Social Sign Up Option 2" },
  ];

  return (
    <div className="social-signup-options">
        {socialOptions.map((option, index) => (
        <button key={index} className="social-signup-button">
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

const SignupForm = ({ handleClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();

    if (password.length < 6) {
      setError('Password must at least be six characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      if (signInMethods.length > 0) {
        setError('Username is already in use.');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Signup successful:', userCredential.user);
      // You can also save the username to the database here if needed
      handleClose();
    } catch (e) {
      console.error('Error during signup:', e);
      if (e.code === 'auth/email-already-in-use'){
        setError('Email is already in use.');
      }
      else {
        setError('Failed to sign up. Please try again.');
      }
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSignup}>
      <label htmlFor="username" className="visually-hidden">Username</label>
      <input type="text" id="username" className="signup-input" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <label htmlFor="email" className="visually-hidden">Email</label>
      <input type="email" id="email" className="signup-input" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <label htmlFor="password" className="visually-hidden">Password</label>
      <input type="password" id="password" className="signup-input" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <label htmlFor="confirm-password" className="visually-hidden">Confirm Password</label>
      <input type="password" id="confirm-password" className="signup-input" placeholder="reenter password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
      {error && <p className="error-text">{error}</p>}
      <button type="submit" className="signup-button">Sign Up</button>
    </form>
  );
};

const LoginPrompt = () => (
  <p className="login-prompt">
    Already have an account? <a href="#" className="login-link">Login.</a>
  </p>
);

export default Signup;
