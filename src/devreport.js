import React from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';
import styled from 'styled-components';
import './devreport.css';

// Styled components for custom modal
const CustomModalBody = styled(BootstrapModal.Body)`
  padding: 0; /* Remove default padding */
`;

const CustomModalHeader = styled(BootstrapModal.Header)`
  border-bottom: none; /* Remove default border */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CustomModalTitle = styled.h1`
  color: #000;
  font: 400 25px Rubik, sans-serif;
`;

const CustomModalLogo = styled.img`
  width: 100px; /* Adjust size as needed */
  margin-bottom: 10px;
`;

// Rest of your styled components
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
    <div className="dev-rep-form-container">
        
        <div className = "dev-rep-header">
            <div className = 'dev-rep-title-logo'><div className = "dev-rep-logo-wrapper">
                <img className = "dev-rep-logo"
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f3ade4f1c2aa58c9d8b1bf86693b7788d8778e008517d33acfec44ba834bfa83?apiKey=0cd5b3eb85e74a83a268d41d07a9c27f&&apiKey=0cd5b3eb85e74a83a268d41d07a9c27f"
                    alt="Bug Report Logo"
                />
                </div>
                <h1 className = "dev-rep-title">Report Bug</h1>
            </div>
            
            <div className = "closebutton-container">
            <BootstrapModal.Header className="custom-modal-header" closeButton></BootstrapModal.Header>
        </div>
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
      <CustomModalBody>
        <BugReportForm />
      </CustomModalBody>
    </BootstrapModal>
  );
};

export default DevreportModal;
