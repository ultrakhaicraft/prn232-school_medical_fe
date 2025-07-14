
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spinner } from '../components/spinner';





// Lazy load all the pages/routes
const Homepage = React.lazy(() => import('../app/pages/guest_area/GuestHome-page'));
const Login = React.lazy(() => import('../app/pages/guest_area/Login-page'));
const Register = React.lazy(() => import('../app/pages/guest_area/Register-page'));
const ParentHomepage = React.lazy(() => import('../app/pages/parent_area/ParentHome-page'));
const StudentHomepage = React.lazy(() => import('../app/pages/student_area/StudentHome-page'));
const NurseHomepage = React.lazy(() => import('../app/pages/nurse_area/NurseHome-page'));
const CreateStudentHealthRecordForm = React.lazy(() => import('../app/pages/parent_area/CreateStudentHealthRecord-page'));
const UpdateStudentHealthRecordPage=React.lazy(()=> import('../app/pages/parent_area/UpdateStudentHealthRecord-page'));
const ViewStudentHealthRecordPage =React.lazy(()=> import('../app/pages/parent_area/ViewStudentHealthRecord-page'));
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
            <Route path="/viewStudentHealthRecord" element={<ViewStudentHealthRecordPage />} />
            <Route path="/updateStudentHealthRecord" element={<UpdateStudentHealthRecordPage />} />
            <Route path="/nurse/medicines" element={<MedicineCRUDPage />} />
            <Route path="/nurse/incidents" element={<IncidentRecordCRUDPage />} />          
            <Route path="/parentUserProfile" element={<ParentUserProfile/>}/>
            <Route path="/requestMedicine" element={<ParentMedicineRequest/>}/>
            <Route path="/assignStudentToParent" element={<LinkStudentPage/>} />

           

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