import React, { useState, useEffect } from 'react';

import NotificationPanel from '../components/NotificationPanel';

import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users,
  MapPin, 
  Phone, 
  Navigation, 
  Filter, 
  Search, 
  MoreVertical, 
  Edit3, 
  Save, 
  X, 
  Calendar, 
  User, 
  Car, 
  Wrench, 
  Battery, 
  Fuel, 
  Activity, 
  Eye, 
  MessageSquare,
  Plus,
  Download,
  RefreshCw,
  Settings,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  Truck,
  TrendingUp,
  LogOut,
  ChevronRight,
  BarChart3,
  Map,
  UserCheck,
  Menu,
  Home
} from 'lucide-react';

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

// Navigation helper function
const navigateToPage = (path) => {
  // In a real application, you would use React Router or Next.js router
  // For demonstration purposes, we'll use window.location
  if (typeof window !== 'undefined') {
    window.location.href = path;
  }
};

// Sidebar component (same as dashboard)
const Sidebar = ({ activeSection, setActiveSection, darkMode, switchSection, onNewRequest, onExportData }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard', badge: null, path: '/pages/breakdownadmindashboard' },
    { id: 'requests', icon: AlertTriangle, label: 'Requests', path: null },
    { id: 'drivers', icon: Users, label: 'Drivers', path: '/pages/drivermanagement' },
    { id: 'map', icon: Map, label: 'Live Map', badge: null, path: null },
    { id: 'fleet', icon: Truck, label: 'Fleet', badge: null, path: null },
    { id: 'profil', icon: UserCheck, label: 'Profil', badge: null, path: null },
    { id: 'setting', icon: Settings, label: 'Settings', badge: null, path: null },
  ];

  const handleMenuClick = (item) => {
    // Set active section for all items
    setActiveSection(item.id);
    
    if (item.path) {
      // Navigate to external route
      navigateToPage(item.path);
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

        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="mt-8">
            <p className={`px-3 text-xs font-medium ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            } uppercase tracking-wider mb-3`}>
              Quick Actions
            </p>
            <div className="space-y-1">
              <button onClick={onNewRequest} className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                darkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-700 hover:bg-gray-100'
              }`}>
                <Plus className="w-5 h-5 mr-3" />
                New Request
              </button>
              <button onClick={onExportData} className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                darkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-700 hover:bg-gray-100'
              }`}>
                <Download className="w-5 h-5 mr-3" />
                Export Data
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

