import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, FileText, MessageSquare, Bell, Activity, User, Video, CheckSquare } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useNotifications } from '../contexts/NotificationContext'
import AppointmentCard from '../components/AppointmentCard'
import MessagePreview from '../components/MessagePreview'
import ReminderAlert from '../components/ReminderAlert'
import HealthSummary from '../components/HealthSummary'
import LoadingSpinner from '../components/LoadingSpinner'

interface Appointment {
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

interface Message {
  id: string
  doctor: string
  lastMessage: string
  timestamp: string
}

interface Reminder {
  id: string
  message: string
  type: 'appointment' | 'medication' | 'general'
}

const PatientDashboard: React.FC = () => {
  const { user } = useAuth()
  const { notifications } = useNotifications()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Mock data (replace with actual API calls in a real application)
        setAppointments([
          {
            id: '1',
            doctor: { name: 'Dr. Emily Johnson', image: 'https://example.com/doctor1.jpg' },
            specialty: 'Cardiology',
            date: '2024-03-15',
            time: '10:00 AM',
            type: 'in-person',
            status: 'confirmed'
          },
          {
            id: '2',
            doctor: { name: 'Dr. Michael Chen', image: 'https://example.com/doctor2.jpg' },
            specialty: 'Dermatology',
            date: '2024-03-20',
            time: '2:30 PM',
            type: 'telemedicine',
            status: 'pending'
          }
        ])

        setMessages([
          { id: '1', doctor: 'Dr. Emily Johnson', lastMessage: 'Your test results are ready...', timestamp: '2024-03-10 09:30 AM' },
          { id: '2', doctor: 'Dr. Michael Chen', lastMessage: "How's the new medication working?", timestamp: '2024-03-09 03:15 PM' }
        ])

        setReminders([
          { id: '1', message: 'Appointment with Dr. Johnson tomorrow at 10:00 AM', type: 'appointment' },
          { id: '2', message: 'Take blood pressure medication', type: 'medication' }
        ])

        setLoading(false)
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
        setError('Failed to load dashboard data. Please try again later.')
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">Welcome, {user?.name}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Upcoming Appointments</h2>
            <div className="space-y-4">
              {appointments.map(appointment => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
            </div>
            <Link to="/search" className="mt-4 inline-block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Schedule New Appointment
            </Link>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Recent Messages</h2>
            <div className="space-y-4">
              {messages.map(message => (
                <MessagePreview key={message.id} message={message} />
              ))}
            </div>
            <Link to="/messages" className="mt-4 inline-block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              View All Messages
            </Link>
          </section>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Health Summary</h2>
            <HealthSummary />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Reminders & Alerts</h2>
            <div className="space-y-4">
              {reminders.map(reminder => (
                <ReminderAlert key={reminder.id} reminder={reminder} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard