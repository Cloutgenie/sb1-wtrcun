import React, { useState, useEffect } from 'react'
import { Bell } from 'lucide-react'

interface Notification {
  id: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  timestamp: Date
}

const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    // Simulating fetching notifications from an API
    const fetchNotifications = async () => {
      // In a real application, you would fetch this data from your API
      const mockNotifications: Notification[] = [
        { id: '1', message: 'Your appointment with Dr. Smith is tomorrow at 10:00 AM', type: 'info', timestamp: new Date() },
        { id: '2', message: 'New lab results are available', type: 'success', timestamp: new Date(Date.now() - 86400000) },
        { id: '3', message: 'Please update your insurance information', type: 'warning', timestamp: new Date(Date.now() - 172800000) },
      ]
      setNotifications(mockNotifications)
    }

    fetchNotifications()
  }, [])

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
  }

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'info': return 'bg-blue-100 text-blue-800'
      case 'success': return 'bg-green-100 text-green-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'error': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="relative">
      <button
        onClick={toggleNotifications}
        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
      >
        <Bell size={24} />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
          <div className="py-2">
            <div className="px-4 py-2 font-semibold text-gray-800 border-b">
              Notifications
            </div>
            {notifications.length === 0 ? (
              <div className="px-4 py-2 text-gray-600">No new notifications</div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className="px-4 py-2 hover:bg-gray-100">
                    <p className={`text-sm ${getNotificationColor(notification.type)} rounded p-1`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification.timestamp.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationCenter