import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route,BrowserRouter } from 'react-router-dom';
import Homepage from './app/pages/Homepage.tsx'
import Login from './app/pages/Login.tsx'
import UserHome from './app/pages/UserHome.tsx';
import RegisterController from './app/pages/Register.tsx';

import './app/CSS/Global.css';
import './app/CSS/Homepage.css'; 
import './app/CSS/Login.css'; 
import './app/CSS/Register.css'; 


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterController />} />
      <Route path="/userHome" element={<UserHome/>} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
