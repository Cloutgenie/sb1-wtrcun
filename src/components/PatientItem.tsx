import React from 'react'
import { Calendar } from 'lucide-react'

interface PatientItemProps {
  patient: {
    id: string
    name: string
    age: number
    lastVisit: string
  }
}

const PatientItem: React.FC<PatientItemProps> = ({ patient }) => {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
      <div>
        <p className="font-semibold">{patient.name}</p>
        <p className="text-sm text-gray-500">Age: {patient.age}</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">Last Visit</p>
        <p className="text-sm font-semibold flex items-center">
          <Calendar size={14} className="mr-1" />
          {patient.lastVisit}
        </p>
      </div>
    </div>
  )
}

export default PatientItem