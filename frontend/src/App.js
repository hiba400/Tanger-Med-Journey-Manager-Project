import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import './pages/Home'; // Ensure you import your CSS file
import Home from './pages/Home';
import BreakdownAdminDashboard from './pages/BreakdownAdminDashboard'; // ✅ Correct pathimport BreakdownAdminDashboard from './pages/BreakdownAdminDashboard';

import DriverManagement from './pages/DriverManagement'; // ✅ Correct path
import RequestsManagement from './pages/RequestManagement';
import TruckManagement from './pages/TruckManagement';
import Profile from './pages/Profile';
import SettingsPage from './pages/Settings';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/authentication/sign-in" element={<Login />} />
                  <Route path="/pages/home" element={<Home />} />
        <Route path="/pages/driverManagement" element={<ProtectedRoute><DriverManagement /></ProtectedRoute>} />
        <Route path="/pages/requestManagement" element={<ProtectedRoute><RequestsManagement /></ProtectedRoute>} />
        <Route path="/pages/truckManagement" element={<ProtectedRoute><TruckManagement /></ProtectedRoute>} />
        <Route path="/pages/profil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/pages/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/pages/breakdownadmindashboard" element={<ProtectedRoute><BreakdownAdminDashboard /></ProtectedRoute>} />
          {/* Add more routes here as needed */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;