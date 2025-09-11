import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import NotificationPanel from '../components/NotificationPanel';

import { 
  Settings, 
  Bell, 
  Moon, 
  Sun, 
  Shield,
  Database,
  Palette,
  Download,
  Upload,
  Trash2,
  Save,
  AlertTriangle,
  BarChart3,
  Users,
  Map,
  TrendingUp,
  Truck,
  UserCheck,
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

const DashboardNavbar = ({ darkMode, setDarkMode, admin, onOpenNotifications, currentLanguage }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  let displayName = admin ? admin.name : 'Admin';
  let avatarImage = null;
  try {
    const storedProfile = localStorage.getItem('profileData');
    if (storedProfile) {
      const parsed = JSON.parse(storedProfile);
      if (parsed && parsed.name) displayName = parsed.name;
    }
    const storedImg = localStorage.getItem('profileImage');
    if (storedImg) avatarImage = storedImg;
  } catch {}

  const t = (key) => {
    const dict = {
      en: {
        systemSettings: 'System Settings',
        configurationPreferences: 'Configuration & Preferences',
        logout: 'Logout',
        systemAdmin: 'System Admin'
      },
      fr: {
        systemSettings: 'Paramètres du système',
        configurationPreferences: 'Configuration et préférences',
        logout: 'Déconnexion',
        systemAdmin: 'Administrateur système'
      },
      ar: {
        systemSettings: 'إعدادات النظام',
        configurationPreferences: 'الإعدادات والتفضيلات',
        logout: 'تسجيل الخروج',
        systemAdmin: 'مسؤول النظام'
      }
    };
    return (dict[currentLanguage] || dict.en)[key] || key;
  };

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
              {t('systemSettings')}
            </h2>
            <p className={`text-sm ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {t('configurationPreferences')}
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
              }`}>{t('systemAdmin')}</p>
            </div>
            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center text-white text-sm font-medium" style={{
              backgroundColor: colors.dark
            }}>
              {avatarImage ? (
                <img src={avatarImage} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                displayName.split(' ').map(n => n[0]).join('').toUpperCase()
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
    </div>
  );
};

const SettingCard = ({ title, description, icon: Icon, children, darkMode }) => {
  return (
    <div className={`${
      darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
    } rounded-lg border p-6`}>
      <div className="flex items-center space-x-3 mb-4">
        <div className={`p-2 rounded-lg ${
          darkMode ? 'bg-slate-700' : 'bg-gray-100'
        }`}>
          <Icon className={`w-5 h-5 ${
            darkMode ? 'text-slate-300' : 'text-slate-600'
          }`} />
        </div>
        <div>
          <h3 className={`text-lg font-semibold ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            {title}
          </h3>
          <p className={`text-sm ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {description}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
};

const ToggleSwitch = ({ enabled, onChange, label, darkMode }) => {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm font-medium ${
        darkMode ? 'text-slate-300' : 'text-slate-700'
      }`}>
        {label}
      </span>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled 
            ? 'bg-blue-500' 
            : darkMode ? 'bg-slate-600' : 'bg-gray-300'
        }`}
      >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`} />
      </button>
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
    { id: 'profil', icon: UserCheck, label: 'Profil', badge: null, path: '/pages/profil' },
    { id: 'setting', icon: Settings, label: 'Settings', badge: null, path: null },
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

export default function SettingsPage() {
  const { admin } = useAuth();
  const [activeSection, setActiveSection] = useState('setting');
  const [darkMode, setDarkMode] = useState(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const fileInputRef = React.useRef(null);

  // Settings state
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      system: true
    },
    appearance: {
      theme: 'auto',
      language: 'en',
      fontSize: 'medium'
    },
    system: {
      autoRefresh: true,
      dataSync: true,
      backup: true,
      analytics: false
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30,
      passwordExpiry: 90
    }
  });
  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('appSettings');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.appearance && parsed.appearance.theme) {
          setSettings(parsed);
          applyTheme(parsed.appearance.theme);
        } else {
          applyTheme(settings.appearance.theme);
        }
      } else {
        applyTheme(settings.appearance.theme);
      }
    } catch {
      applyTheme(settings.appearance.theme);
    }
    // Listen to storage changes from other tabs/pages to sync theme live
    const onStorage = (e) => {
      if (e.key === 'appSettings' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed && parsed.appearance && parsed.appearance.theme) {
            setSettings(prev => ({ ...prev, appearance: { ...prev.appearance, ...parsed.appearance } }));
            applyTheme(parsed.appearance.theme);
          }
        } catch {}
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Helper to apply theme selection
  const applyTheme = (theme) => {
    if (theme === 'auto') {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    } else {
      setDarkMode(theme === 'dark');
    }
  };

  // When appearance.theme changes, update darkMode immediately and persist settings
  useEffect(() => {
    applyTheme(settings.appearance.theme);
  }, [settings.appearance.theme]);
  // Apply appearance (theme/lang) and load saved preferences
  React.useEffect(() => {
    try {
      const savedAppearance = localStorage.getItem('appearance');
      if (savedAppearance) {
        const parsed = JSON.parse(savedAppearance);
        setSettings(prev => ({
          ...prev,
          appearance: {
            ...prev.appearance,
            ...parsed
          }
        }));
        applyAppearance(parsed);
      } else {
        applyAppearance(settings.appearance);
      }
    } catch {
      applyAppearance(settings.appearance);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyAppearance = (appearance) => {
    const theme = appearance?.theme || 'auto';
    if (theme === 'dark') {
      setDarkMode(true);
    } else if (theme === 'light') {
      setDarkMode(false);
    } else {
      const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(!!prefersDark);
    }
    if (typeof document !== 'undefined') {
      if (appearance?.language) {
        document.documentElement.setAttribute('lang', appearance.language);
      }
    }
  };



  const updateSetting = (category, key, value) => {
    setSettings(prev => {
      const next = {
        ...prev,
        [category]: {
          ...prev[category],
          [key]: value
        }
      };
      // Persist appearance and apply globally
      if (category === 'appearance') {
        try {
          localStorage.setItem('appearance', JSON.stringify(next.appearance));
        } catch {}
        applyAppearance(next.appearance);
      }
      return next;
    });
    setHasUnsavedChanges(true);
  };

  const handleSaveSettings = async () => {
    try {
      localStorage.setItem('appSettings', JSON.stringify(settings));
      setHasUnsavedChanges(false);
      // Trigger storage event for same-tab components by re-setting value
      localStorage.setItem('appSettings', JSON.stringify(settings));
      alert('Settings saved successfully!');
    } catch (e) {
      alert('Failed to save settings locally');
    }
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      // Reset to default settings
      setSettings({
        notifications: {
          email: true,
          push: true,
          sms: false,
          system: true
        },
        appearance: {
          theme: 'auto',
          language: 'en',
          fontSize: 'medium'
        },
        system: {
          autoRefresh: true,
          dataSync: true,
          backup: true,
          analytics: false
        },
        security: {
          twoFactor: false,
          sessionTimeout: 30,
          passwordExpiry: 90
        }
      });
      setHasUnsavedChanges(false);
    }
  };



  const switchSection = async (section) => {
    setActiveSection(section);
  };

  // Data Management handlers
  const handleExportAllData = () => {
    try {
      const data = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;
        try {
          data[key] = JSON.parse(localStorage.getItem(key));
        } catch {
          data[key] = localStorage.getItem(key);
        }
      }
      const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), data }, null, 2)], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const dateStr = new Date().toISOString().slice(0,19).replace(/[:T]/g,'-');
      a.download = `tm-journey-manager-backup-${dateStr}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      alert('Failed to export data');
      // eslint-disable-next-line no-console
      console.error('Export error:', e);
    }
  };

  const handleImportAllData = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const onImportFileSelected = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const data = parsed?.data || parsed; // accept raw map or wrapped
      if (typeof data !== 'object' || Array.isArray(data)) throw new Error('Invalid format');
      const confirmImport = window.confirm('Importing will overwrite existing data in local storage. Continue?');
      if (!confirmImport) return;
      Object.keys(data).forEach((key) => {
        const value = data[key];
        try {
          localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
        } catch {}
      });
      alert('Data imported. Some settings may require a refresh.');
    } catch (err) {
      alert('Invalid file or import failed');
      // eslint-disable-next-line no-console
      console.error('Import error:', err);
    } finally {
      // reset input so same file can be selected again later
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleClearAllData = () => {
    const ok = window.confirm('This will clear ALL local data for this app. Continue?');
    if (!ok) return;
    try {
      localStorage.clear();
      alert('All local data cleared. The app may need a refresh.');
    } catch {
      alert('Failed to clear local data');
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
            currentLanguage={settings.appearance.language}
          />
        
          <div className="p-6">
            <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className={`text-2xl font-bold ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  System Settings
                </h1>
                <p className={`text-sm ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Configure system preferences and behavior
                </p>
              </div>
              <div className="flex items-center space-x-3">
                {hasUnsavedChanges && (
                  <span className="text-orange-500 text-sm flex items-center space-x-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Unsaved changes</span>
                  </span>
                )}
                <button
                  onClick={handleResetSettings}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Reset to Default
                </button>
                <button
                  onClick={handleSaveSettings}
                  disabled={!hasUnsavedChanges}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                    hasUnsavedChanges
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  } transition-colors`}
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Notifications Settings */}
              <SettingCard
                title="Notifications"
                description="Configure how you receive notifications"
                icon={Bell}
                darkMode={darkMode}
              >
                <div className="space-y-4">
                  <ToggleSwitch
                    enabled={settings.notifications.email}
                    onChange={() => updateSetting('notifications', 'email', !settings.notifications.email)}
                    label="Email Notifications"
                    darkMode={darkMode}
                  />
                  <ToggleSwitch
                    enabled={settings.notifications.push}
                    onChange={() => updateSetting('notifications', 'push', !settings.notifications.push)}
                    label="Push Notifications"
                    darkMode={darkMode}
                  />
                  <ToggleSwitch
                    enabled={settings.notifications.sms}
                    onChange={() => updateSetting('notifications', 'sms', !settings.notifications.sms)}
                    label="SMS Notifications"
                    darkMode={darkMode}
                  />
                  <ToggleSwitch
                    enabled={settings.notifications.system}
                    onChange={() => updateSetting('notifications', 'system', !settings.notifications.system)}
                    label="System Notifications"
                    darkMode={darkMode}
                  />
                </div>
              </SettingCard>

              {/* Appearance Settings */}
              <SettingCard
                title="Appearance"
                description="Customize the look and feel"
                icon={Palette}
                darkMode={darkMode}
              >
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Theme
                    </label>
                    <select
                      value={settings.appearance.theme}
                      onChange={(e) => updateSetting('appearance', 'theme', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        darkMode 
                          ? 'bg-slate-700 border-slate-600 text-white' 
                          : 'bg-white border-gray-300 text-slate-900'
                      }`}
                    >
                      <option value="auto">Auto (System)</option>
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Language
                    </label>
                    <select
                      value={settings.appearance.language}
                      onChange={(e) => updateSetting('appearance', 'language', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        darkMode 
                          ? 'bg-slate-700 border-slate-600 text-white' 
                          : 'bg-white border-gray-300 text-slate-900'
                      }`}
                    >
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                      <option value="ar">العربية</option>
                    </select>
                  </div>
                </div>
              </SettingCard>

              {/* System Settings */}
              <SettingCard
                title="System"
                description="System behavior and performance"
                icon={Settings}
                darkMode={darkMode}
              >
                <div className="space-y-4">
                  <ToggleSwitch
                    enabled={settings.system.autoRefresh}
                    onChange={() => updateSetting('system', 'autoRefresh', !settings.system.autoRefresh)}
                    label="Auto Refresh Data"
                    darkMode={darkMode}
                  />
                  <ToggleSwitch
                    enabled={settings.system.dataSync}
                    onChange={() => updateSetting('system', 'dataSync', !settings.system.dataSync)}
                    label="Data Synchronization"
                    darkMode={darkMode}
                  />
                  <ToggleSwitch
                    enabled={settings.system.backup}
                    onChange={() => updateSetting('system', 'backup', !settings.system.backup)}
                    label="Automatic Backup"
                    darkMode={darkMode}
                  />
                  <ToggleSwitch
                    enabled={settings.system.analytics}
                    onChange={() => updateSetting('system', 'analytics', !settings.system.analytics)}
                    label="Usage Analytics"
                    darkMode={darkMode}
                  />
                </div>
              </SettingCard>

              {/* Security Settings */}
              <SettingCard
                title="Security"
                description="Security and privacy settings"
                icon={Shield}
                darkMode={darkMode}
              >
                <div className="space-y-4">
                  <ToggleSwitch
                    enabled={settings.security.twoFactor}
                    onChange={() => updateSetting('security', 'twoFactor', !settings.security.twoFactor)}
                    label="Two-Factor Authentication"
                    darkMode={darkMode}
                  />
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                      min="5"
                      max="120"
                      className={`w-full px-3 py-2 border rounded-lg ${
                        darkMode 
                          ? 'bg-slate-700 border-slate-600 text-white' 
                          : 'bg-white border-gray-300 text-slate-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Password Expiry (days)
                    </label>
                    <input
                      type="number"
                      value={settings.security.passwordExpiry}
                      onChange={(e) => updateSetting('security', 'passwordExpiry', parseInt(e.target.value))}
                      min="30"
                      max="365"
                      className={`w-full px-3 py-2 border rounded-lg ${
                        darkMode 
                          ? 'bg-slate-700 border-slate-600 text-white' 
                          : 'bg-white border-gray-300 text-slate-900'
                      }`}
                    />
                  </div>
                </div>
              </SettingCard>
            </div>
          </div>

          {/* Data Management */}
            <SettingCard
              title="Data Management"
              description="Export, import, and manage your data"
              icon={Database}
              darkMode={darkMode}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button onClick={handleExportAllData} className={`p-4 border rounded-lg text-center transition-colors ${
                  darkMode 
                    ? 'border-slate-600 hover:bg-slate-700' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}>
                  <Download className={`w-6 h-6 mx-auto mb-2 ${
                    darkMode ? 'text-slate-300' : 'text-slate-600'
                  }`} />
                  <span className={`text-sm font-medium ${
                    darkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Export Data
                  </span>
                </button>
                <button onClick={handleImportAllData} className={`p-4 border rounded-lg text-center transition-colors ${
                  darkMode 
                    ? 'border-slate-600 hover:bg-slate-700' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}>
                  <Upload className={`w-6 h-6 mx-auto mb-2 ${
                    darkMode ? 'text-slate-300' : 'text-slate-600'
                  }`} />
                  <span className={`text-sm font-medium ${
                    darkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Import Data
                  </span>
                </button>
                <button onClick={handleClearAllData} className={`p-4 border rounded-lg text-center transition-colors ${
                  darkMode 
                    ? 'border-red-600 hover:bg-red-900/20' 
                    : 'border-red-300 hover:bg-red-50'
                }`}>
                  <Trash2 className={`w-6 h-6 mx-auto mb-2 text-red-500`} />
                  <span className="text-sm font-medium text-red-500">
                    Clear All Data
                  </span>
                </button>
                {/* Hidden input for Import */}
                <input ref={fileInputRef} onChange={onImportFileSelected} type="file" accept="application/json" style={{ display: 'none' }} />
              </div>
            </SettingCard>
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