import React from 'react'
import { Clock, Video, MapPin } from 'lucide-react'

interface AppointmentItemProps {
  appointment: {
    id: string
    patientName: string
    time: string
    type: 'In-person' | 'Telemedicine'
    reason?: string
  }
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({ appointment }) => {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
      <div>
        <p className="font-semibold">{appointment.patientName}</p>
        <div className="flex items-center text-sm text-gray-500">
          <Clock size={14} className="mr-1" />
          <span>{appointment.time}</span>
        </div>
        {appointment.reason && (
          <p className="text-sm text-gray-600 mt-1">{appointment.reason}</p>
        )}
      </div>
      <div className="text-right">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          appointment.type === 'Telemedicine' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
        }`}>
          {appointment.type === 'Telemedicine' ? <Video size={14} className="inline mr-1" /> : <MapPin size={14} className="inline mr-1" />}
          {appointment.type}
        </span>
      </div>
    </div>
  )
}

export default AppointmentItem