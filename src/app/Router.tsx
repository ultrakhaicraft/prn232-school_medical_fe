
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spinner } from '../components';



// Lazy load all the pages/routes
const Homepage = React.lazy(() => import('../app/pages/GuestHome-page'));
const Login = React.lazy(() => import('../app/pages/Login-page'));
const Register = React.lazy(() => import('../app/pages/Register-page'));
const ParentHomepage = React.lazy(() => import('../app/pages/ParentHome-page'));
const StudentHomepage = React.lazy(() => import('../app/pages/StudentHome-page'));
const NurseHomepage = React.lazy(() => import('../app/pages/NurseHome-page'));
const CreateStudentHealthRecordForm = React.lazy(() => import('../app/pages/CreateStudentHealthRecord-page'));


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
    return(
        <Suspense fallback={<FullPageSpinner/>}>
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/parentHomepage" element={<ParentHomepage/>} />
            <Route path="/studentHomepage" element={<StudentHomepage/>}/>
            <Route path="/nurseHomepage" element={<NurseHomepage/>} /> 
            <Route path="/createStudentHealthRecord" element={<CreateStudentHealthRecordForm />} />
            
            
            
            {/* Add other public routes here */}

            {/* Protected Routes can be added here */}
            {/* Example:

            
            {/* Protected Routes with a shared layout 
            <Route 
            element={
                <ProtectedRoute>
                <MainLayout />
                </ProtectedRoute>
            }
            >
            <Route path="/parentHomepage" element={<ParentHomepage/>} />
            <Route path="/student-health-form" element={<StudentHealthRecordForm />} />
             Add other protected routes here 
            </Route> */}


        </Routes>
        </Suspense>
    )
}