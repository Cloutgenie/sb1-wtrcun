import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { NotificationProvider } from './contexts/NotificationContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Layout from './components/Layout'
import PrivateRoute from './components/PrivateRoute'
import NotificationToast from './components/NotificationToast'
import PatientHome from './pages/PatientHome'
import PatientDashboard from './pages/PatientDashboard'
import DoctorDashboard from './pages/DoctorDashboard'
import AdminDashboard from './pages/AdminDashboard'
import DoctorSearch from './pages/DoctorSearch'
import AppointmentBooking from './pages/AppointmentBooking'
import TelemedicineConsultation from './pages/TelemedicineConsultation'
import MedicalRecords from './pages/MedicalRecords'
import MedicationTracker from './pages/MedicationTracker'
import PrescriptionManagement from './pages/PrescriptionManagement'
import PatientEducation from './pages/PatientEducation'
import HealthMetrics from './pages/HealthMetrics'
import UserProfile from './pages/UserProfile'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <ThemeProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<PatientHome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/patient/dashboard" element={<PatientDashboard />} />
                  <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/search" element={<DoctorSearch />} />
                  <Route path="/book/:doctorId" element={<AppointmentBooking />} />
                  <Route path="/telemedicine/:appointmentId" element={<TelemedicineConsultation />} />
                  <Route path="/medical-records" element={<MedicalRecords />} />
                  <Route path="/medications" element={<MedicationTracker />} />
                  <Route path="/prescriptions" element={<PrescriptionManagement />} />
                  <Route path="/education" element={<PatientEducation />} />
                  <Route path="/health-metrics" element={<HealthMetrics />} />
                  <Route path="/profile" element={<UserProfile />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
            <NotificationToast />
          </Router>
        </ThemeProvider>
      </NotificationProvider>
    </AuthProvider>
  )
}

export default App