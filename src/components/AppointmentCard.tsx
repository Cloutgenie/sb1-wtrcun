import React from 'react'
import { Link } from 'react-router-dom'
import { Video, MapPin } from 'lucide-react'

interface AppointmentCardProps {
  appointment: {
    id: string
    doctor: {
      name: string
      image: string
    }
    specialty: string
    date: string
    time: string
    type: 'in-person' | 'telemedicine'
    status: 'confirmed' | 'pending'
  }
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center">
        <img className="h-16 w-16 rounded-full mr-4" src={appointment.doctor.image} alt={appointment.doctor.name} />
        <div>
          <h3 className="text-lg font-semibold">{appointment.doctor.name}</h3>
          <p className="text-gray-600">{appointment.specialty}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700">
          {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
        </p>
        <div className="flex items-center mt-2">
          {appointment.type === 'telemedicine' ? (
            <Video className="h-5 w-5 text-blue-500 mr-2" />
          ) : (
            <MapPin className="h-5 w-5 text-green-500 mr-2" />
          )}
          <span className="text-sm font-medium text-gray-700">
            {appointment.type === 'telemedicine' ? 'Telemedicine' : 'In-person'}
          </span>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {appointment.status}
        </span>
        <div>
          {appointment.type === 'telemedicine' && (
            <Link
              to={`/telemedicine/${appointment.id}`}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Join Telemedicine
            </Link>
          )}
          <button className="ml-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Reschedule
          </button>
        </div>
      </div>
    </div>
  )
}

export default AppointmentCard