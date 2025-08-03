import React, { useState, useEffect } from 'react';

import { 
  Car, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  MapPin, 
  Phone,
  Settings,
  Bell,
  Search,
  Star,
  Wrench,
  UserCheck,
  BarChart3,
  Moon,
  Sun,
  RefreshCw,
  Home,
  Activity,
  Calendar,
  Shield,
  Navigation,
  Eye,
  MoreVertical,
  Filter,
  Download,
  Plus,
  ChevronRight,
  Truck,
  Battery,
  Fuel,
  Menu,
  LogOut,
  Map,
  Maximize2,
  Minimize2,
  Layers
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

// Interactive Real Map Component using Leaflet
const TangerMedMap = ({ requests, darkMode, isFullscreen, onToggleFullscreen }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [mapView, setMapView] = useState('satellite');
  const mapContainerRef = React.useRef(null);
  const mapRef = React.useRef(null);

  // Tanger Med Port coordinates
  const tangerMedCenter = [35.8869, -5.4200];

  // Sample request locations within Tanger Med Port
  const requestLocations = [
    { id: 1, lat: 35.8885, lng: -5.4180, status: 'urgent', type: 'Engine Failure', customer: 'Ahmed Hassan' },
    { id: 2, lat: 35.8860, lng: -5.4220, status: 'pending', type: 'Flat Tire', customer: 'Sara Benali' },
    { id: 3, lat: 35.8890, lng: -5.4150, status: 'assigned', type: 'Battery Dead', customer: 'Omar Zaidi' },
    { id: 4, lat: 35.8845, lng: -5.4190, status: 'completed', type: 'Fuel Empty', customer: 'Fatima Alami' },
  ];

  const getStatusColor = (status) => {
    const colors = {
      urgent: '#EF4444',
      pending: '#F59E0B',
      assigned: '#3B82F6',
      completed: '#10B981',
    };
    return colors[status] || '#6B7280';
  };

  // Initialize map when component mounts
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Load Leaflet CSS and JS
    const loadLeaflet = async () => {
      // Add Leaflet CSS
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
        document.head.appendChild(link);
      }

      // Load Leaflet JS
      if (!window.L) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
        script.onload = initializeMap;
        document.head.appendChild(script);
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      if (!window.L || mapRef.current) return;

      // Create map
      const map = window.L.map(mapContainerRef.current, {
        center: tangerMedCenter,
        zoom: 15,
        zoomControl: true,
        attributionControl: false
      });

      // Add tile layers
      const satelliteLayer = window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Esri, Maxar, Earthstar Geographics'
      });

      const streetLayer = window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      });

      // Add default layer
      (mapView === 'satellite' ? satelliteLayer : streetLayer).addTo(map);

      // Store layers for switching
      map.satelliteLayer = satelliteLayer;
      map.streetLayer = streetLayer;

      // Add markers for requests
      requestLocations.forEach(request => {
        const icon = window.L.divIcon({
          className: 'custom-marker',
          html: `
            <div style="
              width: 30px; 
              height: 30px; 
              background-color: ${getStatusColor(request.status)}; 
              border: 3px solid white; 
              border-radius: 50%; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              font-size: 14px;
              color: white;
              font-weight: bold;
            ">
              ${request.type === 'Engine Failure' ? '🔧' : 
                request.type === 'Flat Tire' ? '🚗' : 
                request.type === 'Battery Dead' ? '🔋' : 
                request.type === 'Fuel Empty' ? '⛽' : '🔧'}
            </div>
            ${request.status === 'urgent' ? `
              <div style="
                position: absolute;
                top: 0;
                left: 0;
                width: 30px;
                height: 30px;
                background-color: ${getStatusColor(request.status)};
                border-radius: 50%;
                animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
                opacity: 0.3;
              "></div>
            ` : ''}
          `,
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        });

        const marker = window.L.marker([request.lat, request.lng], { icon })
          .addTo(map)
          .bindPopup(`
            <div style="min-width: 200px; padding: 8px;">
              <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold; color: #333;">
                ${request.customer}
              </h3>
              <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">
                ${request.type}
              </p>
              <div style="margin: 8px 0;">
                <span style="
                  background-color: ${getStatusColor(request.status)};
                  color: white;
                  padding: 2px 8px;
                  border-radius: 12px;
                  font-size: 10px;
                  text-transform: capitalize;
                ">
                  ${request.status}
                </span>
              </div>
              <div style="display: flex; gap: 4px; margin-top: 8px;">
                <button style="
                  flex: 1;
                  background-color: #3B82F6;
                  color: white;
                  border: none;
                  padding: 4px 8px;
                  border-radius: 4px;
                  font-size: 10px;
                  cursor: pointer;
                ">
                  📞 Call
                </button>
                <button style="
                  flex: 1;
                  background-color: #10B981;
                  color: white;
                  border: none;
                  padding: 4px 8px;
                  border-radius: 4px;
                  font-size: 10px;
                  cursor: pointer;
                ">
                  🧭 Navigate
                </button>
              </div>
            </div>
          `);
      });

      mapRef.current = map;
    };

    loadLeaflet();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Handle map view changes
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    map.eachLayer(layer => {
      if (layer instanceof window.L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    if (mapView === 'satellite') {
      map.satelliteLayer.addTo(map);
    } else {
      map.streetLayer.addTo(map);
    }
  }, [mapView]);

  // Add CSS for ping animation
  useEffect(() => {
    if (!document.querySelector('#ping-animation-styles')) {
      const style = document.createElement('style');
      style.id = 'ping-animation-styles';
      style.textContent = `
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'h-96'} ${
      darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
    } border rounded-lg overflow-hidden transition-all duration-300`}>
      {/* Map Header */}
      <div className={`${
        darkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'
      } border-b px-4 py-3 flex items-center justify-between`}>
        <div className="flex items-center space-x-3">
          <Map className={`w-5 h-5 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`} />
          <div>
            <h3 className={`text-sm font-semibold ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Tanger Med Port - Live Requests
            </h3>
            <p className={`text-xs ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {requestLocations.filter(r => r.status !== 'completed').length} active requests
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={mapView}
            onChange={(e) => setMapView(e.target.value)}
            className={`text-xs px-2 py-1 rounded border ${
              darkMode 
                ? 'bg-slate-600 border-slate-500 text-white' 
                : 'bg-white border-gray-300 text-slate-700'
            }`}
          >
            <option value="satellite">Satellite</option>
            <option value="street">Street</option>
          </select>
          
          <button
            onClick={onToggleFullscreen}
            className={`p-1.5 rounded transition-colors ${
              darkMode 
                ? 'hover:bg-slate-600 text-slate-400 hover:text-white' 
                : 'hover:bg-gray-200 text-slate-500 hover:text-slate-700'
            }`}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-full">
        <div 
          ref={mapContainerRef}
          className="w-full h-full"
          style={{ minHeight: '300px' }}
        />

        {/* Legend */}
        <div className={`absolute bottom-4 left-4 ${
          darkMode ? 'bg-slate-800/90 border-slate-600' : 'bg-white/90 border-gray-200'
        } border rounded-lg p-3 backdrop-blur-sm z-[1000]`}>
          <h4 className={`text-xs font-semibold ${
            darkMode ? 'text-white' : 'text-slate-900'
          } mb-2`}>Status Legend</h4>
          <div className="space-y-1">
            {[
              { status: 'urgent', label: 'Urgent', count: requestLocations.filter(r => r.status === 'urgent').length },
              { status: 'pending', label: 'Pending', count: requestLocations.filter(r => r.status === 'pending').length },
              { status: 'assigned', label: 'Assigned', count: requestLocations.filter(r => r.status === 'assigned').length },
              { status: 'completed', label: 'Completed', count: requestLocations.filter(r => r.status === 'completed').length },
            ].map((item) => (
              <div key={item.status} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getStatusColor(item.status) }}
                ></div>
                <span className={`text-xs ${
                  darkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {item.label} ({item.count})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Coordinates Display */}
        <div className={`absolute bottom-4 right-4 ${
          darkMode ? 'bg-slate-800/90 text-slate-300' : 'bg-white/90 text-slate-600'
        } rounded px-2 py-1 text-xs backdrop-blur-sm z-[1000]`}>
          35.8869°N, 5.4200°W
        </div>
      </div>
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
              Control Center
            </h2>
            <p className={`text-sm ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Breakdown Assistance Dashboard
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
          Last updated: {lastRefresh.toLocaleTimeString()} • 24 Drivers Online • 8 Active Requests
        </p>
      </div>
    </div>
  );
};

const Sidebar = ({ activeSection, setActiveSection, darkMode, switchSection }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard', badge: null, path: null },
    { id: 'requests', icon: AlertTriangle, label: 'Requests', badge: '8', path: '/pages/requestmanagement' },
    { id: 'drivers', icon: Users, label: 'Drivers', badge: '24', path: '/pages/drivermanagement' },
    { id: 'map', icon: Map, label: 'Live Map', badge: null, path: null },
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
                New Request
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

// Statistics Card
const StatCard = ({ 
  color = "default", 
  icon, 
  title, 
  count, 
  change, 
  darkMode
}) => {
  const IconComponent = icon;

  const colorStyles = {
    default: { bg: colors.dark, text: 'text-white' },
    success: { bg: '#10B981', text: 'text-white' },
    warning: { bg: '#F59E0B', text: 'text-white' },
    error: { bg: '#EF4444', text: 'text-white' },
  };

  const style = colorStyles[color] || colorStyles.default;

  return (
    <div className={`${
      darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
    } rounded-lg border p-6 transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium ${
            darkMode ? 'text-slate-300' : 'text-slate-600'
          } mb-1`}>{title}</p>
          <p className={`text-3xl font-bold ${
            darkMode ? 'text-white' : 'text-slate-900'
          } mb-2`}>
            {count}
          </p>
          {change && (
            <div className="flex items-center space-x-1">
              <TrendingUp className={`w-4 h-4 ${
                change.type === 'positive' ? 'text-green-500' : 'text-red-500'
              }`} />
              <span className={`text-sm ${
                change.type === 'positive' ? 'text-green-500' : 'text-red-500'
              }`}>
                {change.value}
              </span>
              <span className={`text-sm ${
                darkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {change.label}
              </span>
            </div>
          )}
        </div>
        
        <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{
          backgroundColor: style.bg
        }}>
          <IconComponent className={`w-6 h-6 ${style.text}`} />
        </div>
      </div>
    </div>
  );
};

// Chart Components
const BarChart = ({ title, description, data, darkMode }) => {
  const maxValue = Math.max(...data.map(d => d.value));



  return (
    <div className={`${
      darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
    } rounded-lg border p-6`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className={`text-lg font-semibold ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>{title}</h3>
          <p className={`text-sm ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>{description}</p>
        </div>
        <button className={`p-1 rounded ${
          darkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-gray-100 text-slate-500'
        }`}>
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
      
      <div className="h-48 flex items-end justify-between space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full rounded-t transition-all duration-500 hover:opacity-80"
              style={{ 
                height: `${(item.value / maxValue) * 160}px`,
                backgroundColor: colors.dark
              }}
            ></div>
            <div className={`mt-2 text-xs font-medium ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Request Card
const RequestCard = ({ request, darkMode, index }) => {
  const getStatusColor = (status) => {
    const colors = {
      urgent: '#EF4444',
      pending: '#F59E0B',
      assigned: '#3B82F6',
      completed: '#10B981',
    };
    return colors[status] || '#6B7280';
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

  const TypeIcon = getTypeIcon(request.type);

  return (
    <div className={`${
      darkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'
    } border rounded-lg p-4 transition-all duration-200 hover:shadow-sm`}>
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{
          backgroundColor: getStatusColor(request.status)
        }}>
          <TypeIcon className="w-5 h-5" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <p className={`text-sm font-medium ${
              darkMode ? 'text-white' : 'text-slate-900'
            } truncate`}>
              {request.customer}
            </p>
            <span className="px-2 py-0.5 text-xs font-medium rounded-full text-white capitalize" style={{
              backgroundColor: getStatusColor(request.status)
            }}>
              {request.status}
            </span>
          </div>
          <p className={`text-xs ${
            darkMode ? 'text-slate-400' : 'text-slate-500'
          } truncate flex items-center space-x-1`}>
            <MapPin className="w-3 h-3" />
            <span>{request.location}</span>
          </p>
          <p className={`text-xs ${
            darkMode ? 'text-slate-300' : 'text-slate-600'
          } font-medium`}>
            {request.type}
          </p>
        </div>
        
        <div className="flex flex-col items-end space-y-2">
          <div className="flex items-center space-x-1">
            <Clock className={`w-3 h-3 ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`} />
            <span className={`text-xs ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>{request.time}</span>
          </div>
          <div className="flex space-x-1">
            <button className="p-1 rounded text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20">
              <Phone className="w-3 h-3" />
            </button>
            <button className="p-1 rounded text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20">
              <Navigation className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Driver Card
const DriverCard = ({ driver, darkMode, index }) => {
  const getStatusColor = (status) => {
    const colors = {
      available: '#10B981',
      busy: '#F59E0B',
      offline: '#6B7280',
    };
    return colors[status] || '#6B7280';
  };

  return (
    <div className={`${
      darkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'
    } border rounded-lg p-4 transition-all duration-200 hover:shadow-sm`}>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-medium text-sm" style={{
            backgroundColor: getStatusColor(driver.status)
          }}>
            {driver.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white" style={{
            backgroundColor: getStatusColor(driver.status)
          }}></div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <p className={`text-sm font-medium ${
              darkMode ? 'text-white' : 'text-slate-900'
            } truncate`}>
              {driver.name}
            </p>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className={`text-xs ${
                darkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>{driver.rating}</span>
            </div>
          </div>
          <p className={`text-xs ${
            darkMode ? 'text-slate-400' : 'text-slate-500'
          } flex items-center space-x-1`}>
            <MapPin className="w-3 h-3" />
            <span>{driver.location}</span>
          </p>
          <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full text-white mt-1 capitalize" style={{
            backgroundColor: getStatusColor(driver.status)
          }}>
            {driver.status}
          </span>
        </div>
        
        <div className="text-right">
          <p className={`text-sm font-semibold ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            {driver.completedToday}
          </p>
          <p className={`text-xs ${
            darkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>tasks today</p>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
export default function BreakdownAdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [mapFullscreen, setMapFullscreen] = useState(false);

  const chartData = [
    { label: 'Mon', value: 45 },
    { label: 'Tue', value: 52 },
    { label: 'Wed', value: 38 },
    { label: 'Thu', value: 61 },
    { label: 'Fri', value: 55 },
    { label: 'Sat', value: 67 },
    { label: 'Sun', value: 43 },
  ];

  const [requests, setRequests] = useState([
    { 
      id: 1, 
      customer: 'Ahmed Hassan', 
      location: 'Terminal 1 - Berth A3', 
      time: '2 min ago', 
      status: 'urgent', 
      type: 'Engine Failure'
    },
    { 
      id: 2, 
      customer: 'Sara Benali', 
      location: 'Container Yard B', 
      time: '15 min ago', 
      status: 'pending', 
      type: 'Flat Tire'
    },
    { 
      id: 3, 
      customer: 'Omar Zaidi', 
      location: 'Logistics Zone C', 
      time: '28 min ago', 
      status: 'assigned', 
      type: 'Battery Dead'
    },
    { 
      id: 4, 
      customer: 'Fatima Alami', 
      location: 'Gate Control Area', 
      time: '45 min ago', 
      status: 'completed', 
      type: 'Fuel Empty'
    },
  ]);

  const [drivers, setDrivers] = useState([
    { 
      id: 1, 
      name: 'Youssef Benjelloun', 
      status: 'available', 
      rating: 4.8, 
      completedToday: 12, 
      location: 'Terminal 1'
    },
    { 
      id: 2, 
      name: 'Rachid Amrani', 
      status: 'busy', 
      rating: 4.6, 
      completedToday: 8, 
      location: 'En route'
    },
    { 
      id: 3, 
      name: 'Karim Tahiri', 
      status: 'available', 
      rating: 4.9, 
      completedToday: 15, 
      location: 'Terminal 2'
    },
    { 
      id: 4, 
      name: 'Hassan Mokhtar', 
      status: 'offline', 
      rating: 4.5, 
      completedToday: 6, 
      location: 'Base Station'
    },
  ]);

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

  const renderContent = () => {
    if (activeSection === 'map') {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Live Map View
              </h1>
              <p className={`text-sm ${
                darkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Real-time breakdown requests in Tanger Med Port
              </p>
            </div>
          </div>
          
          <TangerMedMap 
            requests={requests}
            darkMode={darkMode}
            isFullscreen={mapFullscreen}
            onToggleFullscreen={() => setMapFullscreen(!mapFullscreen)}
          />
          
          {/* Map Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard
              color="error"
              icon={AlertTriangle}
              title="Urgent Requests"
              count={requests.filter(r => r.status === 'urgent').length.toString()}
              darkMode={darkMode}
            />
            <StatCard
              color="warning"
              icon={Clock}
              title="Pending"
              count={requests.filter(r => r.status === 'pending').length.toString()}
              darkMode={darkMode}
            />
            <StatCard
              color="default"
              icon={Users}
              title="Assigned"
              count={requests.filter(r => r.status === 'assigned').length.toString()}
              darkMode={darkMode}
            />
            <StatCard
              color="success"
              icon={CheckCircle}
              title="Completed Today"
              count={requests.filter(r => r.status === 'completed').length.toString()}
              darkMode={darkMode}
            />
          </div>
        </div>
      );
    }

    // Default dashboard content
    return (
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            color="default"
            icon={AlertTriangle}
            title="Active Requests"
            count={requests.filter(r => r.status !== 'completed').length.toString()}
            change={{ type: "positive", value: "+12%", label: "vs yesterday" }}
            darkMode={darkMode}
          />
          
          <StatCard
            color="success"
            icon={Users}
            title="Available Drivers"
            count={drivers.filter(d => d.status === 'available').length.toString()}
            change={{ type: "positive", value: "+3", label: "since last hour" }}
            darkMode={darkMode}
          />
          
          <StatCard
            color="warning"
            icon={Clock}
            title="Avg Response"
            count="8.5m"
            change={{ type: "positive", value: "-2.1m", label: "improved" }}
            darkMode={darkMode}
          />
          
          <StatCard
            color="default"
            icon={CheckCircle}
            title="Success Rate"
            count="96.8%"
            change={{ type: "positive", value: "+1.2%", label: "this week" }}
            darkMode={darkMode}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BarChart
            title="Weekly Breakdown Requests"
            description="Request volume trends by day"
            data={chartData}
            darkMode={darkMode}
          />
          
          <div className={`${
            darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
          } rounded-lg border p-6`}>
            <h3 className={`text-lg font-semibold ${
              darkMode ? 'text-white' : 'text-slate-900'
            } mb-4`}>Response Time Analysis</h3>
            <div className="flex items-center justify-center h-48">
              <div className={`text-center ${
                darkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                <Activity className="w-12 h-12 mx-auto mb-2" />
                <p>Chart visualization</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Requests */}
          <div className={`lg:col-span-2 ${
            darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
          } rounded-lg border p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className={`text-lg font-semibold ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Recent Requests
                </h3>
                <p className={`text-sm ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Real-time breakdown assistance requests
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button className={`p-2 rounded-lg ${
                  darkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-gray-100 text-slate-500'
                }`}>
                  <Filter className="w-4 h-4" />
                </button>
                <button className="px-4 py-2 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity" style={{
                  backgroundColor: colors.dark
                }}>
                  View All
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              {requests.map((request, index) => (
                <RequestCard 
                  key={request.id} 
                  request={request} 
                  darkMode={darkMode} 
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Driver Overview */}
          <div className={`${
            darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
          } rounded-lg border p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className={`text-lg font-semibold ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Driver Status
                </h3>
                <p className={`text-sm ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Live driver monitoring
                </p>
              </div>
              <button className={`p-2 rounded-lg ${
                darkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-gray-100 text-slate-500'
              }`}>
                <Eye className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              {drivers.map((driver, index) => (
                <DriverCard 
                  key={driver.id} 
                  driver={driver} 
                  darkMode={darkMode} 
                  index={index}
                />
              ))}
            </div>
            
            {/* Quick Stats */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-slate-700">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-500">
                    {drivers.filter(d => d.status === 'available').length}
                  </p>
                  <p className={`text-xs ${
                    darkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>Available</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-500">
                    {drivers.filter(d => d.status === 'busy').length}
                  </p>
                  <p className={`text-xs ${
                    darkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>Busy</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-400">
                    {drivers.filter(d => d.status === 'offline').length}
                  </p>
                  <p className={`text-xs ${
                    darkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>Offline</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
            {renderContent()}
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