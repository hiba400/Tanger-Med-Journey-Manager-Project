import React, { useState, useCallback, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/api';

export default function AuthPage({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // ✅ INSIDE component
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [fieldFocus, setFieldFocus] = useState({});
  const [typingFields, setTypingFields] = useState({});
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyCode: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Animation de chargement de page
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Fonction avec animation de typing
  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Animation de typing
    setTypingFields(prev => ({ ...prev, [field]: true }));
    
    // Reset typing animation après un délai
    setTimeout(() => {
      setTypingFields(prev => ({ ...prev, [field]: false }));
    }, 150);
  }, []);

  // Gestion du focus
  const handleFocus = useCallback((field) => {
    setFieldFocus(prev => ({ ...prev, [field]: true }));
  }, []);

  const handleBlur = useCallback((field) => {
    setFieldFocus(prev => ({ ...prev, [field]: false }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login attempt:', {
        email: formData.email,
        password: formData.password,
        rememberMe
      });
      
      try {
        // Use Axios API service for login
        const data = await authAPI.login(formData.email, formData.password);

        if (data.success) {
          console.log('Admin login successful:', data);
          
          // Use AuthContext to login
          login(data.admin, rememberMe);
          
          // Redirect to admin dashboard
          navigate('/pages/breakdownadmindashboard');
          
          // Call onLoginSuccess if provided
          onLoginSuccess && onLoginSuccess();
        } else {
          console.error('Login failed:', data.error);
          alert(data.error || 'Login failed. Please check your credentials.');
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert(error.response?.data?.error || 'Network error. Please try again.');
      }
    } else {
      console.log('Registration attempt:', formData);
      
      // Validate registration data
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword || !formData.phone) {
        alert('Please fill in all fields');
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      
      // Validate company code
      if (formData.companyCode !== 'tangermed2') {
        alert('Invalid company code.');
        return;
      }
      
      // Validate phone number format (Moroccan format)
      const phoneRegex = /^0[5-7]\d{8}$/;
      if (!phoneRegex.test(formData.phone)) {
        alert('Please enter a valid Moroccan phone number (e.g., 0500000000, 0600000000, 0700000000)');
        return;
      }
      
      try {
        // Use Axios API service for registration
        const data = await authAPI.register({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          password: formData.password,
          phone: formData.phone
        });

        if (data.success) {
          console.log('Admin registration successful:', data);
          alert('Registration successful! Please login with your credentials.');
          
          // Switch back to login mode
          setIsLogin(true);
          setFormData({
            firstName: '',
            lastName: '',
            companyCode: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: ''
          });
        } else {
          console.error('Registration failed:', data.error);
          alert(data.error || 'Registration failed. Please try again.');
        }
      } catch (error) {
        console.error('Error during registration:', error);
        alert(error.response?.data?.error || 'Network error. Please try again.');
      }
    }
  }, [isLogin, formData, rememberMe, onLoginSuccess, navigate, login]);

  const switchMode = useCallback(() => {
    setIsLogin(!isLogin);
    setFormData({
      firstName: '',
      lastName: '',
      companyCode: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  }, [isLogin]);

  // Classes pour les animations de typing
  const getInputClasses = (field) => {
    const isFocused = fieldFocus[field];
    const isTyping = typingFields[field];
    
    return `w-full px-3 py-3 border-none rounded-2xl text-base bg-white/70 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ${
      isFocused ? 'transform scale-[1.02] shadow-lg' : ''
    } ${
      isTyping ? 'transform scale-[1.01]' : ''
    }`;
  };

  return (
    <>
      {/* Header avec animation de chargement */}
      <div className={`absolute top-6 left-6 flex items-center space-x-3 z-50 transition-all duration-800 ${
        isPageLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-[-20px]'
      }`}>
        <img src="/img/TM_logo.png" alt="Logo" className="h-10 w-10 object-contain" />
        <div>
          <h1 className="text-xl font-bold text-white">TANGER MED</h1>
          <p className="text-sm" style={{color: '#A3C5F1'}}>Journey Manager</p>
        </div>
      </div>

      <div className={`absolute top-6 right-6 z-50 transition-all duration-800 delay-200 ${
        isPageLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-[-20px]'
      }`}>
        <button 
            onClick={() => navigate('/pages/Home')}       
            className="px-4 py-2 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-300/20"
        >
          Home
        </button>
      </div>

      {/* Main Auth Container avec animation de chargement */}
      <div
        className="min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center"
        style={{ backgroundImage: `url("/img/backgroundd.jpg")` }}
      >
        <div className={`transition-all duration-800 delay-400 ${isLogin ? 'min-w-80' : 'min-w-96'} ${
          isPageLoaded ? 'opacity-100 transform translate-y-0 scale-100' : 'opacity-0 transform translate-y-8 scale-95'
        }`}>
          <div
            className="backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-10 flex flex-col items-center transition-all duration-500"
            style={{
              background: 'rgba(19, 7, 57, 0.15)',
              boxShadow: '0 8px 32px 0 rgba(0, 2, 32, 0.37)'
            }}
          >
            <h2
              className="text-4xl text-white mb-6 transition-all duration-300"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {isLogin ? 'Welcome' : 'Create Account'}
            </h2>

            <div className="w-full space-y-4">
              {/* Registration Fields */}
              <div
                className={`transition-all duration-500 overflow-hidden ${
                  isLogin ? 'max-h-0 opacity-0' : 'max-h-[300px] opacity-100'
                }`}
              >
                <div className="min-h-0 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      onFocus={() => handleFocus('firstName')}
                      onBlur={() => handleBlur('firstName')}
                      className={getInputClasses('firstName')}
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      onFocus={() => handleFocus('lastName')}
                      onBlur={() => handleBlur('lastName')}
                      className={getInputClasses('lastName')}
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Company Code"
                    value={formData.companyCode}
                    onChange={(e) => handleInputChange('companyCode', e.target.value)}
                    onFocus={() => handleFocus('companyCode')}
                    onBlur={() => handleBlur('companyCode')}
                    className={getInputClasses('companyCode')}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    onFocus={() => handleFocus('phone')}
                    onBlur={() => handleBlur('phone')}
                    className={getInputClasses('phone')}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  />
                </div>
              </div>

              {/* Email Field */}
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onFocus={() => handleFocus('email')}
                onBlur={() => handleBlur('email')}
                className={`${getInputClasses('email')} my-2`}
                style={{ fontFamily: 'Poppins, sans-serif' }}
              />

              {/* Password Field */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  onFocus={() => handleFocus('password')}
                  onBlur={() => handleBlur('password')}
                  className={`${getInputClasses('password')} my-2 pr-10`}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:scale-110 transition-transform duration-150"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Confirm Password */}
              <div
                className={`transition-all duration-500 overflow-hidden ${
                  isLogin ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100'
                }`}
              >
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    onFocus={() => handleFocus('confirmPassword')}
                    onBlur={() => handleBlur('confirmPassword')}
                    className={`${getInputClasses('confirmPassword')} my-2 pr-10`}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:scale-110 transition-transform duration-150"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full px-3 py-3 mt-4 mb-2 border-none rounded-2xl text-white font-bold text-base cursor-pointer transition-all duration-200 hover:bg-blue-800 hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: '#192338' }}
              >
                {isLogin ? 'Sign in' : 'Create Account'}
              </button>

              {/* Remember Me */}
              {isLogin && (
                <label className="text-white text-sm flex items-center self-start my-2 cursor-pointer hover:text-blue-200 transition-colors duration-200">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2 transition-transform duration-150 hover:scale-110"
                  />
                  Remember me
                </label>
              )}

              {/* Switch Mode */}
              <p className="text-white mt-4 text-sm text-center">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={switchMode}
                  className="text-blue-300 hover:text-blue-200 hover:underline bg-transparent border-none cursor-pointer text-sm transition-all duration-200 hover:scale-105"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}