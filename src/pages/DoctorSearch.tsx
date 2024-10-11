import React, { useState, useEffect } from 'react'
import { MapPin, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import SearchBar from '../components/SearchBar'

interface Doctor {
  id: number
  name: string
  specialty: string
  rating: number
  location: string
}

const DoctorSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setDoctors([
        { id: 1, name: "Dr. Emily Johnson", specialty: "Cardiology", rating: 4.8, location: "New York, NY" },
        { id: 2, name: "Dr. Michael Chen", specialty: "Dermatology", rating: 4.7, location: "Los Angeles, CA" },
        { id: 3, name: "Dr. Sarah Patel", specialty: "Pediatrics", rating: 4.9, location: "Chicago, IL" },
        { id: 4, name: "Dr. David Kim", specialty: "Orthopedics", rating: 4.6, location: "Houston, TX" },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleSearch = (query: string) => {
    setSearchTerm(query)
  }

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (specialty === '' || doctor.specialty === specialty)
  )

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Find a Doctor</h1>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <SearchBar onSearch={handleSearch} placeholder="Search doctors by name" />
        </div>
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        >
          <option value="">All Specialties</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Dermatology">Dermatology</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Orthopedics">Orthopedics</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105">
            <h2 className="text-xl font-semibold mb-2">{doctor.name}</h2>
            <p className="text-gray-600 mb-2">{doctor.specialty}</p>
            <div className="flex items-center mb-2">
              <MapPin className="text-gray-400 mr-1" size={16} />
              <span className="text-sm text-gray-600">{doctor.location}</span>
            </div>
            <div className="flex items-center mb-4">
              <Star className="text-yellow-400 mr-1" size={16} />
              <span className="text-sm font-semibold">{doctor.rating}</span>
            </div>
            <Link to={`/book/${doctor.id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors inline-block">
              Book Appointment
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorSearch