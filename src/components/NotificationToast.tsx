import React from 'react'
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react'
import { useNotifications } from '../contexts/NotificationContext'

const NotificationToast: React.FC = () => {
  const { notifications, removeNotification } = useNotifications()

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-500" />
      case 'error':
        return <AlertCircle className="text-red-500" />
      case 'warning':
        return <AlertTriangle className="text-yellow-500" />
      default:
        return <Info className="text-blue-500" />
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-white border-l-4 border-blue-500 rounded-md shadow-md mb-2 flex items-center p-4 w-80"
          style={{ borderLeftColor: notification.type === 'success' ? '#10B981' : notification.type === 'error' ? '#EF4444' : notification.type === 'warning' ? '#F59E0B' : '#3B82F6' }}
        >
          <div className="mr-3">
            {getIcon(notification.type)}
          </div>
          <div className="flex-grow">
            <p className="text-sm font-medium text-gray-900">{notification.message}</p>
          </div>
          <button
            onClick={() => removeNotification(notification.id)}
            className="ml-4 text-gray-400 hover:text-gray-500"
          >
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  )
}

export default NotificationToast