import React, { useState } from 'react';

const BackendTest = () => {
  const [testResults, setTestResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (type, message) => {
    setTestResults(prev => [...prev, { type, message, timestamp: new Date().toLocaleTimeString() }]);
  };

  const testBackendConnection = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/');
      const result = await response.text();
      addResult('success', `✅ Backend connected! Response: ${result}`);
    } catch (error) {
      addResult('error', `❌ Backend connection failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testChangePasswordEndpoint = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/test-change-password');
      const result = await response.json();
      addResult('success', `✅ Change password endpoint available: ${JSON.stringify(result)}`);
    } catch (error) {
      addResult('error', `❌ Change password endpoint test failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testChangePasswordAPI = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/admin/change-password-test', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'admin@test.com',
          currentPassword: 'admin123',
          newPassword: 'newpass123'
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        addResult('success', `✅ Password change test successful: ${result.message}`);
      } else {
        addResult('error', `❌ Password change test failed: ${result.error}`);
      }
    } catch (error) {
      addResult('error', `❌ Password change API test failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">🔧 Backend Connection Test</h2>
      
      <div className="space-y-4 mb-6">
        <button
          onClick={testBackendConnection}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400"
        >
          {isLoading ? 'Testing...' : 'Test Backend Connection'}
        </button>
        
        <button
          onClick={testChangePasswordEndpoint}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isLoading ? 'Testing...' : 'Test Change Password Endpoint'}
        </button>
        
        <button
          onClick={testChangePasswordAPI}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-400"
        >
          {isLoading ? 'Testing...' : 'Test Change Password API'}
        </button>
        
        <button
          onClick={clearResults}
          className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Clear Results
        </button>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Test Results:</h3>
        {testResults.length === 0 ? (
          <p className="text-gray-500">No test results yet. Click a test button above.</p>
        ) : (
          testResults.map((result, index) => (
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
          ))
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">Instructions:</h4>
        <ol className="text-blue-700 text-sm space-y-1">
          <li>1. Make sure your backend is running on port 5000</li>
          <li>2. Click "Test Backend Connection" first</li>
          <li>3. Then test the change password endpoint</li>
          <li>4. Finally test the actual password change API</li>
        </ol>
      </div>
    </div>
  );
};

export default BackendTest; 