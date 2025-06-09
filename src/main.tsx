import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './app/App.tsx';

//All CSS imports
import './app/CSS/Global.css';
import './app/CSS/Spinner.css';
import './app/CSS/Register.css'; 
import './app/CSS/ParentHomepage.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
  </StrictMode>,
)
