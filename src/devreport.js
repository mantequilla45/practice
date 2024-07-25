import React from 'react';
import { Modal as BootstrapModal, Button as BootstrapButton } from 'react-bootstrap';
import styled from 'styled-components';
import './devreport.css';

// Styled components for the form
const FormContainer = styled.main`
  justify-content: center;
  border-radius: 10px;
  background-color: #caf5ff;
  display: flex;
  max-width: 802px;
  flex-direction: column;
  padding: 50px;
  border: 1px solid #a6a6a6;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 20px;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

const LogoWrapper = styled.div`
  width: 15%;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Logo = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  width: 105px;
  max-width: 100%;
`;

const Title = styled.h1`
  color: #000;
  font: 400 40px Rubik, sans-serif;
  margin: 0;
  @media (max-width: 991px) {
    font-size: 32px;
  }
`;

const FileUploadSection = styled.div`
  margin-top: 25px;
`;

const FileUploadLabel = styled.label`
  color: #000;
  font: 400 20px Rubik, sans-serif;
  display: block;
  margin-bottom: 10px;
`;

const FileUploadButton = styled.button`
  border-radius: 10px;
  background-color: #fff;
  color: #000;
  padding: 13px 23px;
  font: 400 20px Rubik, sans-serif;
  border: 1px solid #b7b7b7;
  cursor: pointer;
  @media (max-width: 991px) {
    padding: 10px 20px;
  }
`;

const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

// Form input component
const InputWrapper = styled.div`
  margin-top: 37px;
`;

const Label = styled.label`
  color: #000;
  font: 400 20px Rubik, sans-serif;
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  border-radius: 10px;
  background-color: #fff;
  height: 51px;
  width: 100%;
  border: 1px solid #b7b7b7;
  padding: 0 15px;
  font: 400 16px Rubik, sans-serif;
`;

function FormInput({ label, id, type }) {
  return (
    <InputWrapper>
      <Label htmlFor={id}>{label}</Label>
      <Input type={type} id={id} name={id} required />
    </InputWrapper>
  );
}

// Form text area component
const TextAreaWrapper = styled.div`
  margin-top: 37px;
`;

const TextArea = styled.textarea`
  border-radius: 10px;
  background-color: #fff;
  height: 246px;
  width: 100%;
  border: 1px solid #b7b7b7;
  padding: 15px;
  font: 400 16px Rubik, sans-serif;
  resize: vertical;
`;

function FormTextArea({ label, id }) {
  return (
    <TextAreaWrapper>
      <Label htmlFor={id}>{label}</Label>
      <TextArea id={id} name={id} required />
    </TextAreaWrapper>
  );
}

// Button component for the form
const StyledButton = styled.button`
  border-radius: 10px;
  background-color: #fff;
  color: #000;
  padding: 13px 23px;
  font: 400 20px Rubik, sans-serif;
  border: 1px solid #b7b7b7;
  cursor: pointer;
  @media (max-width: 991px) {
    padding: 10px 20px;
  }
`;

function FormButton({ children, onClick }) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

// Bug report form component
function BugReportForm() {
  return (
    <div className = "dev-rep-form-container">
      <div className = "dev-rep-header" closeButton>
        <LogoWrapper>
          <Logo
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f3ade4f1c2aa58c9d8b1bf86693b7788d8778e008517d33acfec44ba834bfa83?apiKey=0cd5b3eb85e74a83a268d41d07a9c27f&&apiKey=0cd5b3eb85e74a83a268d41d07a9c27f"
            alt="Bug Report Logo"
          />
        </LogoWrapper>
        <Title>Report Bug</Title>
      </div>
      <form>
        <FormInput label="Your email address" id="email" type="email" />
        <FormTextArea label="Bug description" id="description" />
        <FileUploadSection>
          <FileUploadLabel>Add a screenshot</FileUploadLabel>
          <FileUploadButton>Choose a file</FileUploadButton>
        </FileUploadSection>
        <SubmitButtonWrapper>
          <FormButton>Send Bug</FormButton>
        </SubmitButtonWrapper>
      </form>
    </div>
  );
}

const DevreportModal = ({ show, handleClose }) => {
  return (
    <BootstrapModal show={show} onHide={handleClose} size="lg">
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>Report Bug</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <BugReportForm />
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <BootstrapButton variant="secondary" onClick={handleClose}>
          Close
        </BootstrapButton>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default DevreportModal;
