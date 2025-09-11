import React, { useState } from 'react';
import { Shield, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

const ChangePasswordForm = ({ darkMode, onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [validation, setValidation] = useState({
    currentPassword: true,
    newPassword: true,
    confirmPassword: true,
    passwordMatch: true,
    passwordLength: true
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear message when user starts typing
    if (message.text) {
      setMessage({ type: '', text: '' });
    }
    
    // Real-time validation
    validateField(field, value);
  };

  const validateField = (field, value) => {
    const newValidation = { ...validation };
    
    switch (field) {
      case 'currentPassword':
        newValidation.currentPassword = value.length > 0;
        break;
      case 'newPassword':
        newValidation.newPassword = value.length > 0;
        newValidation.passwordLength = value.length >= 6;
        newValidation.passwordMatch = value === formData.confirmPassword || formData.confirmPassword === '';
        break;
      case 'confirmPassword':
        newValidation.confirmPassword = value.length > 0;
        newValidation.passwordMatch = value === formData.newPassword;
        break;
      default:
        break;
    }
    
    setValidation(newValidation);
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const isFormValid = () => {
    return (
      formData.currentPassword &&
      formData.newPassword &&
      formData.confirmPassword &&
      formData.newPassword.length >= 6 &&
      formData.newPassword === formData.confirmPassword
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      setMessage({ type: 'error', text: 'Please fix the validation errors before submitting.' });
      return;
    }

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Real API call to backend
      console.log('Changing password via API...');
      
      const response = await fetch('http://localhost:5000/admin/change-password-test', {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'admin@test.com', // You can make this dynamic
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        setMessage({ type: 'success', text: result.message || 'Password changed successfully!' });
        
        // Clear form
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        
        // Reset validation
        setValidation({
          currentPassword: true,
          newPassword: true,
          confirmPassword: true,
          passwordMatch: true,
          passwordLength: true
        });
        
        if (onSuccess) onSuccess();
        
      } else {
        // Handle API errors
        const errorMessage = result.error || 'Failed to change password';
        setMessage({ type: 'error', text: errorMessage });
        if (onError) onError(new Error(errorMessage));
      }
      
    } catch (error) {
      console.error('Error changing password:', error);
      const errorMessage = error.message === 'Failed to fetch' 
        ? 'Cannot connect to server. Please check if backend is running on port 5000.'
        : 'Failed to change password. Please try again.';
      
      setMessage({ type: 'error', text: errorMessage });
      if (onError) onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getInputClassName = (field) => {
    const baseClasses = `w-full px-3 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500`;
    const validationClass = validation[field] ? 'border-gray-300' : 'border-red-500';
    const darkModeClass = darkMode 
      ? 'bg-slate-700 text-white border-slate-600' 
      : 'bg-white text-slate-900';
    
    return `${baseClasses} ${validationClass} ${darkModeClass}`;
  };

  const getValidationIcon = (field) => {
    if (!formData[field]) return null;
    
    if (validation[field]) {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    } else {
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Current Password */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            darkMode ? 'text-slate-300' : 'text-slate-700'
          }`}>
            Current Password
          </label>
          <div className="relative">
            <input
              type={showPasswords.current ? 'text' : 'password'}
              value={formData.currentPassword}
              onChange={(e) => handleInputChange('currentPassword', e.target.value)}
              className={getInputClassName('currentPassword')}
              placeholder="Enter current password"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('current')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            {getValidationIcon('currentPassword') && (
              <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                {getValidationIcon('currentPassword')}
              </div>
            )}
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            darkMode ? 'text-slate-300' : 'text-slate-700'
          }`}>
            New Password
          </label>
          <div className="relative">
            <input
              type={showPasswords.new ? 'text' : 'password'}
              value={formData.newPassword}
              onChange={(e) => handleInputChange('newPassword', e.target.value)}
              className={getInputClassName('newPassword')}
              placeholder="Enter new password (min 6 characters)"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            {getValidationIcon('newPassword') && (
              <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                {getValidationIcon('newPassword')}
              </div>
            )}
          </div>
          {formData.newPassword && !validation.passwordLength && (
            <p className="text-red-500 text-sm mt-1">Password must be at least 6 characters long</p>
          )}
        </div>

        {/* Confirm New Password */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            darkMode ? 'text-slate-300' : 'text-slate-700'
          }`}>
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showPasswords.confirm ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className={getInputClassName('confirmPassword')}
              placeholder="Confirm new password"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirm')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            {getValidationIcon('confirmPassword') && (
              <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                {getValidationIcon('confirmPassword')}
              </div>
            )}
          </div>
          {formData.confirmPassword && !validation.passwordMatch && (
            <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
          )}
        </div>

        {/* Message Display */}
        {message.text && (
          <div className={`p-3 rounded-md ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid() || isLoading}
          className={`w-full px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
            isFormValid() && !isLoading
              ? darkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Changing Password...</span>
            </>
          ) : (
            <>
              <Shield className="w-4 h-4" />
              <span>Change Password</span>
            </>
          )}
        </button>
      </form>

      {/* Password Requirements */}
      <div className={`p-3 rounded-md ${
        darkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'
      } border`}>
        <h4 className={`text-sm font-medium mb-2 ${
          darkMode ? 'text-slate-300' : 'text-slate-700'
        }`}>
          Password Requirements:
        </h4>
        <ul className={`text-sm space-y-1 ${
          darkMode ? 'text-slate-400' : 'text-slate-600'
        }`}>
          <li>• Minimum 6 characters</li>
          <li>• Current password must be correct</li>
          <li>• New password and confirmation must match</li>
        </ul>
      </div>
    </div>
  );
};

export default ChangePasswordForm; 