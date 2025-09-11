import React, { useState } from 'react';
import { testAllAPIs, testChangePassword, testEndpoint } from '../services/apiTest.js';

const APITest = () => {
  const [testResults, setTestResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [customEndpoint, setCustomEndpoint] = useState('');
  const [customMethod, setCustomMethod] = useState('GET');
  const [customData, setCustomData] = useState('');
  const [changePasswordData, setChangePasswordData] = useState({
    currentPassword: '',
    newPassword: ''
  });

  const runAllTests = async () => {
    setIsLoading(true);
    setTestResults([]);
    
    try {
      await testAllAPIs();
      setTestResults(prev => [...prev, { type: 'success', message: 'All API tests completed! Check console for details.' }]);
    } catch (error) {
      setTestResults(prev => [...prev, { type: 'error', message: `API tests failed: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const testCustomEndpoint = async () => {
    if (!customEndpoint) {
      setTestResults(prev => [...prev, { type: 'error', message: 'Please enter an endpoint' }]);
      return;
    }

    setIsLoading(true);
    try {
      let data = null;
      if (customData && customMethod !== 'GET') {
        try {
          data = JSON.parse(customData);
        } catch (e) {
          setTestResults(prev => [...prev, { type: 'error', message: 'Invalid JSON data' }]);
          setIsLoading(false);
          return;
        }
      }

      const result = await testEndpoint(customEndpoint, customMethod, data);
      setTestResults(prev => [...prev, { 
        type: 'success', 
        message: `${customMethod} ${customEndpoint}: ${JSON.stringify(result)}` 
      }]);
    } catch (error) {
      setTestResults(prev => [...prev, { 
        type: 'error', 
        message: `${customMethod} ${customEndpoint} failed: ${error.message}` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const testChangePassword = async () => {
    if (!changePasswordData.currentPassword || !changePasswordData.newPassword) {
      setTestResults(prev => [...prev, { type: 'error', message: 'Please enter both current and new passwords' }]);
      return;
    }

    setIsLoading(true);
    try {
      const result = await testChangePassword(
        changePasswordData.currentPassword,
        changePasswordData.newPassword
      );
      setTestResults(prev => [...prev, { 
        type: 'success', 
        message: `Change password test: ${JSON.stringify(result)}` 
      }]);
    } catch (error) {
      setTestResults(prev => [...prev, { 
        type: 'error', 
        message: `Change password test failed: ${error.message}` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🧪 API Connection Test</h2>
      
      {/* Test All APIs Button */}
      <div className="mb-6">
        <button
          onClick={runAllTests}
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded mr-4"
        >
          {isLoading ? 'Testing...' : 'Test All APIs'}
        </button>
        <button
          onClick={clearResults}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          Clear Results
        </button>
      </div>

      {/* Custom Endpoint Test */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Test Custom Endpoint</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
          <input
            type="text"
            placeholder="/endpoint"
            value={customEndpoint}
            onChange={(e) => setCustomEndpoint(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <select
            value={customMethod}
            onChange={(e) => setCustomMethod(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
          </select>
          <input
            type="text"
            placeholder='{"key": "value"} (for POST/PUT/PATCH)'
            value={customData}
            onChange={(e) => setCustomData(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <button
            onClick={testCustomEndpoint}
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded"
          >
            Test
          </button>
        </div>
      </div>

      {/* Change Password Test */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Test Change Password</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <input
            type="password"
            placeholder="Current Password"
            value={changePasswordData.currentPassword}
            onChange={(e) => setChangePasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
            className="border rounded px-3 py-2"
          />
          <input
            type="password"
            placeholder="New Password"
            value={changePasswordData.newPassword}
            onChange={(e) => setChangePasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
            className="border rounded px-3 py-2"
          />
          <button
            onClick={testChangePassword}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded"
          >
            Test Change Password
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-3">Test Results</h3>
        {testResults.length === 0 ? (
          <p className="text-gray-500">No tests run yet. Click "Test All APIs" to start.</p>
        ) : (
          <div className="space-y-2">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-3 rounded ${
                  result.type === 'success' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}
              >
                {result.message}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-blue-800">Instructions</h3>
        <ul className="text-blue-700 space-y-1 text-sm">
          <li>• Click "Test All APIs" to test all backend endpoints</li>
          <li>• Use "Test Custom Endpoint" to test specific endpoints</li>
          <li>• Check the browser console for detailed API responses</li>
          <li>• Make sure your backend server is running on port 5000</li>
          <li>• The backend should be accessible at http://localhost:5000</li>
        </ul>
      </div>
    </div>
  );
};

export default APITest; 