// Header component
const RequestsHeader = ({ darkMode, setDarkMode, searchQuery, setSearchQuery, lastRefresh, onOpenNotifications }) => {
  const handleLogout = () => {
    navigateToPage('/authentication/sign-in');
  };
  let displayName = 'Admin';
  let avatarImage = null;
  let currentLanguage = 'en';
  try {
    const storedProfile = localStorage.getItem('profileData');
    if (storedProfile) {
      const parsed = JSON.parse(storedProfile);
      if (parsed && parsed.name) displayName = parsed.name;
    }
    const storedImg = localStorage.getItem('profileImage');
    if (storedImg) avatarImage = storedImg;
    const appSettings = localStorage.getItem('appSettings');
    if (appSettings) {
      const parsed = JSON.parse(appSettings);
      currentLanguage = parsed?.appearance?.language || 'en';
    }
  } catch {}

  const t = (key) => {
    const dict = {
      en: { title: 'Requests Management', subtitle: 'Monitor and manage all breakdown assistance requests', supervisor: 'Supervisor', logout: 'Logout', search: 'Search...' },
      fr: { title: 'Gestion des demandes', subtitle: 'Suivre et gérer toutes les demandes', supervisor: 'Superviseur', logout: 'Déconnexion', search: 'Rechercher...' },
      ar: { title: 'إدارة الطلبات', subtitle: 'مراقبة وإدارة جميع طلبات المساعدة', supervisor: 'مشرف', logout: 'تسجيل الخروج', search: 'بحث...' }
    };
    return (dict[currentLanguage] || dict.en)[key] || key;
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
              {t('title')}
            </h2>
            <p className={`text-sm ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {t('subtitle')}
            </p>
          </div>
          
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg" style={{
            backgroundColor: darkMode ? colors.darkest : colors.light,
            border: `1px solid ${darkMode ? colors.dark : colors.accent}`
          }}>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-medium text-green-500">Live</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className={`w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`} />
            <input
              type="text"
              placeholder={t('search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-64 pl-10 pr-4 py-2 border rounded-lg text-sm ${
                darkMode 
                  ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                  : 'bg-white border-gray-300 text-slate-900 placeholder-slate-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
          </div>
          
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
                3
              </span>
            </button>
          </div>
          
          {/* Profile */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className={`text-sm font-medium ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>{displayName}</p>
              <p className={`text-xs ${
                darkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>{t('supervisor')}</p>
            </div>
            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center text-white text-sm font-medium" style={{
              backgroundColor: colors.dark
            }}>
              {avatarImage ? (
                <img src={avatarImage} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                displayName.split(' ').map(n => n[0]).join('')
              )}
            </div>
            
            {/* Logout Button */}
            <button 
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-300/20" 
              style={{ backgroundColor: colors.dark }}
            > 
              {t('logout')}
            </button>
          </div>
        </div>
      </div>
      
      <div className="px-6 pb-3">
        <p className={`text-xs ${
          darkMode ? 'text-slate-400' : 'text-slate-500'
        }`}>
          Last updated: {lastRefresh.toLocaleTimeString()} • 24 Drivers Online • 8 Active Requests
        </p>
      </div>
    </div>
  );
};

// Quick Actions Modal Component
const QuickActionsModal = ({ darkMode, requests, setRequests, availableDrivers }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');
  const [bulkRequests, setBulkRequests] = useState([]);

  const quickActions = [
    {
      id: 'assign_bulk',
      title: 'Bulk Assign Driver',
      description: 'Assign a driver to multiple pending requests',
      icon: Users,
      color: '#3B82F6'
    },
    {
      id: 'export_report',
      title: 'Export Report',
      description: 'Generate detailed report of selected requests',
      icon: Download,
      color: '#10B981'
    }
  ];

  const handleQuickAction = (actionId) => {
    setSelectedAction(actionId);
    if (actionId === 'assign_bulk') {
      setBulkRequests(requests.filter(r => r.status === 'pending' || r.status === 'urgent'));
    }
    setIsOpen(true);
  };

  const executeBulkAssign = () => {
    if (!selectedDriver) return;
    
    setRequests(prev => prev.map(request => 
      bulkRequests.some(br => br.id === request.id)
        ? { ...request, status: 'assigned', assignedDriver: selectedDriver }
        : request
    ));
    
    setIsOpen(false);
    setSelectedDriver('');
    setBulkRequests([]);
  };

  return (
    <>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${
            darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
          } border rounded-2xl max-w-md w-full p-6 transform transition-all duration-200`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Quick Actions
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-gray-100 text-slate-500'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedAction === 'assign_bulk' ? (
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Select Driver
                  </label>
                  <select
                    value={selectedDriver}
                    onChange={(e) => setSelectedDriver(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      darkMode 
                        ? 'bg-slate-700 border-slate-600 text-white' 
                        : 'bg-white border-gray-300 text-slate-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="">Choose a driver</option>
                    {availableDrivers.map(driver => (
                      <option key={driver} value={driver}>
                        {driver}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Requests to Assign ({bulkRequests.length})
                  </label>
                  <div className={`max-h-40 overflow-y-auto border rounded-lg p-2 ${
                    darkMode ? 'border-slate-600 bg-slate-700' : 'border-gray-300 bg-gray-50'
                  }`}>
                    {bulkRequests.map(request => (
                      <div key={request.id} className="flex items-center justify-between py-1">
                        <span className={`text-sm ${
                          darkMode ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          {request.customer} - {request.type}
                        </span>
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full text-white" style={{
                          backgroundColor: request.status === 'urgent' ? '#FFFFF' : '#F59E0B'
                        }}>
                          {request.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={executeBulkAssign}
                    disabled={!selectedDriver}
                    className="flex-1 px-4 py-2 text-white rounded-lg font-medium transition-opacity disabled:opacity-50"
                    style={{ backgroundColor: colors.dark }}
                  >
                    Assign to {selectedDriver || 'Driver'}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      darkMode 
                        ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' 
                        : 'bg-gray-200 text-slate-700 hover:bg-gray-300'
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {quickActions.map(action => (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action.id)}
                    className={`w-full p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                      darkMode 
                        ? 'border-slate-600 hover:bg-slate-700' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                        style={{ backgroundColor: action.color }}
                      >
                        <action.icon className="w-5 h-5" />
                      </div>
                      <div className="text-left flex-1">
                        <h4 className={`font-medium ${
                          darkMode ? 'text-white' : 'text-slate-900'
                        }`}>
                          {action.title}
                        </h4>
                        <p className={`text-sm ${
                          darkMode ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const RequestsManagement = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [editingRequest, setEditingRequest] = useState(null);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('time');
  const [sortOrder, setSortOrder] = useState('desc');
  const [activeSection, setActiveSection] = useState('requests');
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);

  const exportRequestsToFile = () => {
    try {
      const dataStr = JSON.stringify(requests, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `requests_${new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert('Failed to export data');
    }
  };

  // Handle cross-page quick action flags
  useEffect(() => {
    try {
      const shouldOpen = localStorage.getItem('openNewRequest');
      if (shouldOpen === 'true') {
        setIsNewRequestOpen(true);
        localStorage.removeItem('openNewRequest');
      }
      const shouldExport = localStorage.getItem('exportRequests');
      if (shouldExport === 'true') {
        exportRequestsToFile();
        localStorage.removeItem('exportRequests');
      }
    } catch {}
  }, []);
  
  // Load theme from settings and sync on changes
  useEffect(() => {
    try {
      const stored = localStorage.getItem('appSettings');
      if (stored) {
        const parsed = JSON.parse(stored);
        const theme = parsed?.appearance?.theme || 'auto';
        if (theme === 'auto') {
          const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
          setDarkMode(prefersDark);
        } else {
          setDarkMode(theme === 'dark');
        }
      }
    } catch {}
    const onStorage = (e) => {
      if (e.key === 'appSettings' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          const theme = parsed?.appearance?.theme || 'auto';
          if (theme === 'auto') {
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            setDarkMode(prefersDark);
          } else {
            setDarkMode(theme === 'dark');
          }
        } catch {}
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const [requests, setRequests] = useState([
    {
      id: 1,
      customer: 'Ahmed Hassan',
      phone: '+212 666-123-456',
      location: 'Highway A7, Km 45',
      coordinates: { lat: 35.7595, lng: -5.8340 },
      time: '2 min ago',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      status: 'urgent',
      priority: 'high',
      type: 'Engine Failure',
      description: 'Vehicle completely stopped, engine making strange noises',
      estimatedCost: 450,
      assignedDriver: null,
      vehicleInfo: {
        make: 'Toyota',
        model: 'Camry',
        year: 2019,
        plate: '12345-A-67'
      }
    },
    {
      id: 2,
      customer: 'Sara Benali',
      phone: '+212 661-789-012',
      location: 'Tangier Marina',
      coordinates: { lat: 35.7743, lng: -5.8058 },
      time: '15 min ago',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      status: 'pending',
      priority: 'medium',
      type: 'Flat Tire',
      description: 'Front left tire punctured, spare tire available',
      estimatedCost: 120,
      assignedDriver: null,
      vehicleInfo: {
        make: 'Renault',
        model: 'Clio',
        year: 2020,
        plate: '67890-B-12'
      }
    },
    {
      id: 3,
      customer: 'Omar Zaidi',
      phone: '+212 662-345-678',
      location: 'Industrial Zone',
      coordinates: { lat: 35.7489, lng: -5.8364 },
      time: '28 min ago',
      timestamp: new Date(Date.now() - 28 * 60 * 1000),
      status: 'assigned',
      priority: 'medium',
      type: 'Battery Dead',
      description: 'Vehicle won\'t start, battery completely drained',
      estimatedCost: 200,
      assignedDriver: 'Youssef Benjelloun',
      vehicleInfo: {
        make: 'Peugeot',
        model: '308',
        year: 2018,
        plate: '11111-C-22'
      }
    },
    {
      id: 4,
      customer: 'Fatima Alami',
      phone: '+212 663-901-234',
      location: 'City Center',
      coordinates: { lat: 35.7667, lng: -5.8000 },
      time: '45 min ago',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      status: 'completed',
      priority: 'low',
      type: 'Fuel Empty',
      description: 'Ran out of fuel, customer needs emergency refueling',
      estimatedCost: 80,
      assignedDriver: 'Rachid Amrani',
      vehicleInfo: {
        make: 'Dacia',
        model: 'Sandero',
        year: 2021,
        plate: '55555-D-33'
      }
    },
    {
      id: 5,
      customer: 'Khalid Mansouri',
      phone: '+212 664-567-890',
      location: 'Airport Road',
      coordinates: { lat: 35.7269, lng: -5.9269 },
      time: '1 hour ago',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      status: 'in_progress',
      priority: 'high',
      type: 'Overheating',
      description: 'Engine overheating, coolant leak suspected',
      estimatedCost: 350,
      assignedDriver: 'Karim Tahiri',
      vehicleInfo: {
        make: 'Ford',
        model: 'Focus',
        year: 2017,
        plate: '99999-E-44'
      }
    }
  ]);

  const availableDrivers = [
    'Youssef Benjelloun',
    'Rachid Amrani', 
    'Karim Tahiri',
    'Hassan Mokhtar',
    'Ahmed Benjelloun',
    'Said Alaoui'
  ];

  const statusOptions = [
    { value: 'urgent', label: 'Urgent', color: '#EF4444' },
    { value: 'pending', label: 'Pending', color: '#F59E0B' },
    { value: 'assigned', label: 'Assigned', color: '#3B82F6' },
    { value: 'in_progress', label: 'In Progress', color: '#8B5CF6' },
    { value: 'completed', label: 'Completed', color: '#10B981' },
    { value: 'cancelled', label: 'Cancelled', color: '#6B7280' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low', color: '#10B981' },
    { value: 'medium', label: 'Medium', color: '#F59E0B' },
    { value: 'high', label: 'High', color: '#EF4444' }
  ];

  const getStatusColor = (status) => {
    const statusOption = statusOptions.find(s => s.value === status);
    return statusOption ? statusOption.color : '#6B7280';
  };

  const getPriorityColor = (priority) => {
    const priorityOption = priorityOptions.find(p => p.value === priority);
    return priorityOption ? priorityOption.color : '#6B7280';
  };

  const getTypeIcon = (type) => {
    const icons = {
      'Engine Failure': Wrench,
      'Flat Tire': Car,
      'Battery Dead': Battery,
      'Fuel Empty': Fuel,
      'Overheating': Activity,
    };
    return icons[type] || Wrench;
  };

  const updateRequestStatus = (requestId, newStatus, assignedDriver = null) => {
    setRequests(prev => prev.map(request => 
      request.id === requestId 
        ? { ...request, status: newStatus, assignedDriver } 
        : request
    ));
    setEditingRequest(null);
  };

  const switchSection = (section) => {
    setActiveSection(section);
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'time':
        aValue = a.timestamp;
        bValue = b.timestamp;
        break;
      case 'customer':
        aValue = a.customer;
        bValue = b.customer;
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      case 'priority':
        aValue = a.priority;
        bValue = b.priority;
        break;
      default:
        return 0;
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Stats calculation
  const stats = {
    total: requests.length,
    urgent: requests.filter(r => r.status === 'urgent').length,
    pending: requests.filter(r => r.status === 'pending').length,
    inProgress: requests.filter(r => r.status === 'in_progress').length,
    completed: requests.filter(r => r.status === 'completed').length
  };

  return (
    <>
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode ? 'bg-slate-900' : 'bg-gray-50'
    }`}>
      <div className="flex">
        <Sidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          darkMode={darkMode}
          switchSection={switchSection}
          onNewRequest={() => setIsNewRequestOpen(true)}
          onExportData={exportRequestsToFile}
        />
        
        <div className="flex-1">
          <RequestsHeader 
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            lastRefresh={lastRefresh}
            onOpenNotifications={() => setIsNotificationPanelOpen(true)}
          />
          
          <div className="p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <div className={`${
                darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
              } rounded-lg border p-4`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${
                      darkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}>Total</p>
                    <p className={`text-2xl font-bold ${
                      darkMode ? 'text-white' : 'text-slate-900'
                    }`}>{stats.total}</p>
                  </div>
                  <AlertTriangle className={`w-8 h-8 ${
                    darkMode ? 'text-slate-400' : 'text-slate-500'
                  }`} />
                </div>
              </div>
              
              <div className={`${
                darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
              } rounded-lg border p-4`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-600">Urgent</p>
                    <p className="text-2xl font-bold text-red-600">{stats.urgent}</p>
                  </div>
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                </div>
              </div>
              
              <div className={`${
                darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
              } rounded-lg border p-4`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">Pending</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
                  </div>
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
              </div>
              
              <div className={`${
                darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
              } rounded-lg border p-4`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">In Progress</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.inProgress}</p>
                  </div>
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </div>
              
              <div className={`${
                darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
              } rounded-lg border p-4`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Completed</p>
                    <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                  </div>
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className={`${
              darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
            } rounded-lg border p-6 mb-6`}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4 flex-1">
                  {/* Status Filter */}
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className={`px-3 py-2 border rounded-lg text-sm ${
                      darkMode 
                        ? 'bg-slate-700 border-slate-600 text-white' 
                        : 'bg-white border-gray-300 text-slate-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="all">All Status</option>
                    {statusOptions.map(status => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                  
                  {/* Priority Filter */}
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className={`px-3 py-2 border rounded-lg text-sm ${
                      darkMode 
                        ? 'bg-slate-700 border-slate-600 text-white' 
                        : 'bg-white border-gray-300 text-slate-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="all">All Priority</option>
                    {priorityOptions.map(priority => (
                      <option key={priority.value} value={priority.value}>
                        {priority.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <select
                    value={`${sortBy}-${sortOrder}`}
                    onChange={(e) => {
                      const [field, order] = e.target.value.split('-');
                      setSortBy(field);
                      setSortOrder(order);
                    }}
                    className={`px-3 py-2 border rounded-lg text-sm ${
                      darkMode 
                        ? 'bg-slate-700 border-slate-600 text-white' 
                        : 'bg-white border-gray-300 text-slate-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="time-desc">Newest First</option>
                    <option value="time-asc">Oldest First</option>
                    <option value="customer-asc">Customer A-Z</option>
                    <option value="customer-desc">Customer Z-A</option>
                    <option value="status-asc">Status A-Z</option>
                    <option value="priority-desc">High Priority First</option>
                  </select>
                  
                  <button className={`p-2 rounded-lg transition-colors ${
                    darkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-gray-100 text-slate-500'
                  }`}>
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Requests Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedRequests.map((request) => {
                const TypeIcon = getTypeIcon(request.type);
                const isEditing = editingRequest === request.id;
                
                return (
                  <div key={request.id} className={`${
                    darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
                  } border rounded-xl p-6 transition-all duration-200 hover:shadow-lg`}>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{
                          backgroundColor: getStatusColor(request.status)
                        }}>
                          <TypeIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className={`font-semibold ${
                            darkMode ? 'text-white' : 'text-slate-900'
                          }`}>
                            {request.customer}
                          </h3>
                          <p className={`text-sm ${
                            darkMode ? 'text-slate-400' : 'text-slate-500'
                          }`}>
                            ID: #{request.id.toString().padStart(4, '0')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 text-xs font-medium rounded-full text-white capitalize" style={{
                          backgroundColor: getPriorityColor(request.priority)
                        }}>
                          {request.priority}
                        </span>
                        <button
                          onClick={() => setEditingRequest(isEditing ? null : request.id)}
                          className={`p-1 rounded transition-colors ${
                            darkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-gray-100 text-slate-500'
                          }`}
                        >
                          {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Request Info */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className={`w-4 h-4 ${
                          darkMode ? 'text-slate-400' : 'text-slate-500'
                        }`} />
                        <span className={`text-sm ${
                          darkMode ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          {request.location}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Phone className={`w-4 h-4 ${
                          darkMode ? 'text-slate-400' : 'text-slate-500'
                        }`} />
                        <span className={`text-sm ${
                          darkMode ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          {request.phone}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Car className={`w-4 h-4 ${
                          darkMode ? 'text-slate-400' : 'text-slate-500'
                        }`} />
                        <span className={`text-sm ${
                          darkMode ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          {request.vehicleInfo.make} {request.vehicleInfo.model} ({request.vehicleInfo.year})
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className={`w-4 h-4 ${
                          darkMode ? 'text-slate-400' : 'text-slate-500'
                        }`} />
                        <span className={`text-sm ${
                          darkMode ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          {request.time}
                        </span>
                      </div>
                    </div>

                    {/* Problem Description */}
                    <div className={`p-3 rounded-lg mb-4 ${
                      darkMode ? 'bg-slate-700/50' : 'bg-gray-50'
                    }`}>
                      <h4 className={`text-sm font-medium mb-1 ${
                        darkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                        {request.type}
                      </h4>
                      <p className={`text-sm ${
                        darkMode ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {request.description}
                      </p>
                      <p className={`text-sm font-medium mt-2 ${
                        darkMode ? 'text-green-400' : 'text-green-600'
                      }`}>
                        Est. Cost: ${request.estimatedCost}
                      </p>
                    </div>

                    {/* Status Management */}
                    {isEditing ? (
                      <div className="space-y-3">
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${
                            darkMode ? 'text-slate-300' : 'text-slate-700'
                          }`}>
                            Status
                          </label>
                          <select
                            defaultValue={request.status}
                            className={`w-full px-3 py-2 border rounded-lg text-sm ${
                              darkMode 
                                ? 'bg-slate-700 border-slate-600 text-white' 
                                : 'bg-white border-gray-300 text-slate-900'
                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            onChange={(e) => {
                              const newStatus = e.target.value;
                              updateRequestStatus(request.id, newStatus);
                            }}
                          >
                            {statusOptions.map(status => (
                              <option key={status.value} value={status.value}>
                                {status.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        {(request.status === 'assigned' || request.status === 'in_progress') && (
                          <div>
                            <label className={`block text-sm font-medium mb-1 ${
                              darkMode ? 'text-slate-300' : 'text-slate-700'
                            }`}>
                              Assign Driver
                            </label>
                            <select
                              defaultValue={request.assignedDriver || ''}
                              className={`w-full px-3 py-2 border rounded-lg text-sm ${
                                darkMode 
                                  ? 'bg-slate-700 border-slate-600 text-white' 
                                  : 'bg-white border-gray-300 text-slate-900'
                              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                              onChange={(e) => {
                                updateRequestStatus(request.id, request.status, e.target.value);
                              }}
                            >
                              <option value="">Select Driver</option>
                              {availableDrivers.map(driver => (
                                <option key={driver} value={driver}>
                                  {driver}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="px-3 py-1 text-sm font-medium rounded-full text-white capitalize" style={{
                            backgroundColor: getStatusColor(request.status)
                          }}>
                            {request.status.replace('_', ' ')}
                          </span>
                          {request.assignedDriver && (
                            <div className="flex items-center space-x-1">
                              <User className={`w-3 h-3 ${
                                darkMode ? 'text-slate-400' : 'text-slate-500'
                              }`} />
                              <span className={`text-xs ${
                                darkMode ? 'text-slate-400' : 'text-slate-500'
                              }`}>
                                {request.assignedDriver}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <button className="p-1.5 rounded text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                            <Phone className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 rounded text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                            <Navigation className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 rounded text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Empty State */}
            {sortedRequests.length === 0 && (
              <div className={`${
                darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
              } border rounded-xl p-12 text-center`}>
                <AlertTriangle className={`w-16 h-16 mx-auto mb-4 ${
                  darkMode ? 'text-slate-400' : 'text-slate-400'
                }`} />
                <h3 className={`text-lg font-semibold mb-2 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  No requests found
                </h3>
                <p className={`text-sm ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                } mb-6`}>
                  Try adjusting your search criteria or filters
                </p>
                <button className="px-4 py-2 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity" style={{
                  backgroundColor: colors.dark
                }}>
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedRequests.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className={`${
            darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
          } border rounded-xl shadow-lg p-4 flex items-center space-x-4`}>
            <span className={`text-sm font-medium ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {selectedRequests.length} selected
            </span>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
                Assign Driver
              </button>
              <button className="px-3 py-1.5 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors">
                Mark Complete
              </button>
              <button className="px-3 py-1.5 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors">
                Cancel
              </button>
            </div>
            <button
              onClick={() => setSelectedRequests([])}
              className={`p-1 rounded transition-colors ${
                darkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-gray-100 text-slate-500'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions Modal */}
      <QuickActionsModal 
        darkMode={darkMode}
        requests={requests}
        setRequests={setRequests}
        availableDrivers={availableDrivers}
      />

      {/* New Request Modal */}
      {isNewRequestOpen && (
        <NewRequestModal 
          darkMode={darkMode}
          onClose={() => setIsNewRequestOpen(false)}
          onSubmit={(form) => {
            const newId = Math.max(0, ...requests.map(r => r.id || 0)) + 1;
            const now = new Date();
            const newReq = {
              id: newId,
              customer: form.customer,
              phone: form.phone,
              location: form.location,
              coordinates: { lat: 0, lng: 0 },
              time: 'now',
              timestamp: now,
              status: form.status || 'pending',
              priority: form.priority || 'medium',
              type: form.type || 'Engine Failure',
              description: form.description || '',
              estimatedCost: form.estimatedCost ? Number(form.estimatedCost) : 0,
              assignedDriver: null,
              vehicleInfo: {
                make: form.vehicleMake || '',
                model: form.vehicleModel || '',
                year: form.vehicleYear ? Number(form.vehicleYear) : undefined,
                plate: form.vehiclePlate || ''
              }
            };
            setRequests([newReq, ...requests]);
            setIsNewRequestOpen(false);
          }}
        />
      )}

      
    </div>
    {/* Notification Panel */}
    <NotificationPanel 
      isOpen={isNotificationPanelOpen}
      onClose={() => setIsNotificationPanelOpen(false)}
      darkMode={darkMode}
    />
    </>
  );
};

// Simple New Request Modal
const NewRequestModal = ({ darkMode, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    customer: '',
    phone: '',
    location: '',
    type: 'Engine Failure',
    priority: 'medium',
    description: '',
    estimatedCost: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    vehiclePlate: '',
    status: 'pending'
  });
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl shadow-xl w-full max-w-xl`}>
        <div className="flex items-center justify-between p-4 border-b ${darkMode ? 'border-slate-700' : 'border-gray-200'}">
          <h3 className={`${darkMode ? 'text-white' : 'text-slate-900'} text-lg font-semibold`}>New Request</h3>
          <button onClick={onClose} className={`p-2 rounded ${darkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-gray-100 text-slate-500'}`}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'customer', label: 'Customer' },
            { key: 'phone', label: 'Phone' },
            { key: 'location', label: 'Location' },
            { key: 'vehicleMake', label: 'Vehicle Make' },
            { key: 'vehicleModel', label: 'Vehicle Model' },
            { key: 'vehicleYear', label: 'Vehicle Year' },
            { key: 'vehiclePlate', label: 'Vehicle Plate' }
          ].map(f => (
            <div key={f.key}>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{f.label}</label>
              <input
                type="text"
                value={form[f.key]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                className={`w-full px-3 py-2 border rounded ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300 text-slate-900'}`}
              />
            </div>
          ))}
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Type</label>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={`w-full px-3 py-2 border rounded ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300 text-slate-900'}`}>
              <option>Engine Failure</option>
              <option>Flat Tire</option>
              <option>Battery Dead</option>
              <option>Fuel Empty</option>
              <option>Overheating</option>
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Priority</label>
            <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className={`w-full px-3 py-2 border rounded ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300 text-slate-900'}`}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Estimated Cost</label>
            <input type="number" value={form.estimatedCost} onChange={(e) => setForm({ ...form, estimatedCost: e.target.value })} className={`w-full px-3 py-2 border rounded ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300 text-slate-900'}`} />
          </div>
          <div className="md:col-span-2">
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`w-full px-3 py-2 border rounded ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300 text-slate-900'}`}/>
          </div>
        </div>
        <div className="p-4 flex items-center justify-end space-x-3 border-t ${darkMode ? 'border-slate-700' : 'border-gray-200'}">
          <button onClick={onClose} className={`px-4 py-2 rounded ${darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-gray-200 text-slate-700 hover:bg-gray-300'}`}>Cancel</button>
          <button onClick={() => onSubmit(form)} className="px-4 py-2 rounded text-white" style={{ backgroundColor: colors.dark }}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default RequestsManagement;