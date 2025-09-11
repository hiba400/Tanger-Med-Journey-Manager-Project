import React, { useState, useEffect } from 'react';
import { Bell, X, Check, AlertTriangle, Info, Clock } from 'lucide-react';

const NotificationPanel = ({ isOpen, onClose, darkMode }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'urgent',
      title: 'Breakdown Request',
      message: 'New urgent breakdown request from Terminal 1 - Berth A3',
      time: '2 minutes ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'info',
      title: 'Driver Status Update',
      message: 'Driver Youssef Benjelloun is now available',
      time: '5 minutes ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'warning',
      title: 'System Maintenance',
      message: 'Scheduled maintenance in 30 minutes',
      time: '15 minutes ago',
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'success',
      title: 'Request Completed',
      message: 'Breakdown assistance request #1234 completed successfully',
      time: '1 hour ago',
      read: true,
      priority: 'medium'
    }
  ]);

  const [filter, setFilter] = useState('all'); // all, unread, urgent

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'urgent':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'success':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-blue-500';
      default:
        return 'border-l-gray-500';
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'urgent') return notif.type === 'urgent';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className={`absolute right-0 top-0 h-full w-96 max-w-sm transform transition-transform duration-300 ease-in-out translate-x-0`}>
        <div className={`h-full flex flex-col ${
          darkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'
        } shadow-xl`}>
          {/* Header */}
          <div className={`flex items-center justify-between p-4 border-b ${
            darkMode ? 'border-slate-700' : 'border-gray-200'
          }`}>
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
                  : 'hover:bg-gray-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Filters */}
          <div className={`p-4 border-b ${
            darkMode ? 'border-slate-700' : 'border-gray-200'
          }`}>
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-500 text-white'
                    : darkMode
                      ? 'text-slate-400 hover:text-white hover:bg-slate-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-gray-100'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  filter === 'unread'
                    ? 'bg-blue-500 text-white'
                    : darkMode
                      ? 'text-slate-400 hover:text-white hover:bg-slate-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-gray-100'
                }`}
              >
                Unread ({unreadCount})
              </button>
              <button
                onClick={() => setFilter('urgent')}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  filter === 'urgent'
                    ? 'bg-red-500 text-white'
                    : darkMode
                      ? 'text-slate-400 hover:text-white hover:bg-slate-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-gray-100'
                }`}
              >
                Urgent
              </button>
            </div>
            
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="mt-3 text-sm text-blue-500 hover:text-blue-600 transition-colors"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-center">
                <Bell className={`w-12 h-12 mb-2 ${
                  darkMode ? 'text-slate-600' : 'text-slate-400'
                }`} />
                <p className={`${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  No notifications to show
                </p>
              </div>
            ) : (
              <div className="p-2">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`mb-3 p-4 rounded-lg border-l-4 transition-all duration-200 ${
                      darkMode 
                        ? 'bg-slate-700 border-slate-600 hover:bg-slate-600' 
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    } ${getPriorityColor(notification.priority)} ${
                      !notification.read ? 'ring-2 ring-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-sm font-medium ${
                            darkMode ? 'text-white' : 'text-slate-900'
                          }`}>
                            {notification.title}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs ${
                              darkMode ? 'text-slate-400' : 'text-slate-500'
                            }`}>
                              {notification.time}
                            </span>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            )}
                          </div>
                        </div>
                        
                        <p className={`text-sm mt-1 ${
                          darkMode ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center space-x-2 mt-3">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className={`text-xs px-2 py-1 rounded transition-colors ${
                                darkMode
                                  ? 'text-blue-400 hover:text-blue-300 hover:bg-slate-600'
                                  : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                              }`}
                            >
                              Mark as read
                            </button>
                          )}
                          
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className={`text-xs px-2 py-1 rounded transition-colors ${
                              darkMode
                                ? 'text-red-400 hover:text-red-300 hover:bg-slate-600'
                                : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                            }`}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className={`p-4 border-t ${
            darkMode ? 'border-slate-700' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between text-sm">
              <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>
                {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
              </span>
              <button
                onClick={() => setNotifications([])}
                className={`text-red-500 hover:text-red-600 transition-colors ${
                  darkMode ? 'hover:bg-slate-700' : 'hover:bg-red-50'
                } px-2 py-1 rounded`}
              >
                Clear all
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;

