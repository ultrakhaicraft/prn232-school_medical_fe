
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spinner } from '../components/spinner';


// Lazy load all the pages/routes
const Homepage = React.lazy(() => import('../app/pages/GuestHome-page'));
const Login = React.lazy(() => import('../app/pages/Login-page'));
const RegisterController = React.lazy(() => import('../app/pages/NotRegisterAnymore'));
const ParentHomepage = React.lazy(() => import('../app/pages/ParentHome-page'));
//const StudentHealthRecordForm = React.lazy(() => import(''));


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
            <Route path="/register" element={<RegisterController />} />
            <Route path="/parentHomepage" element={<ParentHomepage/>} />

            
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