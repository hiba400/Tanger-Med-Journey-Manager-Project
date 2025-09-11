# 🔗 API Integration & Change Password Feature

## 📋 Overview

This project now includes a complete API integration using **fetch** instead of axios, and a new **change password** feature for administrators.

## 🚀 Features Added

### 1. API Integration with Fetch
- **File**: `src/services/apiFetch.js`
- **Purpose**: Replaces axios with native fetch API
- **Benefits**: No external dependencies, better browser support, smaller bundle size

### 2. Change Password Functionality
- **Backend Route**: `PATCH /admin/change-password`
- **Frontend Component**: `src/components/ChangePassword.jsx`
- **API Method**: `adminAPI.changePassword(currentPassword, newPassword)`

### 3. API Testing Tools
- **Component**: `src/components/APITest.js`
- **Service**: `src/services/apiTest.js`
- **Purpose**: Test all API endpoints and the new change password feature

## 🔧 Backend Changes

### New Route Added
```javascript
// PATCH /admin/change-password
router.patch('/change-password', authenticateAdmin, async (req, res) => {
  // Validates current password
  // Updates to new password
  // Works with both MongoDB and in-memory DB
});
```

### Features
- ✅ Protected route (requires authentication)
- ✅ Current password verification
- ✅ New password validation (min 6 characters)
- ✅ MongoDB and in-memory DB support
- ✅ Error handling and validation

## 🎨 Frontend Changes

### New Components
1. **ChangePassword.jsx**
   - Form with current password, new password, and confirmation
   - Real-time validation
   - Success/error messages
   - Password requirements display

2. **APITest.js** (Enhanced)
   - Test all API endpoints
   - Test custom endpoints
   - **NEW**: Test change password functionality

### API Service Updates
- **apiFetch.js**: Complete rewrite using fetch
- **apiTest.js**: Added change password testing

## 🧪 How to Test

### 1. Start Backend
```bash
cd backend
npm start
```

### 2. Start Frontend
```bash
cd frontend
npm start
```

### 3. Test API Connection
- Navigate to the APITest component
- Click "Test All APIs" to verify backend connectivity
- Use "Test Custom Endpoint" for specific testing

### 4. Test Change Password
- Use the "Test Change Password" section in APITest
- Enter current and new passwords
- Verify the API call works correctly

### 5. Use Change Password Component
- Import and use `<ChangePassword />` in your app
- Requires user to be logged in (has auth token)

## 📁 File Structure

```
frontend/src/
├── components/
│   ├── APITest.js          # Enhanced API testing component
│   └── ChangePassword.jsx  # New password change component
├── services/
│   ├── apiFetch.js         # New fetch-based API service
│   └── apiTest.js          # Enhanced API testing service
└── ...

backend/
├── routes/
│   └── Admin.js            # Added change-password route
└── ...
```

## 🔐 Security Features

- **Authentication Required**: Change password route is protected
- **Current Password Verification**: Must know current password
- **Password Validation**: Minimum 6 characters
- **Token-based Auth**: Uses Bearer token from localStorage/sessionStorage

## 🚨 Error Handling

- **400**: Missing or invalid data
- **401**: Unauthorized (wrong current password or no token)
- **404**: Admin not found
- **500**: Server errors

## 💡 Usage Examples

### In React Component
```javascript
import { adminAPI } from '../services/apiFetch.js';

// Change password
try {
  const result = await adminAPI.changePassword('oldPass', 'newPass123');
  console.log('Password changed:', result.message);
} catch (error) {
  console.error('Failed:', error.message);
}
```

### Test Specific Endpoint
```javascript
import { testEndpoint } from '../services/apiTest.js';

// Test any endpoint
const result = await testEndpoint('/admin/change-password', 'PATCH', {
  currentPassword: 'old',
  newPassword: 'new123'
});
```

## 🔄 Migration from Axios

The new `apiFetch.js` provides the same interface as the old axios-based service:

- ✅ Same method names
- ✅ Same parameters
- ✅ Same return format
- ✅ Enhanced error handling
- ✅ Better performance (no external library)

## 🎯 Next Steps

1. **Test the integration** using the APITest component
2. **Integrate ChangePassword** into your main app
3. **Customize styling** to match your design system
4. **Add password strength requirements** if needed
5. **Implement password reset** functionality

## 🐛 Troubleshooting

### Common Issues
1. **Port 5000 in use**: Kill existing Node processes
2. **CORS errors**: Backend must be running and accessible
3. **Auth errors**: Check if user is logged in and token is valid

### Debug Mode
- Check browser console for detailed API logs
- Use APITest component to verify endpoints
- Verify backend server is running on port 5000

---

**Note**: This implementation maintains backward compatibility while adding new features. Your existing code should continue to work without changes. 