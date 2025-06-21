import React, { useState } from 'react';
import UserHomeNavBar from '../../components/User_homepage/userhome-nav-bar';
import Footer from '../../components/Landing_Page/footer';
import FormSection from '../../components/FormSection'
import { 
  IconHeart, 
  IconActivity, 
  IconEye, 
  IconInfo, 
  IconPaperPlane, 
  IconSave 
} from '../../components/IconList'; // Importing icons from a separate file

import '../CSS/MedicalRecord.css'; // Importing CSS styles for the medical record form

// Main App Component - This is the entry point
export default function CreateStudentHealthRecordPage() {
  return (
    <div className="app-container">
      <UserHomeNavBar userType='parent' />
      <main className="main-content">
        <div className="form-wrapper">
          <MedicalRecordForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Header Component
const Header = () => (
  <header className="app-header">
    <div className="container header-content">
      <div className="logo-container">
        <div className="logo-icon">
          {/* Starlight Icon SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" className="icon-large" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.47 8.53L21.5 9.53L16.5 14.24L17.94 21.02L12 17.77L6.06 21.02L7.5 14.24L2.5 9.53L9.53 8.53L12 2Z" />
          </svg>
        </div>
        <h1 className="logo-title">Starlight Academy</h1>
      </div>
      <nav className="main-nav">
        <a href="#">Dashboard</a>
        <a href="#">Student Health</a>
        <a href="#" className="active">Medical Records</a>
        <a href="#">Announcements</a>
        <a href="#">Support</a>
      </nav>
      <div className="profile-container">
        <img
          className="profile-avatar"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fDE?q=80&w=2080&auto=format&fit=crop"
          alt="User profile"
        />
      </div>
    </div>
  </header>
);


// Main Medical Record Form Component
const MedicalRecordForm = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    height: '150',
    allergies: '',
    chronicDiseases: '',
    vision: '',
    additionalInfo: ''
  });

  // Handler for input changes
  const handleChange = (e: { target: { name: string; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="medical-record-form">
      <div className="form-title-container">
        <div className="form-title-icon-wrapper">
          {/* Document Icon SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" className="icon-medium" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <h2 className="form-title">Student Medical Record Form</h2>
          <p className="form-subtitle">Please fill out all medical information for your child.</p>
        </div>
      </div>

      <div className="info-banner" role="alert">
        <div className="info-banner-content">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon-small info-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p>All information provided will be kept confidential and used only for your child's health and safety at school.</p>
        </div>
      </div>
      
      {/* Form Fields */}
      <div className="form-grid">
        <div className="input-group">
          <label htmlFor="parentName" className="input-label">Parent Name</label>
          <input
            type="text"
            id="parentName"
            name="parentName"
            value={formData.parentName}
            onChange={handleChange}
            placeholder="Enter parent's full name"
            className="input-field"
          />
        </div>
      
        <div className="input-group">
          <label htmlFor="childName" className="input-label">Child Name</label>
          <input
            type="text"
            id="childName"
            name="childName"
            value={formData.childName}
            onChange={handleChange}
            placeholder="Enter child's full name"
            className="input-field"
          />
        </div>
      </div>
      
      <div className="input-group">
        <label htmlFor="height" className="form-label">Height</label>
        <div className="input-with-unit">
          <input 
          type="number"
          id="height"
          name="height"
          value={formData.height}
          placeholder='Enter height in cm'
          onChange={handleChange}
          className="input-field"
        />
        <span className="input-unit">cm</span>
        </div>
      </div>

      <FormSection icon={<IconHeart className="icon-small icon-heart" />} title="Allergies"
        formSectionClassName='form-section' headerClassName='form-section-header' titleClassName='form-section-title'>
        <textarea
          id='allergies'
          name='allergies'
          rows={4}
          value={formData.allergies}
          onChange={handleChange}
          placeholder="Please list any known allergies, including food allergies, environmental allergies, or medication allergies. Include severity and symptoms if known."
          className="textarea-field"
        />
      </FormSection>

      <FormSection icon={<IconActivity className="icon-small icon-activity"/>} title="Chronic Diseases"
        formSectionClassName='form-section' headerClassName='form-section-header' titleClassName='form-section-title'>
        <textarea
          id='chronicDiseases'
          name='chronicDiseases'
          rows={4}
          value={formData.chronicDiseases}
          onChange={handleChange}
          placeholder="Please list any chronic conditions such as asthma, diabetes, epilepsy, or other ongoing medical conditions. Include current treatments or medications."
          className="textarea-field"
        />
      </FormSection>
      
      <FormSection icon={<IconEye className="icon-small icon-eye" />} title="Vision"
        formSectionClassName='form-section' headerClassName='form-section-header' titleClassName='form-section-title'>
        <textarea
          id='vision'
          name='vision'
          rows={4}
          value={formData.vision}
          onChange={handleChange}
          placeholder="Please describe any vision issues, corrective lenses needed, or visual impairments. Include prescription details if applicable."
          className="textarea-field"
        />
      </FormSection>
      
      <FormSection icon={<IconInfo className="icon-small icon-info"/>} title="Additional Medical Information"
        formSectionClassName='form-section' headerClassName='form-section-header' titleClassName='form-section-title'>
        <textarea
          id='additionalInfo'
          name='additionalInfo'
          rows={4}
          value={formData.additionalInfo}
          onChange={handleChange}
          placeholder="Please include any other relevant medical information, current medications, recent surgeries, or special medical needs that the school should be aware of."
          className="textarea-field"
        />
      </FormSection>

      <div className="form-actions">
        <button type="button" className="button button-secondary">
          <IconSave className='icon-small' />
          Save as Draft
        </button>
        <button type="submit" className="button button-primary">
          <IconPaperPlane className="icon-small"/>
          Save Medical Record
        </button>
      </div>
    </div>
  );
};






