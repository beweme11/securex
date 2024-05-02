import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import AuthComponent from './auth';
import Homepage from './Home';
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container mx-auto mt-8">
          <Routes>

            <Route path="/" element={<AuthComponent />} />
            <Route path="/home" element={<Homepage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
