import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
const Login = () => {
  const [show, setShow] = useState(false); // Modal visibility state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  }); // State for form data

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Implement login logic here
    // - Validate form data (e.g., email format, password strength)
    // - Send login request to your backend API
    // - Handle successful login (redirect, update user state)
    // - Handle failed login (display error messages)

    console.log('Login form submitted:', formData); // Placeholder for now
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Log In
      </Button>
      <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
              <Form.Label column sm="2">Email</Form.Label>
              <Col sm="10">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2">Password</Form.Label>
              <Col sm="10">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Form.Group>
            <Button type="submit" variant="primary">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
