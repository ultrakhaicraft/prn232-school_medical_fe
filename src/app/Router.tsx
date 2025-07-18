
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spinner } from '../components/spinner';
import CreateMedicineRequest from './pages/parent_area/ParentCreateMedRequest-page';
import { ProtectedRoute } from './ProtectedRoute';





// Lazy load all the pages/routes
const Homepage = React.lazy(() => import('../app/pages/guest_area/GuestHome-page'));
const Login = React.lazy(() => import('../app/pages/guest_area/Login-page'));
const Register = React.lazy(() => import('../app/pages/guest_area/Register-page'));
const ParentHomepage = React.lazy(() => import('../app/pages/parent_area/ParentHome-page'));
const StudentHomepage = React.lazy(() => import('../app/pages/student_area/StudentHome-page'));
const NurseHomepage = React.lazy(() => import('../app/pages/nurse_area/NurseHome-page'));
const CreateStudentHealthRecordForm = React.lazy(() => import('../app/pages/parent_area/CreateStudentHealthRecord-page'));
const UpdateStudentHealthRecordPage = React.lazy(() => import('../app/pages/parent_area/UpdateStudentHealthRecord-page'));
const ViewStudentHealthRecordPage = React.lazy(() => import('../app/pages/parent_area/ViewStudentHealthRecord-page'));
const MedicineCRUDPage = React.lazy(() => import('../app/pages/nurse_area/MedicineCRUD-page'));
const IncidentRecordCRUDPage = React.lazy(() => import('../app/pages/nurse_area/IncidentRecordCRUD-page'));
const ParentMedicineRequest = React.lazy(() => import('../app/pages/parent_area/ParentMedicineRequest-page'));
const ParentUserProfile = React.lazy(() => import('../app/pages/ParentUserProfile-Page'));
const LinkStudentPage = React.lazy(() => import('../app/pages/LinkingStudent-Page'));

// A simple component to center the spinner
const FullPageSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
  }}>
    <Spinner size="large" />
  </div>
);

export const AppRouter = () => {
  return (
    <Suspense fallback={<FullPageSpinner />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />




        {/* Protected Routes */}
        <Route path="/parentHomepage" element={
          <ProtectedRoute><ParentHomepage /></ProtectedRoute>
        } />
        <Route path="/studentHomepage" element={
          <ProtectedRoute><StudentHomepage /></ProtectedRoute>
        } />
        <Route path="/nurseHomepage" element={
          <ProtectedRoute><NurseHomepage /></ProtectedRoute>
        } />
        <Route path="/createStudentHealthRecord" element={
          <ProtectedRoute><CreateStudentHealthRecordForm /></ProtectedRoute>
        } />
        <Route path="/viewStudentHealthRecord" element={
          <ProtectedRoute><ViewStudentHealthRecordPage /></ProtectedRoute>
        } />
        <Route path="/updateStudentHealthRecord" element={
          <ProtectedRoute><UpdateStudentHealthRecordPage /></ProtectedRoute>
        } />
        <Route path="/nurse/medicines" element={
          <ProtectedRoute><MedicineCRUDPage /></ProtectedRoute>
        } />
        <Route path="/nurse/incidents" element={
          <ProtectedRoute><IncidentRecordCRUDPage /></ProtectedRoute>
        } />
        <Route path="/parentUserProfile" element={
          <ProtectedRoute><ParentUserProfile /></ProtectedRoute>
        } />
        <Route path="/createMedicineRequest" element={
          <ProtectedRoute><CreateMedicineRequest /></ProtectedRoute>
        } />
        <Route path="/requestMedicine" element={
          <ProtectedRoute><ParentMedicineRequest /></ProtectedRoute>
        } />
        <Route path="/assignStudentToParent" element={
          <ProtectedRoute><LinkStudentPage /></ProtectedRoute>
        } />



      </Routes>
    </Suspense>
  )
}