import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import NotificationPanel from '../components/NotificationPanel';

import { 
  Bell,
  Moon,
  Sun,
  Edit,
  Save,
  Camera,
  Key,
  Eye,
  EyeOff,
  BarChart3,
  AlertTriangle,
  Users,
  Map,
  TrendingUp,
  Truck,
  UserCheck,
  Settings,
  ChevronRight
} from 'lucide-react';

// Navigation helper function
const NavigateToPage = ({ path }) => {
  const navigate = useNavigate();
  
  React.useEffect(() => {
    navigate(path);
  }, [navigate, path]);
  
  return null;
};

// Professional color palette
const colors = {
  primary: '#A3C5F1',
  secondary: '#B3A2CD', 
  accent: '#6582AA',
  dark: '#4B6387',
  darker: '#334663',
  darkest: '#1E2B40',
  light: '#F8FAFC',
  gray: '#64748B'
};

// Layout Components
const DashboardLayout = ({ children, darkMode }) => {
  return (
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode 
        ? 'bg-slate-900' 
        : 'bg-gray-50'
    }`}>
      {children}
    </div>
  );
};

const DashboardNavbar = ({ darkMode, setDarkMode, admin, onOpenNotifications, displayName, avatarImage }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/authentication/sign-in');
  };

  return (
    <div className={`${
      darkMode 
        ? 'bg-slate-800 border-slate-700' 
        : 'bg-white border-gray-200'
    } shadow-sm border-b sticky top-0 z-40`}>
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <div>
            <h2 className={`text-xl font-semibold ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Profile Management
            </h2>
            <p className={`text-sm ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Admin Profile & Settings
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
                  : 'hover:bg-gray-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button onClick={onOpenNotifications} className={`p-2 rounded-lg transition-colors relative ${
              darkMode 
                ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
                : 'hover:bg-gray-100 text-slate-600 hover:text-slate-900'
            }`}>
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                2
              </span>
            </button>
          </div>
          
          {/* Profile */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className={`text-sm font-medium ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>{displayName || (admin ? admin.name : 'Admin')}</p>
              <p className={`text-xs ${
                darkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center text-white text-sm font-medium" style={{
              backgroundColor: colors.dark
            }}>
              {avatarImage ? (
                <img src={avatarImage} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                (displayName || (admin ? admin.name : 'AD')).split(' ').map(n => n[0]).join('').toUpperCase()
              )}
            </div>
            
            {/* Logout Button */}
            <button 
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-300/20" 
              style={{ backgroundColor: colors.dark }}
            > 
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ activeSection, setActiveSection, darkMode, switchSection }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  
  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard', badge: null, path: '/pages/breakdownadmindashboard' },
    { id: 'requests', icon: AlertTriangle, label: 'Requests', badge: '8', path: '/pages/requestManagement' },
    { id: 'drivers', icon: Users, label: 'Drivers', badge: '24', path: '/pages/driverManagement' },
    { id: 'trucks', icon: Truck, label: 'Trucks', badge: '45', path: '/pages/truckManagement' },
    { id: 'map', icon: Map, label: 'Live Map', badge: null, path: '/pages/breakdownadmindashboard' },
    { id: 'profil', icon: UserCheck, label: 'Profil', badge: null, path: null },
    { id: 'setting', icon: Settings, label: 'Settings', badge: null, path: '/pages/settings' },
  ];

  const handleMenuClick = (item) => {
    // Set active section for all items
    setActiveSection(item.id);
    
    if (item.path) {
      if (item.id === 'map') {
        try { localStorage.setItem('openMapSection', 'true'); } catch {}
      }
      // Navigate to external route using React Router
      navigate(item.path);
    } else {
      // Switch to internal section
      switchSection(item.id);
    }
  };

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} ${
      darkMode 
        ? 'bg-slate-800 border-slate-700' 
        : 'bg-white border-gray-200'
    } shadow-sm border-r transition-all duration-300 h-screen sticky top-0`}>
      {/* Header */}
      <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div>
                <img 
                  src="/img/TM_logo.png" 
                  alt="Tanger Med Logo" 
                  className="w-10 h-10 object-contain transition-all duration-300 group-hover:scale-110"
                  style={{ display: 'block' }}
                />
              </div>
            {!isCollapsed && (
              <div>
                <h2 className={`text-xl font-bold ${
              darkMode ? 'text-slate-200' : 'text-slate-900'
            }`}>
              Tanger Med
            </h2>
                <p className={`text-sm ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Journey Manager
            </p>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-1 rounded ${
              darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <ChevronRight className={`w-4 h-4 transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-4 px-3">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item)}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'text-white shadow-sm' 
                  : `${darkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-700 hover:bg-gray-100'}`
              }`}
              style={activeSection === item.id ? { backgroundColor: colors.dark } : {}}
              title={isCollapsed ? item.label : ''}
            >
              <div className="flex items-center">
                <item.icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
                {!isCollapsed && <span>{item.label}</span>}
              </div>
              {!isCollapsed && item.badge && (
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  activeSection === item.id
                    ? 'bg-white/20 text-white' 
                    : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                }`}>
                  {item.badge}
                </span>
              )}
              {item.path && !isCollapsed && (
                <ChevronRight className="w-4 h-4 ml-2 opacity-50" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default function Profile() {
  const { admin } = useAuth();
  const [activeSection, setActiveSection] = useState('profil');
  const [darkMode, setDarkMode] = useState(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem('profileImage');
    if (stored) setProfileImage(stored);
    const storedProfile = localStorage.getItem('profileData');
    if (storedProfile) {
      try {
        const parsed = JSON.parse(storedProfile);
        setProfileData(prev => ({
          ...prev,
          name: parsed.name || prev.name,
          email: parsed.email || prev.email,
          phone: parsed.phone || prev.phone,
        }));
      } catch {}
    }
  }, []);

  const [profileData, setProfileData] = useState({
    name: admin ? admin.name : '',
    email: admin ? admin.email : '',
    phone: admin ? admin.phone : '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });



  const handleSave = async () => {
    try {
      console.log('Saving profile:', profileData);
      // Determine API base URL (env > origin)
      const apiBase = (process.env.REACT_APP_API_URL || (typeof window !== 'undefined' && window.location && window.location.origin.includes('localhost')
        ? 'http://localhost:5003'
        : window.location.origin));

      // If admin or admin.id is missing, skip network and do local save
      if (!admin || !admin.id) throw new Error('No admin ID; saving locally');

      // Make API call to update profile
      const response = await fetch(`${apiBase}/admin/${admin.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone
        })
      });
      
      if (response.ok) {
        setIsEditing(false);
        alert('Profile updated successfully!');
        
        // Update local admin data
        if (admin) {
          admin.name = profileData.name;
          admin.email = profileData.email;
          admin.phone = profileData.phone;
        }

        if (profileImage) {
          localStorage.setItem('profileImage', profileImage);
        }
        localStorage.setItem('profileData', JSON.stringify({
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone
        }));
      } else {
        const error = await response.json();
        alert(`Failed to update profile: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      // Offline/local fallback save
      localStorage.setItem('profileData', JSON.stringify({
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone
      }));
      if (profileImage) {
        localStorage.setItem('profileImage', profileImage);
      }
      setIsEditing(false);
      alert('Profile saved locally (offline). Changes will persist in this browser.');
    }
  };

  const handlePasswordChange = async () => {
    // Validation
    if (!profileData.currentPassword || !profileData.newPassword || !profileData.confirmPassword) {
      alert('Please fill in all password fields!');
      return;
    }
    
    if (profileData.newPassword !== profileData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    if (profileData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    
    try {
      console.log('Changing password for:', admin?.email);
      const apiBase = (process.env.REACT_APP_API_URL || (typeof window !== 'undefined' && window.location && window.location.origin.includes('localhost')
        ? 'http://localhost:5003'
        : window.location.origin));
      // Make API call to change password
      const response = await fetch(`${apiBase}/admin/change-password-test`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: admin?.email || 'admin@test.com',
          currentPassword: profileData.currentPassword,
          newPassword: profileData.newPassword
        })
      });
      
      const result = await response.json();
      console.log('Password change response:', result);
      
      if (response.ok && result.success) {
        // Reset password fields
        setProfileData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
        
        alert('Password changed successfully!');
      } else {
        alert(`Password change failed: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error changing password:', error);
      alert(`Password change failed: ${error.message}`);
    }
  };

  const switchSection = async (section) => {
    console.log('Switching to section:', section);
    setActiveSection(section);
    
    // Handle specific section logic
    switch (section) {
      case 'profil':
        console.log('Profile section activated');
        break;
      case 'setting':
        console.log('Settings section activated');
        break;
      default:
        console.log('Unknown section:', section);
    }
  };

  const testBackendConnection = async () => {
    try {
      console.log('Testing backend connection...');
      const base = (process.env.REACT_APP_API_URL || (typeof window !== 'undefined' && window.location && window.location.origin.includes('localhost')
        ? 'http://localhost:5003'
        : window.location.origin));
      const response = await fetch(`${base}/`);
      const result = await response.text();
      console.log('Backend response:', result);
      alert(`Backend connected! Response: ${result}`);
    } catch (error) {
      console.error('Backend connection failed:', error);
      alert(`Backend connection failed: ${error.message}`);
    }
  };

  return (
    <>
    <DashboardLayout darkMode={darkMode}>
      <div className="flex">
        <Sidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          darkMode={darkMode}
          switchSection={switchSection}
        />
        
        <div className="flex-1">
          <DashboardNavbar 
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            admin={admin}
            onOpenNotifications={() => setIsNotificationPanelOpen(true)}
            displayName={profileData.name}
            avatarImage={profileImage}
          />
          
          <div className="p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Profile Header */}
              <div className={`${
                darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
              } rounded-lg border p-6`}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className={`text-2xl font-bold ${
                      darkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      Profile Settings
                    </h1>
                    <p className={`text-sm ${
                      darkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      Manage your account information and preferences
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (isEditing) {
                        handleSave();
                      } else {
                        setIsEditing(true);
                      }
                    }}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                      isEditing
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : darkMode 
                          ? 'bg-slate-700 text-white hover:bg-slate-600' 
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                    } transition-colors`}
                  >
                    {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                    <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
                  </button>
                </div>

                {/* Profile Picture */}
                <div className="flex items-center space-x-6 mb-8">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center text-white text-2xl font-bold" style={{
                      backgroundColor: colors.dark
                    }}>
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <span>{admin ? admin.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'AD'}</span>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files && e.target.files[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = () => {
                          if (typeof reader.result === 'string') {
                            setProfileImage(reader.result);
                          }
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                    <button onClick={() => fileInputRef.current && fileInputRef.current.click()} className="absolute -bottom-2 -right-2 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <h2 className={`text-xl font-semibold ${
                      darkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      {admin ? admin.name : 'Admin User'}
                    </h2>
                    <p className={`text-sm ${
                      darkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      Administrator • Tanger Med
                    </p>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        darkMode 
                          ? 'bg-slate-700 border-slate-600 text-white' 
                          : 'bg-white border-gray-300 text-slate-900'
                      } ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        darkMode 
                          ? 'bg-slate-700 border-slate-600 text-white' 
                          : 'bg-white border-gray-300 text-slate-900'
                      } ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        darkMode 
                          ? 'bg-slate-700 border-slate-600 text-white' 
                          : 'bg-white border-gray-300 text-slate-900'
                      } ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Role
                    </label>
                    <input
                      type="text"
                      value="Administrator"
                      disabled
                      className={`w-full px-3 py-2 border rounded-lg ${
                        darkMode 
                          ? 'bg-slate-700 border-slate-600 text-white' 
                          : 'bg-white border-gray-300 text-slate-900'
                      } opacity-50 cursor-not-allowed`}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
                    <button
                      onClick={handleSave}
                      className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>

              {/* Password Change Section */}
              <div className={`${
                darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
              } rounded-lg border p-6`}>
                <div className="flex items-center space-x-3 mb-6">
                  <Key className={`w-6 h-6 ${
                    darkMode ? 'text-slate-300' : 'text-slate-600'
                  }`} />
                  <h3 className={`text-lg font-semibold ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    Change Password
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={profileData.currentPassword}
                        onChange={(e) => setProfileData(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className={`w-full px-3 py-2 pr-10 border rounded-lg ${
                          darkMode 
                            ? 'bg-slate-700 border-slate-600 text-white' 
                            : 'bg-white border-gray-300 text-slate-900'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={profileData.newPassword}
                        onChange={(e) => setProfileData(prev => ({ ...prev, newPassword: e.target.value }))}
                        className={`w-full px-3 py-2 pr-10 border rounded-lg ${
                          darkMode 
                            ? 'bg-slate-700 border-slate-600 text-white' 
                            : 'bg-white border-gray-300 text-slate-900'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={profileData.confirmPassword}
                        onChange={(e) => setProfileData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className={`w-full px-3 py-2 pr-10 border rounded-lg ${
                          darkMode 
                            ? 'bg-slate-700 border-slate-600 text-white' 
                            : 'bg-white border-gray-300 text-slate-900'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={handlePasswordChange}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Change Password
                  </button>
                  
                  <button
                    onClick={testBackendConnection}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                  >
                    Test Backend
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
    {/* Notification Panel */}
    <NotificationPanel 
      isOpen={isNotificationPanelOpen}
      onClose={() => setIsNotificationPanelOpen(false)}
      darkMode={darkMode}
    />
    </>
  );
} 