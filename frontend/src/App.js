import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import './pages/Home'; // Ensure you import your CSS file
import Home from './pages/Home';
import BreakdownAdminDashboard from './pages/BreakdownAdminDashboard'; // ✅ Correct pathimport BreakdownAdminDashboard from './pages/BreakdownAdminDashboard';

import DriverManagement from './pages/DriverManagement'; // ✅ Correct path
import RequestsManagement from './pages/RequestManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/authentication/sign-in" element={<Login />} />
        <Route path="/pages/home" element={<Home />} />
        <Route path="/pages/driverManagement" element={<DriverManagement />} />
        <Route path="/pages/requestManagement" element={<RequestsManagement />} />
        <Route path="/pages/breakdownadmindashboard" element={<BreakdownAdminDashboard />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;