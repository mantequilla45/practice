import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
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
const Login = ()=> {
  const [ show, setShow ] = useState(false);
  const handleShow = ()=> {
    setShow(true);
  }
  const handleHide = ()=> {
    setShow(false);
  }
  
  return (
    <>
    <Buttonn onClick={handleShow}> Log in </Buttonn>

    <Modal
        show={show}
        onHide={handleHide}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
              <Form.Label column sm="2"> Email </Form.Label>
              <Col sm="10">
                <Form.Control type="email" placeholder="Email address"/>
              </Col>
            </Form.Group>
            
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2"> Password </Form.Label>
              <Col sm="10">
                <Form.Control type="password" placeholder="Password"/>
              </Col>
            </Form.Group>

            <Buttonn type="submit"> Login </Buttonn> 

          </Form>

        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
