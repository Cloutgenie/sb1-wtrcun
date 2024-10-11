import React, { useState, useEffect } from 'react'
import { Calendar, User, FileText, MessageSquare, Activity } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import DashboardCard from '../components/DashboardCard'
import AppointmentItem from '../components/AppointmentItem'
import PatientItem from '../components/PatientItem'
import QuickAction from '../components/QuickAction'
import SearchBar from '../components/SearchBar'

// ... (keep existing interfaces)

const DoctorDashboard: React.FC = () => {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [recentPatients, setRecentPatients] = useState<Patient[]>([])
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([])
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([])

  useEffect(() => {
    // Fetch appointments and recent patients
    // This is a mock implementation. In a real app, you'd call your API here.
    setAppointments([
      { id: '1', patientName: 'John Doe', time: '09:00 AM', type: 'In-person', reason: 'Annual check-up' },
      { id: '2', patientName: 'Jane Smith', time: '10:30 AM', type: 'Telemedicine', reason: 'Follow-up consultation' },
      { id: '3', patientName: 'Alice Johnson', time: '02:00 PM', type: 'In-person', reason: 'New patient consultation' },
    ])

    setRecentPatients([
      { id: '1', name: 'John Doe', age: 45, lastVisit: '2024-02-28' },
      { id: '2', name: 'Jane Smith', age: 32, lastVisit: '2024-03-01' },
      { id: '3', name: 'Alice Johnson', age: 58, lastVisit: '2024-03-05' },
    ])
  }, [])

  useEffect(() => {
    setFilteredAppointments(appointments)
    setFilteredPatients(recentPatients)
  }, [appointments, recentPatients])

  const handleSearch = (query: string) => {
    const lowercaseQuery = query.toLowerCase()
    setFilteredAppointments(appointments.filter(appointment => 
      appointment.patientName.toLowerCase().includes(lowercaseQuery) ||
      appointment.reason?.toLowerCase().includes(lowercaseQuery)
    ))
    setFilteredPatients(recentPatients.filter(patient => 
      patient.name.toLowerCase().includes(lowercaseQuery)
    ))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="py-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, Dr. {user?.name}</h1>
      </header>

      <SearchBar onSearch={handleSearch} placeholder="Search patients or appointments..." />

      <main className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Today's Appointments"
          icon={<Calendar className="text-blue-500" />}
          className="col-span-2"
        >
          <div className="space-y-4">
            {filteredAppointments.map(appointment => (
              <AppointmentItem key={appointment.id} appointment={appointment} />
            ))}
          </div>
        </DashboardCard>

        <DashboardCard
          title="Recent Patients"
          icon={<User className="text-green-500" />}
        >
          <div className="space-y-4">
            {filteredPatients.map(patient => (
              <PatientItem key={patient.id} patient={patient} />
            ))}
          </div>
        </DashboardCard>

        {/* ... (keep the rest of the components) */}
      </main>
    </div>
  )
}

export default DoctorDashboard