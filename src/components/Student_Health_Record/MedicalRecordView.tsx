import { Link } from 'react-router-dom';
import FormSection from '../../components/FormSection'
import { 
  IconHeart, 
  IconActivity, 
  IconEye, 
  IconInfo, 
  IconPaperPlane,  
} from '../../components/IconList'; // Importing icons from a separate file
import { StudentHealthRecordDetail } from '../../feature/API/StudentHealthRecordService';
import EmptyRecordView from './EmptyRecordView';


interface MedicalRecordViewProps {
    viewData: StudentHealthRecordDetail | null
    parentName: string | null;
    error: string | null;
}


//Medical Record Form Component
//TODO: Convert all input into text view
const MedicalRecordForm = ({error, viewData, parentName }: MedicalRecordViewProps) => {
  
 
  //Check if the storedForm is empty, if yes return the empty record form
  if (!viewData) {
    return <EmptyRecordView/>
  }
 
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
      {error && <div className='error-message'>{error}</div>}
      
      <div className="form-grid">
        <div className="input-group">
          <label htmlFor="parentName" className="input-label">Parent Name</label>
          <p className="text-field">{parentName}</p>
        </div>
      
        <div className="input-group">
          <label htmlFor="childName" className="input-label">Child Name</label>
          <p className="text-field">{viewData.studentName}</p>
        </div>
      </div>
      
      <div className="input-group">
        <label htmlFor="height" className="form-label">Height</label>
        <div className="input-with-unit">
          <p className="text-field">{viewData.height} <span className="input-unit">cm</span></p>
        </div>
     </div>

      <FormSection icon={<IconHeart className="icon-small icon-heart" />} title="Allergies"
        formSectionClassName='form-section' headerClassName='form-section-header' titleClassName='form-section-title'>
        <p className="text-field">{viewData.allergies}</p>
      </FormSection>

      <FormSection icon={<IconActivity className="icon-small icon-activity"/>} title="Chronic Diseases"
        formSectionClassName='form-section' headerClassName='form-section-header' titleClassName='form-section-title'>
         <p className="text-field">{viewData.chronicDiseases}</p>
      </FormSection>
      
      <FormSection icon={<IconEye className="icon-small icon-eye" />} title="Vision"
        formSectionClassName='form-section' headerClassName='form-section-header' titleClassName='form-section-title'>
         <p className="text-field">{viewData.vision}</p>
      </FormSection>

      <FormSection icon={<IconInfo className="icon-small icon-eye" />} title="Hearing"
        formSectionClassName='form-section' headerClassName='form-section-header' titleClassName='form-section-title'>
        <p className="text-field">{viewData.hearing}</p>
      </FormSection>

      <div className="form-actions">
        <Link to="/updateStudentHealthRecord" className="create-record-button">
                    Update
        </Link>
      </div>
      
    </div>
    
      
  );
};


export default MedicalRecordForm;