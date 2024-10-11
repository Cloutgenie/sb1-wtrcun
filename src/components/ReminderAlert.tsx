import React from 'react'
import { Bell, Pill, Calendar } from 'lucide-react'

interface ReminderAlertProps {
  reminder: {
    id: string
    message: string
    type: 'appointment' | 'medication' | 'general'
  }
}

const ReminderAlert: React.FC<ReminderAlertProps> = ({ reminder }) => {
  const getIcon = () => {
    switch (reminder.type) {
      case 'appointment':
        return <Calendar className="h-5 w-5 text-blue-500" />
      case 'medication':
        return <Pill className="h-5 w-5 text-green-500" />
      default:
        return <Bell className="h-5 w-5 text-yellow-500" />
    }
  }

  return (
    <div className="bg-white shadow rounded-lg p-4 flex items-center">
      <div className="flex-shrink-0 mr-4">
        {getIcon()}
      </div>
      <div className="flex-grow">
        <p className="text-sm font-medium text-gray-900">{reminder.message}</p>
      </div>
      <button className="ml-4 text-sm font-medium text-blue-600 hover:text-blue-500">
        Dismiss
      </button>
    </div>
  )
}

export default ReminderAlert