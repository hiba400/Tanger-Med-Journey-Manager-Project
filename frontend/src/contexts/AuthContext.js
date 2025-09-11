import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for admin data in localStorage or sessionStorage on app load
    const adminData = localStorage.getItem('adminData') || sessionStorage.getItem('adminData');
    if (adminData) {
      try {
        setAdmin(JSON.parse(adminData));
      } catch (error) {
        console.error('Error parsing admin data:', error);
        localStorage.removeItem('adminData');
        sessionStorage.removeItem('adminData');
      }
    }
    setLoading(false);
  }, []);

  const login = (adminData, rememberMe = false) => {
    setAdmin(adminData);
    if (rememberMe) {
      localStorage.setItem('adminData', JSON.stringify(adminData));
    } else {
      sessionStorage.setItem('adminData', JSON.stringify(adminData));
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('adminData');
    sessionStorage.removeItem('adminData');
  };

  const value = {
    admin,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 