import Auth from "./pages/Auth";
import React, { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Hotels from "./pages/Hotels";
import { useState } from "react";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('Auth'))
  return (
    <BrowserRouter>
      <div className='page'>
        <Routes>
          <Route exact path='/' element={isLoggedIn ? <Navigate to="/hotels" /> : <Auth setIsLoggedIn={setIsLoggedIn} />} />
          <Route exact path='/hotels' element={isLoggedIn ? <Hotels setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />} />
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
