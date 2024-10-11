import React, { useState, useEffect } from 'react'
import { User, Mail, Phone, MapPin, Calendar, Edit2 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import LoadingSpinner from '../components/LoadingSpinner'

interface UserProfileData {
  name: string
  email: string
  phone: string
  address: string
  dateOfBirth: string
  bloodType: string
  emergencyContact: string
}

const UserProfile: React.FC = () => {
  const { user } = useAuth()
  const [profileData, setProfileData] = useState<UserProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // Simulating API call to fetch user profile data
    setTimeout(() => {
      setProfileData({
        name: user?.name || 'John Doe',
        email: user?.email || 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, Anytown, USA 12345',
        dateOfBirth: '1990-01-01',
        bloodType: 'A+',
        emergencyContact: 'Jane Doe: +1 (555) 987-6543',
      })
      setLoading(false)
    }, 1000)
  }, [user])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    // Here you would typically send the updated profile data to your backend
    console.log('Saving profile data:', profileData)
    setIsEditing(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData(prevData => ({
      ...prevData!,
      [name]: value,
    }))
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <Edit2 size={18} className="mr-1" />
                Edit Profile
              </button>
            )}
          </div>
          {profileData && (
            <div className="space-y-6">
              <ProfileField
                icon={<User />}
                label="Name"
                value={profileData.name}
                isEditing={isEditing}
                name="name"
                onChange={handleInputChange}
              />
              <ProfileField
                icon={<Mail />}
                label="Email"
                value={profileData.email}
                isEditing={isEditing}
                name="email"
                onChange={handleInputChange}
              />
              <ProfileField
                icon={<Phone />}
                label="Phone"
                value={profileData.phone}
                isEditing={isEditing}
                name="phone"
                onChange={handleInputChange}
              />
              <ProfileField
                icon={<MapPin />}
                label="Address"
                value={profileData.address}
                isEditing={isEditing}
                name="address"
                onChange={handleInputChange}
              />
              <ProfileField
                icon={<Calendar />}
                label="Date of Birth"
                value={profileData.dateOfBirth}
                isEditing={isEditing}
                name="dateOfBirth"
                onChange={handleInputChange}
                type="date"
              />
              <ProfileField
                icon={<User />}
                label="Blood Type"
                value={profileData.bloodType}
                isEditing={isEditing}
                name="bloodType"
                onChange={handleInputChange}
              />
              <ProfileField
                icon={<Phone />}
                label="Emergency Contact"
                value={profileData.emergencyContact}
                isEditing={isEditing}
                name="emergencyContact"
                onChange={handleInputChange}
              />
            </div>
          )}
          {isEditing && (
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface ProfileFieldProps {
  icon: React.ReactNode
  label: string
  value: string
  isEditing: boolean
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
}

const ProfileField: React.FC<ProfileFieldProps> = ({
  icon,
  label,
  value,
  isEditing,
  name,
  onChange,
  type = 'text',
}) => (
  <div className="flex items-center">
    <div className="flex-shrink-0 text-gray-400 mr-4">{icon}</div>
    <div className="flex-grow">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      {isEditing ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      ) : (
        <p className="mt-1 text-sm text-gray-900">{value}</p>
      )}
    </div>
  </div>
)

export default UserProfile