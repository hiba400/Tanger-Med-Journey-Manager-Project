import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Car, 
  Activity, 
  Award, 
  Shield, 
  Edit, 
  Eye, 
  UserPlus, 
  Download, 
  Upload,
  Navigation,
  Battery,
  Fuel,
  Wrench,
  RefreshCw,
  X,
  Save,
  User,
  Globe,
  Building,
  Truck,
  Settings,
  Trash2,
  Check,
  BarChart3,
  Map,
  ChevronRight,
  UserCheck,
  Moon,
  Sun,
  Bell,
  Home,
  Menu,
  LogOut,
  Maximize2,
  Minimize2,
  Layers
} from 'lucide-react';

// Professional color palette (matching the dashboard)
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

const DashboardNavbar = ({ darkMode, setDarkMode, onRefresh, isLoading, lastRefresh }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleLogout = () => {
    // Handle logout functionality
    navigateToPage('/authentication/sign-in');
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
              Driver Management
            </h2>
            <p className={`text-sm ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Manage and monitor your breakdown assistance team
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
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
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
              onClick={onRefresh}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
                  : 'hover:bg-gray-100 text-slate-600 hover:text-slate-900'
              } ${isLoading ? 'animate-pulse' : ''}`}
              disabled={isLoading}
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            
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
            
            <button className={`p-2 rounded-lg transition-colors relative ${
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
              }`}>Admin</p>
              <p className={`text-xs ${
                darkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>Supervisor</p>
            </div>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-medium" style={{
              backgroundColor: colors.dark
            }}>
              AD
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
      
      <div className="px-6 pb-3">
        <p className={`text-xs ${
          darkMode ? 'text-slate-400' : 'text-slate-500'
        }`}>
          Last updated: {lastRefresh.toLocaleTimeString()} • 5 Drivers Active • 3 Available
        </p>
      </div>
    </div>
  );
};

const Sidebar = ({ activeSection, setActiveSection, darkMode, switchSection }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard', badge: null, path: '/' },
    { id: 'requests', icon: AlertTriangle, label: 'Requests', badge: '8', path: '/pages/requestmanagement' },
    { id: 'drivers', icon: Users, label: 'Drivers', badge: '24', path: null },
    { id: 'map', icon: Map, label: 'Live Map', badge: null, path: '/' },
    { id: 'analytics', icon: TrendingUp, label: 'Analytics', badge: null, path: null },
    { id: 'fleet', icon: Truck, label: 'Fleet', badge: null, path: null },
    { id: 'profil', icon: UserCheck, label: 'Profil', badge: null, path: null },
    { id: 'setting', icon: Settings, label: 'Settings', badge: null, path: null },
  ];

  const handleMenuClick = (item) => {
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
                activeSection === item.id && !item.path
                  ? 'text-white shadow-sm' 
                  : `${darkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-700 hover:bg-gray-100'}`
              }`}
              style={activeSection === item.id && !item.path ? { backgroundColor: colors.dark } : {}}
              title={isCollapsed ? item.label : ''}
            >
              <div className="flex items-center">
                <item.icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
                {!isCollapsed && <span>{item.label}</span>}
              </div>
              {!isCollapsed && item.badge && (
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  activeSection === item.id && !item.path
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
              <button className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                darkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-700 hover:bg-gray-100'
              }`}>
                <Plus className="w-5 h-5 mr-3" />
                New Driver
              </button>
              <button className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
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

// Mock driver data
const mockDrivers = [
  {
    id: 1,
    name: 'Youssef Benjelloun',
    email: 'y.benjelloun@tangermed.ma',
    phone: '+212 661 234 567',
    status: 'available',
    rating: 4.8,
    completedToday: 12,
    totalCompleted: 847,
    location: 'Zone Nord',
    joinDate: '2022-03-15',
    license: 'B123456789',
    specializations: ['Engine Repair', 'Towing'],
    vehicle: {
      type: 'Tow Truck',
      model: 'Mercedes Atego',
      plate: '12345-A-67',
      fuel: 85,
      battery: 92
    }
  },
  {
    id: 2,
    name: 'Rachid Amrani',
    email: 'r.amrani@tangermed.ma',
    phone: '+212 662 345 678',
    status: 'busy',
    rating: 4.6,
    completedToday: 8,
    totalCompleted: 623,
    location: 'En route to Highway A7',
    joinDate: '2021-07-22',
    license: 'B987654321',
    specializations: ['Battery Service', 'Tire Change'],
    vehicle: {
      type: 'Service Van',
      model: 'Ford Transit',
      plate: '98765-B-43',
      fuel: 67,
      battery: 88
    }
  },
  {
    id: 3,
    name: 'Karim Tahiri',
    email: 'k.tahiri@tangermed.ma',
    phone: '+212 663 456 789',
    status: 'available',
    rating: 4.9,
    completedToday: 15,
    totalCompleted: 1205,
    location: 'Zone Sud',
    joinDate: '2020-11-08',
    license: 'B456789123',
    specializations: ['Mechanical Repair', 'Fuel Service', 'Electrical'],
    vehicle: {
      type: 'Heavy Tow',
      model: 'Volvo FH',
      plate: '54321-C-89',
      fuel: 92,
      battery: 95
    }
  },
  {
    id: 4,
    name: 'Hassan Mokhtar',
    email: 'h.mokhtar@tangermed.ma',
    phone: '+212 664 567 890',
    status: 'offline',
    rating: 4.5,
    completedToday: 0,
    totalCompleted: 432,
    location: 'Base Station',
    joinDate: '2023-01-10',
    license: 'B789123456',
    specializations: ['Basic Service'],
    vehicle: {
      type: 'Light Service',
      model: 'Renault Master',
      plate: '11111-D-22',
      fuel: 45,
      battery: 76
    }
  },
  {
    id: 5,
    name: 'Fatima Zahra',
    email: 'f.zahra@tangermed.ma',
    phone: '+212 665 678 901',
    status: 'available',
    rating: 4.7,
    completedToday: 9,
    totalCompleted: 789,
    location: 'Industrial Zone',
    joinDate: '2021-09-12',
    license: 'B321654987',
    specializations: ['Fuel Service', 'Battery Service'],
    vehicle: {
      type: 'Service Van',
      model: 'Iveco Daily',
      plate: '33333-E-44',
      fuel: 78,
      battery: 89
    }
  }
];

const DriverManagement = ({ darkMode = false }) => {
  const [drivers, setDrivers] = useState(mockDrivers);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [editingDriver, setEditingDriver] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Filter drivers based on search and status
  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || driver.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    const colors = {
      available: '#10B981',
      busy: '#F59E0B',
      offline: '#6B7280',
    };
    return colors[status] || '#6B7280';
  };

  // Handle status update
  const handleStatusUpdate = (driverId, newStatus) => {
    setDrivers(drivers.map(driver => 
      driver.id === driverId ? { ...driver, status: newStatus } : driver
    ));
  };

  // Handle driver delete
  const handleDeleteDriver = (driverId) => {
    setDrivers(drivers.filter(driver => driver.id !== driverId));
    setShowDeleteConfirm(null);
  };

  // Handle edit driver
  const handleEditDriver = (updatedDriver) => {
    setDrivers(drivers.map(driver => 
      driver.id === updatedDriver.id ? updatedDriver : driver
    ));
    setEditingDriver(null);
  };

  // Header Component
  const DriverHeader = () => (
    <div className="mb-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className={`${
          darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
        } rounded-lg border p-4`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {drivers.filter(d => d.status !== 'offline').length}
              </p>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Active Drivers
              </p>
            </div>
          </div>
        </div>

        <div className={`${
          darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
        } rounded-lg border p-4`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {drivers.filter(d => d.status === 'busy').length}
              </p>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                On Assignment
              </p>
            </div>
          </div>
        </div>

        <div className={`${
          darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
        } rounded-lg border p-4`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                6.8m
              </p>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Avg Response
              </p>
            </div>
          </div>
        </div>

        <div className={`${
          darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
        } rounded-lg border p-4`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                4.7
              </p>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Avg Rating
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <button className="px-4 py-2 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center space-x-2 transform"
                  style={{ backgroundColor: colors.dark }}>
            <UserPlus className="w-4 h-4 transition-transform duration-300 hover:scale-110" />
            <span>Add Driver</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className={`w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`} />
            <input
              type="text"
              placeholder="Search drivers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg text-sm ${
                darkMode 
                  ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                  : 'bg-white border-gray-300 text-slate-900 placeholder-slate-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

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
            <option value="available">Available</option>
            <option value="busy">Busy</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      </div>
    </div>
  );

  // Driver Card Component
  const DriverCard = ({ driver }) => (
    <div className={`${
      darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
    } rounded-lg border p-6 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer group`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative transform transition-transform duration-300 group-hover:scale-110">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-medium transition-all duration-300 group-hover:shadow-lg"
              style={{ backgroundColor: getStatusColor(driver.status) }}
            >
              {driver.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div 
              className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white animate-pulse"
              style={{ backgroundColor: getStatusColor(driver.status) }}
            ></div>
          </div>
          <div>
            <h3 className={`font-semibold transition-colors duration-300 group-hover:text-blue-500 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {driver.name}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current animate-pulse" />
              <span className={`text-sm transition-colors duration-300 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {driver.rating}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Status and Location */}
      <div className="space-y-2 mb-4 transform transition-all duration-300 group-hover:translate-x-1">
        <div className="flex items-center space-x-2">
          <span 
            className="px-2 py-1 text-xs font-medium rounded-full text-white capitalize transition-all duration-300 group-hover:scale-105 group-hover:shadow-md"
            style={{ backgroundColor: getStatusColor(driver.status) }}
          >
            {driver.status}
          </span>
        </div>
        
        <div className="flex items-center space-x-1 transition-colors duration-300 group-hover:text-blue-500">
          <MapPin className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
          <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {driver.location}
          </span>
        </div>

        <div className="flex items-center space-x-1 transition-colors duration-300 group-hover:text-blue-500">
          <Phone className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
          <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {driver.phone}
          </span>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="transform transition-all duration-300 group-hover:scale-105">
          <p className={`text-lg font-bold transition-colors duration-300 group-hover:text-blue-500 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {driver.completedToday}
          </p>
          <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Today
          </p>
        </div>
        <div className="transform transition-all duration-300 group-hover:scale-105">
          <p className={`text-lg font-bold transition-colors duration-300 group-hover:text-blue-500 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {driver.totalCompleted}
          </p>
          <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Total
          </p>
        </div>
      </div>

      {/* Vehicle Info */}
      <div className={`p-3 rounded-lg mb-4 transition-all duration-300 group-hover:bg-opacity-80 ${darkMode ? 'bg-slate-700' : 'bg-gray-50'}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {driver.vehicle.model}
            </p>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {driver.vehicle.plate}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 transform transition-all duration-300 group-hover:scale-110">
              <Fuel className="w-3 h-3 text-blue-500 animate-pulse" />
              <span className="text-xs text-blue-500 font-medium">{driver.vehicle.fuel}%</span>
            </div>
            <div className="flex items-center space-x-1 transform transition-all duration-300 group-hover:scale-110">
              <Battery className="w-3 h-3 text-green-500 animate-pulse" />
              <span className="text-xs text-green-500 font-medium">{driver.vehicle.battery}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={() => setSelectedDriver(driver)}
          className="flex-1 px-3 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-1 transform" 
          style={{ backgroundColor: colors.dark }}
        >
          <Eye className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
          <span>View</span>
        </button>
        <button 
          onClick={() => setEditingDriver(driver)}
          className={`px-3 py-2 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-md ${
            darkMode ? 'hover:bg-slate-700 text-slate-400 hover:text-white' : 'hover:bg-gray-100 text-slate-500 hover:text-slate-900'
          }`}
        >
          <Edit className="w-4 h-4 transition-transform duration-300 hover:rotate-12" />
        </button>
        <button 
          onClick={() => setShowDeleteConfirm(driver.id)}
          className="px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 hover:scale-110 hover:shadow-md"
        >
          <Trash2 className="w-4 h-4 transition-transform duration-300 hover:scale-125" />
        </button>
      </div>
    </div>
  );

  // Driver Detail Modal
  const DriverDetailModal = ({ driver, onClose }) => {
    if (!driver) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
        <div className={`${
          darkMode ? 'bg-slate-800' : 'bg-white'
        } rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform animate-slideIn`}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
            <div className="flex items-center space-x-4">
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: getStatusColor(driver.status) }}
              >
                {driver.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {driver.name}
                </h2>
                <div className="flex items-center space-x-2 mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {driver.rating} Rating
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-90 ${
                darkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-gray-100 text-slate-500'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Basic Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    Email
                  </label>
                  <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {driver.email}
                  </p>
                </div>
                <div>
                  <label className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    Phone
                  </label>
                  <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {driver.phone}
                  </p>
                </div>
                <div>
                  <label className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    Status
                  </label>
                  <div className="mt-1">
                    <span 
                      className="px-2 py-1 text-xs font-medium rounded-full text-white capitalize"
                      style={{ backgroundColor: getStatusColor(driver.status) }}
                    >
                      {driver.status}
                    </span>
                  </div>
                </div>
                <div>
                  <label className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    Location
                  </label>
                  <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {driver.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Performance */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Performance
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-gray-50'}`}>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {driver.completedToday}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Completed Today
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-gray-50'}`}>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {driver.totalCompleted}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Total Completed
                  </p>
                </div>
              </div>
            </div>

            {/* Vehicle Information */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Vehicle Information
              </h3>
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-gray-50'}`}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {driver.vehicle.model}
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {driver.vehicle.type}
                    </p>
                  </div>
                  <div>
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {driver.vehicle.plate}
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      License Plate
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <Fuel className="w-4 h-4 text-blue-500" />
                    <span className="text-blue-500 font-medium">{driver.vehicle.fuel}%</span>
                    <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Fuel</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Battery className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 font-medium">{driver.vehicle.battery}%</span>
                    <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Battery</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Specializations */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Specializations
              </h3>
              <div className="flex flex-wrap gap-2">
                {driver.specializations.map((spec, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 text-sm font-medium rounded-full text-white"
                    style={{ backgroundColor: colors.dark }}
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Edit Driver Modal
  const EditDriverModal = ({ driver, onSave, onClose }) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      status: 'available',
      location: ''
    });

    useEffect(() => {
      if (driver) setFormData(driver);
    }, [driver]);

    if (!driver) return null;

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className={`${
          darkMode ? 'bg-slate-800' : 'bg-white'
        } rounded-lg shadow-xl w-full max-w-lg`}>
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Edit Driver
            </h2>
            <button 
              onClick={onClose}
              className={`p-2 rounded-lg ${
                darkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-gray-100 text-slate-500'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg ${
                  darkMode 
                    ? 'bg-slate-700 border-slate-600 text-white' 
                    : 'bg-white border-gray-300 text-slate-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg ${
                  darkMode 
                    ? 'bg-slate-700 border-slate-600 text-white' 
                    : 'bg-white border-gray-300 text-slate-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg ${
                  darkMode 
                    ? 'bg-slate-700 border-slate-600 text-white' 
                    : 'bg-white border-gray-300 text-slate-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg ${
                  darkMode 
                    ? 'bg-slate-700 border-slate-600 text-white' 
                    : 'bg-white border-gray-300 text-slate-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="available">Available</option>
                <option value="busy">Busy</option>
                <option value="offline">Offline</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg ${
                  darkMode 
                    ? 'bg-slate-700 border-slate-600 text-white' 
                    : 'bg-white border-gray-300 text-slate-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div className="flex items-center space-x-3 pt-4">
              <button
                type="submit"
                className="flex-1 px-4 py-2 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                style={{ backgroundColor: colors.dark }}
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2 rounded-lg font-medium ${
                  darkMode 
                    ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' 
                    : 'bg-gray-200 text-slate-700 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Delete Confirmation Modal
  const DeleteConfirmModal = ({ driverId, onConfirm, onCancel }) => {
    if (!driverId) return null;

    const driver = drivers.find(d => d.id === driverId);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className={`${
          darkMode ? 'bg-slate-800' : 'bg-white'
        } rounded-lg shadow-xl w-full max-w-md`}>
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Delete Driver
                </h3>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className={`mb-6 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Are you sure you want to delete <strong>{driver?.name}</strong>? 
              This will permanently remove their profile and all associated data.
            </p>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => onConfirm(driverId)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
              >
                Delete Driver
              </button>
              <button
                onClick={onCancel}
                className={`flex-1 px-4 py-2 rounded-lg font-medium ${
                  darkMode 
                    ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' 
                    : 'bg-gray-200 text-slate-700 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: translateY(-20px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
      
      <DriverHeader />
      
      {/* Drivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDrivers.map((driver, index) => (
          <div
            key={driver.id}
            className="animate-fadeInUp"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <DriverCard driver={driver} />
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredDrivers.length === 0 && (
        <div className={`text-center py-12 ${
          darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
        } rounded-lg border`}>
          <Users className={`w-12 h-12 mx-auto mb-4 ${
            darkMode ? 'text-slate-400' : 'text-slate-500'
          }`} />
          <h3 className={`text-lg font-semibold mb-2 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            No drivers found
          </h3>
          <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Modals */}
      {selectedDriver && (
        <DriverDetailModal 
          driver={selectedDriver} 
          onClose={() => setSelectedDriver(null)} 
        />
      )}

      {editingDriver && (
        <EditDriverModal 
          driver={editingDriver}
          onSave={handleEditDriver}
          onClose={() => setEditingDriver(null)}
        />
      )}

      {showDeleteConfirm && (
        <DeleteConfirmModal 
          driverId={showDeleteConfirm}
          onConfirm={handleDeleteDriver}
          onCancel={() => setShowDeleteConfirm(null)}
        />
      )}
    </div>
  );
};

// Main App Component with Sidebar Integration
export default function DriverManagementApp() {
  const [activeSection, setActiveSection] = useState('drivers');
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const handleRefresh = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setLastRefresh(new Date());
  };

  const switchSection = async (section) => {
    if (section === activeSection) return;
    setActiveSection(section);
  };

  return (
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
            onRefresh={handleRefresh}
            isLoading={isLoading}
            lastRefresh={lastRefresh}
          />
          
          <div className="p-6">
            <DriverManagement darkMode={darkMode} />
          </div>
        </div>
      </div>
      
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <button className="w-12 h-12 rounded-lg shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow" style={{
          backgroundColor: colors.dark
        }}>
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </DashboardLayout>
  );
}