import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// import Login from './pages/login'
// import Register from './pages/register'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         {/*Redicionamento para a pagina de login */}
//         <Route path='/' element={<Navigate to="/login" />} />

//         {/* Rotas principais */}
//         <Route path='/login' element={<Login />} />
//         <Route path='/register' element={<Register />} />
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>


