import React, { useState } from 'react';
import ChangePasswordForm from './ChangePasswordForm';

const PasswordChangeTest = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [testResults, setTestResults] = useState([]);

  const addTestResult = (type, message) => {
    setTestResults(prev => [...prev, { type, message, timestamp: new Date().toLocaleTimeString() }]);
  };

  const handleSuccess = () => {
    addTestResult('success', 'Password changed successfully!');
  };

  const handleError = (error) => {
    addTestResult('error', `Password change failed: ${error.message || 'Unknown error'}`);
  };

  const testBackendConnection = async () => {
    try {
      const response = await fetch('http://localhost:5000/');
      const result = await response.text();
      addTestResult('success', `Backend connected! Response: ${result}`);
    } catch (error) {
      addTestResult('error', `Backend connection failed: ${error.message}`);
    }
  };

  const testChangePasswordEndpoint = async () => {
    try {
      const response = await fetch('http://localhost:5000/test-change-password');
      const result = await response.json();
      addTestResult('success', `Change password endpoint available: ${JSON.stringify(result)}`);
    } catch (error) {
      addTestResult('error', `Change password endpoint test failed: ${error.message}`);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">🧪 Password Change Test</h1>
        <p className="text-gray-600 mb-4">
          Test the password change functionality with this standalone component.
        </p>
        
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-lg ${
              darkMode 
                ? 'bg-gray-800 text-white hover:bg-gray-700' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Toggle {darkMode ? 'Light' : 'Dark'} Mode
          </button>
          
          <button
            onClick={testBackendConnection}
            className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
          >
            Test Backend Connection
          </button>
          
          <button
            onClick={testChangePasswordEndpoint}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            Test Change Password Endpoint
          </button>
          
          <button
            onClick={clearResults}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Clear Results
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Password Change Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Change Password Form</h2>
          <ChangePasswordForm
            darkMode={darkMode}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </div>

        {/* Test Results */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          
          {testResults.length === 0 ? (
            <p className="text-gray-500">No test results yet. Try changing a password!</p>
          ) : (
            <div className="space-y-2">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    result.type === 'success'
                      ? 'bg-green-50 border-green-200 text-green-800'
                      : 'bg-red-50 border-red-200 text-red-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{result.message}</span>
                    <span className="text-xs text-gray-500">{result.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Test Instructions:</h3>
        <ol className="text-blue-700 space-y-1 text-sm">
          <li>1. Fill in the password fields (current, new, confirm)</li>
          <li>2. Test validation by entering invalid data</li>
          <li>3. Submit with valid data to see success</li>
          <li>4. Check the test results on the right</li>
          <li>5. Toggle dark mode to test styling</li>
        </ol>
      </div>
    </div>
  );
};

export default PasswordChangeTest; 