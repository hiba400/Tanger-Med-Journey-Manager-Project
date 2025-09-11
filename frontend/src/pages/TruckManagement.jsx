import React, { useState, useEffect } from 'react';
import { truckAPI } from '../services/api';
import NotificationPanel from '../components/NotificationPanel';
import { 
  Truck,
  Plus,
  Edit3,
  Trash2,
  Search,
  Filter,
  MoreVertical,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wrench,
  MapPin,
  Fuel,
  Calendar,
  User,
  X,
  Save,
  Bell,
  Moon,
  Sun,
  RefreshCw,
  BarChart3,
  Users,
  Map,
  TrendingUp,
  UserCheck,
  Settings,
  ChevronRight
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

// Navigation helper
const navigateToPage = (path) => {
  if (typeof window !== 'undefined' && path) {
    window.location.href = path;
  }
};

// Mock truck data
const initialTrucks = [
  {
    id: 1,
    plateNumber: 'TM-001-A',
    model: 'Volvo FH16',
    year: 2022,
    status: 'active',
    driver: 'Ahmed Mansouri',
   
    mileage: 145672,
    lastMaintenance: '2024-07-15',
    nextMaintenance: '2024-08-15',
    fuelLevel: 85,
    loadStatus: 'loaded'
  },
  {
    id: 2,
    plateNumber: 'TM-002-B',
    model: 'Mercedes Actros',
    year: 2021,
    status: 'maintenance',
    driver: 'Youssef El Amrani',
    
    mileage: 198543,
    lastMaintenance: '2024-07-20',
    nextMaintenance: '2024-08-20',
    fuelLevel: 45,
    loadStatus: 'empty'
  },
  {
    id: 3,
    plateNumber: 'TM-003-C',
    model: 'Scania R450',
    year: 2023,
    status: 'inactive',
    driver: 'Hassan Berrada',
    
    mileage: 87321,
    lastMaintenance: '2024-07-10',
    nextMaintenance: '2024-08-10',
    fuelLevel: 92,
    loadStatus: 'loaded'
  },
  {
    id: 4,
    plateNumber: 'TM-004-D',
    model: 'DAF XF',
    year: 2022,
    status: 'active',
    driver: 'Omar Tazi',
    
    mileage: 156789,
    lastMaintenance: '2024-07-18',
    nextMaintenance: '2024-08-18',
    fuelLevel: 67,
    loadStatus: 'loaded'
  },
  {
    id: 5,
    plateNumber: 'TM-005-E',
    model: 'Iveco Stralis',
    year: 2020,
    status: 'active',
    driver: 'Karim Benjelloun',
    
    lastMaintenance: '2024-07-12',
    nextMaintenance: '2024-08-12',
    fuelLevel: 78,
    loadStatus: 'empty'
  }
];

// Truck Form Modal Component
const TruckFormModal = ({ isOpen, onClose, onSubmit, truck, darkMode, isEdit }) => {
  const [formData, setFormData] = useState({
    plateNumber: '',
    status: 'available',
    driver: ''
  });

  useEffect(() => {
    if (truck) {
      setFormData({
        plateNumber: truck.plate_number || '',
        status: truck.status || 'available',
        driver: truck.driver || ''
      });
    } else {
      setFormData({
        plateNumber: '',
        status: 'available',
        driver: ''
      });
    }
  }, [truck]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-md rounded-xl border ${
        darkMode 
          ? 'bg-slate-800 border-slate-700' 
          : 'bg-white border-gray-200'
      } shadow-xl`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {isEdit ? 'Edit Truck' : 'Add New Truck'}
            </h3>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
                  : 'hover:bg-gray-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Plate Number *
              </label>
              <input
                type="text"
                value={formData.plateNumber}
                onChange={(e) => setFormData({...formData, plateNumber: e.target.value})}
                className={`w-full px-3 py-2 border rounded-lg text-sm ${
                  darkMode 
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                    : 'bg-white border-gray-300 text-slate-900 placeholder-slate-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="e.g., TM-006-F"
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className={`w-full px-3 py-2 border rounded-lg text-sm ${
                  darkMode 
                    ? 'bg-slate-700 border-slate-600 text-white' 
                    : 'bg-white border-gray-300 text-slate-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                required
              >
                <option value="available">Available</option>
                <option value="in transit">In Transit</option>
                <option value="maintenance">Maintenance</option>
                <option value="broken">Broken</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Driver
              </label>
              <input
                type="text"
                value={formData.driver}
                onChange={(e) => setFormData({...formData, driver: e.target.value})}
                className={`w-full px-3 py-2 border rounded-lg text-sm ${
                  darkMode 
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                    : 'bg-white border-gray-300 text-slate-900 placeholder-slate-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="e.g., Ahmed Mansouri"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className={`flex-1 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                  darkMode 
                    ? 'border-slate-600 text-slate-300 hover:bg-slate-700' 
                    : 'border-gray-300 text-slate-700 hover:bg-gray-50'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-300 hover:opacity-90 hover:scale-105"
                style={{ backgroundColor: colors.dark }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>{isEdit ? 'Update' : 'Add'} Truck</span>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Delete Confirmation Modal Component
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, truck, darkMode }) => {
  if (!isOpen || !truck) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-md rounded-xl border ${
        darkMode 
          ? 'bg-slate-800 border-slate-700' 
          : 'bg-white border-gray-200'
      } shadow-xl`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Delete Truck
                </h3>
                <p className={`text-sm ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  This action cannot be undone
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
                  : 'hover:bg-gray-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className={`p-4 rounded-lg border ${
            darkMode 
              ? 'bg-slate-700 border-slate-600' 
              : 'bg-gray-50 border-gray-200'
          } mb-6`}>
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${colors.primary}20` }}
              >
                <Truck className="w-5 h-5" style={{ color: colors.primary }} />
              </div>
              <div>
                <p className={`font-semibold ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {truck.plateNumber}
                </p>
                <p className={`text-sm ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {truck.model} ({truck.year}) - {truck.driver}
                </p>
              </div>
            </div>
          </div>

          <p className={`text-sm mb-6 ${
            darkMode ? 'text-slate-300' : 'text-slate-700'
          }`}>
            Are you sure you want to delete this truck? This will permanently remove the truck from your fleet management system. All associated data will be lost.
          </p>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className={`flex-1 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                darkMode 
                  ? 'border-slate-600 text-slate-300 hover:bg-slate-700' 
                  : 'border-gray-300 text-slate-700 hover:bg-gray-50'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-center space-x-2">
                <Trash2 className="w-4 h-4" />
                <span>Delete Truck</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ activeSection, setActiveSection, darkMode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard', badge: null, path: '/pages/breakdownadmindashboard' },
    { id: 'requests', icon: AlertTriangle, label: 'Requests', badge: null, path: '/pages/requestManagement' },
    { id: 'drivers', icon: Users, label: 'Drivers', badge: null, path: '/pages/driverManagement' },
    { id: 'trucks', icon: Truck, label: 'Trucks', badge: null, path: null },
    { id: 'map', icon: Map, label: 'Live Map', badge: null, path: '/pages/breakdownadmindashboard' },
    { id: 'profile', icon: UserCheck, label: 'Profile', badge: null, path: '/pages/profil' },
    { id: 'settings', icon: Settings, label: 'Settings', badge: null, path: '/pages/settings' },
  ];

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
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: colors.dark }}>
              TM
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
              onClick={() => {
                if (item.id === 'map') {
                  try { localStorage.setItem('openMapSection', 'true'); } catch {}
                }
                if (item.path) {
                  navigateToPage(item.path);
                } else {
                  setActiveSection(item.id);
                }
              }}
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
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

// Dashboard Navbar Component
const DashboardNavbar = ({ darkMode, setDarkMode, onRefresh, isLoading, lastRefresh, onOpenNotifications }) => {
  const [searchValue, setSearchValue] = useState('');

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
              Fleet Control Center
            </h2>
            <p className={`text-sm ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Truck Management Dashboard
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
              placeholder="Search trucks..."
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
            
            <button onClick={onOpenNotifications} className={`p-2 rounded-lg transition-colors relative ${
              darkMode 
                ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
                : 'hover:bg-gray-100 text-slate-600 hover:text-slate-900'
            }`}>
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                5
              </span>
            </button>
          </div>
          
          {/* Profile */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className={`text-sm font-medium ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>Admin User</p>
              <p className={`text-xs ${
                darkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>Fleet Manager</p>
            </div>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-medium" style={{
              backgroundColor: colors.dark
            }}>
              AU
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-6 pb-3">
        <p className={`text-xs ${
          darkMode ? 'text-slate-400' : 'text-slate-500'
        }`}>
          Last updated: {lastRefresh.toLocaleTimeString()} • 45 Trucks Online • 12 Maintenance Due
        </p>
      </div>
    </div>
  );
};

// Main Truck Management Component
const TruckManagementInterface = ({ darkMode }) => {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTruck, setEditingTruck] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [truckToDelete, setTruckToDelete] = useState(null);

  // Load trucks from backend
  const loadTrucks = async () => {
    try {
      setLoading(true);
      const data = await truckAPI.getAll();
      setTrucks(data);
      setError(null);
    } catch (err) {
      console.error('Error loading trucks:', err);
      setError('Failed to load trucks');
    } finally {
      setLoading(false);
    }
  };

  // Load trucks on component mount
  useEffect(() => {
    loadTrucks();
  }, []);

  // Filter and search trucks
  const filteredTrucks = trucks.filter(truck => {
    const matchesSearch = truck.plate_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         truck.driver?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || truck.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Status configurations
  const getStatusConfig = (status) => {
    switch (status) {
      case 'available':
        return { 
          color: 'text-green-700 bg-green-100 border-green-200', 
          darkColor: 'text-green-400 bg-green-900/30 border-green-800',
          icon: CheckCircle, 
          label: 'Available' 
        };
      case 'in transit':
        return { 
          color: 'text-blue-700 bg-blue-100 border-blue-200', 
          darkColor: 'text-blue-400 bg-blue-900/30 border-blue-800',
          icon: MapPin, 
          label: 'In Transit' 
        };
      case 'maintenance':
        return { 
          color: 'text-orange-700 bg-orange-100 border-orange-200', 
          darkColor: 'text-orange-400 bg-orange-900/30 border-orange-800',
          icon: Wrench, 
          label: 'Maintenance' 
        };
      case 'broken':
        return { 
          color: 'text-red-700 bg-red-100 border-red-200', 
          darkColor: 'text-red-400 bg-red-900/30 border-red-800',
          icon: AlertTriangle, 
          label: 'Broken' 
        };
      default:
        return { 
          color: 'text-gray-700 bg-gray-100 border-gray-200', 
          darkColor: 'text-gray-400 bg-gray-900/30 border-gray-800',
          icon: Clock, 
          label: 'Unknown' 
        };
    }
  };

  // Add truck function
  const handleAddTruck = async (truckData) => {
    try {
      const newTruck = await truckAPI.create({
        plate_number: truckData.plateNumber,
        status: truckData.status || 'available',
        driver: truckData.driver || null
      });
      setTrucks([...trucks, newTruck]);
      setShowAddModal(false);
    } catch (err) {
      console.error('Error adding truck:', err);
      setError('Failed to add truck');
    }
  };

  // Edit truck function
  const handleEditTruck = async (truckData) => {
    try {
      const updatedTruck = await truckAPI.update(editingTruck._id, {
        plate_number: truckData.plateNumber,
        status: truckData.status,
        driver: truckData.driver || null
      });
      setTrucks(trucks.map(truck => 
        truck._id === editingTruck._id ? updatedTruck : truck
      ));
      setShowEditModal(false);
      setEditingTruck(null);
    } catch (err) {
      console.error('Error updating truck:', err);
      setError('Failed to update truck');
    }
  };

  // Delete truck function
  const handleDeleteTruck = async () => {
    try {
      await truckAPI.delete(truckToDelete._id);
      setTrucks(trucks.filter(truck => truck._id !== truckToDelete._id));
      setShowDeleteConfirm(false);
      setTruckToDelete(null);
    } catch (err) {
      console.error('Error deleting truck:', err);
      setError('Failed to delete truck');
    }
  };

  // Open edit modal
  const openEditModal = (truck) => {
    setEditingTruck(truck);
    setShowEditModal(true);
  };

  // Open delete modal
  const openDeleteModal = (truck) => {
    setTruckToDelete(truck);
    setShowDeleteConfirm(true);
  };

  return (
    <div className={`p-6 ${darkMode ? 'bg-slate-900' : 'bg-gray-50'} min-h-screen`}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Truck Management
            </h1>
            <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Manage your fleet of {trucks.length} trucks
            </p>
          </div>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: colors.dark }}
          >
            <Plus className="w-5 h-5" />
            <span>Add Truck</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          {[
            { label: 'Total Trucks', value: trucks.length, color: colors.primary },
            { label: 'Active', value: trucks.filter(t => t.status === 'active').length, color: '#10B981' },
            { label: 'Maintenance', value: trucks.filter(t => t.status === 'maintenance').length, color: '#F59E0B' },
            { label: 'Inactive', value: trucks.filter(t => t.status === 'inactive').length, color: '#EF4444' }
          ].map((stat, index) => (
            <div key={index} className={`p-4 rounded-xl border ${
              darkMode 
                ? 'bg-slate-800 border-slate-700' 
                : 'bg-white border-gray-200'
            } shadow-sm`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${
                    darkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {stat.label}
                  </p>
                  <p className={`text-2xl font-bold ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {stat.value}
                  </p>
                </div>
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <Truck className="w-6 h-6" style={{ color: stat.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className={`p-4 rounded-xl border ${
        darkMode 
          ? 'bg-slate-800 border-slate-700' 
          : 'bg-white border-gray-200'
      } shadow-sm mb-6`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className={`w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`} />
            <input
              type="text"
              placeholder="Search by plate number, model, or driver..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg text-sm ${
                darkMode 
                  ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                  : 'bg-white border-gray-300 text-slate-900 placeholder-slate-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <Filter className={`w-4 h-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`px-3 py-2 border rounded-lg text-sm ${
                darkMode 
                  ? 'bg-slate-700 border-slate-600 text-white' 
                  : 'bg-white border-gray-300 text-slate-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="in transit">In Transit</option>
              <option value="maintenance">Maintenance</option>
              <option value="broken">Broken</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 rounded-xl border border-red-200 bg-red-50 text-red-700">
          <p className="font-medium">Error: {error}</p>
          <button 
            onClick={loadTrucks}
            className="mt-2 text-sm underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="mb-6 p-8 rounded-xl border border-gray-200 bg-white text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading trucks...</p>
        </div>
      )}

      {/* Trucks Table */}
      {!loading && (
        <div className={`rounded-xl border ${
          darkMode 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-gray-200'
        } shadow-sm overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${
              darkMode ? 'bg-slate-700' : 'bg-gray-50'
            } border-b ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
              <tr>
                <th className={`text-left py-3 px-4 font-medium text-sm ${
                  darkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Truck Info
                </th>
                <th className={`text-left py-3 px-4 font-medium text-sm ${
                  darkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Status
                </th>
                <th className={`text-left py-3 px-4 font-medium text-sm ${
                  darkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Driver
                </th>
                
                <th className={`text-right py-3 px-4 font-medium text-sm ${
                  darkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTrucks.map((truck, index) => {
                const statusConfig = getStatusConfig(truck.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <tr key={truck._id} className={`border-b ${
                    darkMode ? 'border-slate-700' : 'border-gray-100'
                  } hover:${darkMode ? 'bg-slate-700' : 'bg-gray-50'} transition-colors`}>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${colors.primary}20` }}
                        >
                          <Truck className="w-5 h-5" style={{ color: colors.primary }} />
                        </div>
                        <div>
                          <p className={`font-semibold ${
                            darkMode ? 'text-white' : 'text-slate-900'
                          }`}>
                            {truck.plate_number}
                          </p>
                          <p className={`text-sm ${
                            darkMode ? 'text-slate-400' : 'text-slate-600'
                          }`}>
                            Truck ID: {truck._id?.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${
                        darkMode ? statusConfig.darkColor : statusConfig.color
                      }`}>
                        <StatusIcon className="w-3 h-3" />
                        <span>{statusConfig.label}</span>
                      </span>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <User className={`w-4 h-4 ${
                          darkMode ? 'text-slate-400' : 'text-slate-500'
                        }`} />
                        <span className={`text-sm ${
                          darkMode ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          {truck.driver || 'No driver assigned'}
                        </span>
                      </div>
                    </td>
                    

                    
                    
                    
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => openEditModal(truck)}
                          className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                            darkMode 
                              ? 'hover:bg-slate-600 text-slate-400 hover:text-white' 
                              : 'hover:bg-blue-50 text-slate-600 hover:text-blue-600'
                          }`}
                          title="Edit truck"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(truck)}
                          className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                            darkMode 
                              ? 'hover:bg-red-900/30 text-slate-400 hover:text-red-400' 
                              : 'hover:bg-red-50 text-slate-600 hover:text-red-600'
                          }`}
                          title="Delete truck"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredTrucks.length === 0 && (
          <div className="text-center py-12">
            <Truck className={`w-12 h-12 mx-auto mb-4 ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`} />
            <p className={`text-lg font-medium ${
              darkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              No trucks found
            </p>
            <p className={`text-sm ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria.' 
                : 'Start by adding your first truck to the fleet.'}
            </p>
          </div>
        )}
      </div>
      )}

      {/* Modals */}
      <TruckFormModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddTruck}
        darkMode={darkMode}
        isEdit={false}
      />

      <TruckFormModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingTruck(null);
        }}
        onSubmit={handleEditTruck}
        truck={editingTruck}
        darkMode={darkMode}
        isEdit={true}
      />

      <DeleteConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setTruckToDelete(null);
        }}
        onConfirm={handleDeleteTruck}
        truck={truckToDelete}
        darkMode={darkMode}
      />
    </div>
  );
};

// Main Application Component
export default function TruckManagement() {
  const [activeSection, setActiveSection] = useState('trucks');
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);

  const handleRefresh = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setLastRefresh(new Date());
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
        />
        
        <div className="flex-1">
          <DashboardNavbar 
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onRefresh={handleRefresh}
            isLoading={isLoading}
            lastRefresh={lastRefresh}
            onOpenNotifications={() => setIsNotificationPanelOpen(true)}
          />
          
          {activeSection === 'trucks' && (
            <TruckManagementInterface darkMode={darkMode} />
          )}
          
          {activeSection !== 'trucks' && (
            <div className="p-6">
              <div className={`text-center py-12 rounded-xl border ${
                darkMode 
                  ? 'bg-slate-800 border-slate-700' 
                  : 'bg-white border-gray-200'
              } shadow-sm`}>
                <h2 className={`text-2xl font-bold ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Section
                </h2>
                <p className={`text-sm mt-2 ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  This section is coming soon. Currently showing Truck Management.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    {/* Notification Panel */}
    <NotificationPanel 
      isOpen={isNotificationPanelOpen}
      onClose={() => setIsNotificationPanelOpen(false)}
      darkMode={darkMode}
    />
    </>
  );
}