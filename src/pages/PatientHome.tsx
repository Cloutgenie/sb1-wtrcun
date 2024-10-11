import React from 'react'
import { Link } from 'react-router-dom'
import { Search, Calendar, MessageSquare, Activity } from 'lucide-react'

const FeatureCard: React.FC<{
  icon: React.ReactNode
  title: string
  description: string
  linkTo: string
  linkText: string
}> = ({ icon, title, description, linkTo, linkText }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-center mb-4 text-green-600">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
    <p className="mb-4 text-gray-600">{description}</p>
    <Link
      to={linkTo}
      className="inline-block text-green-600 font-medium hover:underline"
    >
      {linkText}
    </Link>
  </div>
)

const DoctorCard: React.FC<{
  name: string
  specialty: string
  imageUrl: string
}> = ({ name, specialty, imageUrl }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <img src={imageUrl} alt={name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
    <h3 className="text-xl font-semibold mb-2 text-center text-gray-900">{name}</h3>
    <p className="text-center text-gray-600">{specialty}</p>
    <Link
      to="/search"
      className="mt-4 block text-center text-green-600 font-medium hover:underline"
    >
      Book Appointment
    </Link>
  </div>
)

const PatientHome: React.FC = () => {
  return (
    <div className="space-y-12 px-4 py-8 bg-green-50">
      {/* Hero Section */}
      <section className="text-center bg-gradient-to-r from-green-500 to-green-600 text-white py-20 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to CareAble</h1>
        <p className="text-xl mb-8">Your one-stop platform for managing your healthcare needs</p>
        <Link
          to="/search"
          className="bg-white text-green-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition duration-300"
        >
          Find a Doctor
        </Link>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Our Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Search size={48} />}
            title="Find a Doctor"
            description="Search for healthcare providers based on specialty, location, and availability."
            linkTo="/search"
            linkText="Search Now"
          />
          <FeatureCard
            icon={<Calendar size={48} />}
            title="Book Appointments"
            description="Schedule your next visit with just a few clicks. Easy and convenient."
            linkTo="/dashboard"
            linkText="View Calendar"
          />
          <FeatureCard
            icon={<MessageSquare size={48} />}
            title="Telemedicine"
            description="Connect with healthcare providers from the comfort of your home."
            linkTo="/dashboard"
            linkText="Start Consultation"
          />
        </div>
      </section>

      {/* Doctor List Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Our Top Doctors</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DoctorCard
            name="Dr. Emily Johnson"
            specialty="Cardiologist"
            imageUrl="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
          />
          <DoctorCard
            name="Dr. Michael Chen"
            specialty="Dermatologist"
            imageUrl="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
          />
          <DoctorCard
            name="Dr. Sarah Patel"
            specialty="Pediatrician"
            imageUrl="https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
          />
        </div>
        <div className="text-center mt-8">
          <Link
            to="/search"
            className="bg-green-600 text-white px-6 py-3 rounded-full font-bold hover:bg-green-700 transition duration-300"
          >
            View All Doctors
          </Link>
        </div>
      </section>
    </div>
  )
}

export default PatientHome