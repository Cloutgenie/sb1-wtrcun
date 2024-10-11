import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Clock, Calendar } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'

interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  startDate: string
  endDate?: string
}

const MedicationTracker: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingMedication, setEditingMedication] = useState<Medication | null>(null)

  useEffect(() => {
    // Simulating API call to fetch medications
    setTimeout(() => {
      setMedications([
        { id: '1', name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', startDate: '2024-01-01' },
        { id: '2', name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', startDate: '2024-02-15' },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleAddMedication = (medication: Omit<Medication, 'id'>) => {
    const newMedication = { ...medication, id: Date.now().toString() }
    setMedications([...medications, newMedication])
    setShowForm(false)
  }

  const handleEditMedication = (medication: Medication) => {
    setMedications(medications.map(med => med.id === medication.id ? medication : med))
    setEditingMedication(null)
    setShowForm(false)
  }

  const handleDeleteMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id))
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Medication Tracker</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add Medication
        </button>
      </div>

      {showForm && (
        <MedicationForm
          onSubmit={editingMedication ? handleEditMedication : handleAddMedication}
          onCancel={() => {
            setShowForm(false)
            setEditingMedication(null)
          }}
          initialData={editingMedication}
        />
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {medications.map(medication => (
          <MedicationCard
            key={medication.id}
            medication={medication}
            onEdit={() => {
              setEditingMedication(medication)
              setShowForm(true)
            }}
            onDelete={() => handleDeleteMedication(medication.id)}
          />
        ))}
      </div>
    </div>
  )
}

interface MedicationFormProps {
  onSubmit: (medication: Omit<Medication, 'id'>) => void
  onCancel: () => void
  initialData?: Medication | null
}

const MedicationForm: React.FC<MedicationFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [name, setName] = useState(initialData?.name || '')
  const [dosage, setDosage] = useState(initialData?.dosage || '')
  const [frequency, setFrequency] = useState(initialData?.frequency || '')
  const [startDate, setStartDate] = useState(initialData?.startDate || '')
  const [endDate, setEndDate] = useState(initialData?.endDate || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, dosage, frequency, startDate, endDate })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{initialData ? 'Edit' : 'Add'} Medication</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Medication Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Dosage</label>
          <input
            type="text"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Frequency</label>
          <input
            type="text"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date (Optional)</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {initialData ? 'Update' : 'Add'} Medication
        </button>
      </div>
    </form>
  )
}

interface MedicationCardProps {
  medication: Medication
  onEdit: () => void
  onDelete: () => void
}

const MedicationCard: React.FC<MedicationCardProps> = ({ medication, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900">{medication.name}</h3>
        <div className="flex space-x-2">
          <button onClick={onEdit} className="text-blue-600 hover:text-blue-800">
            <Edit2 size={18} />
          </button>
          <button onClick={onDelete} className="text-red-600 hover:text-red-800">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <p className="text-gray-600 mt-2">{medication.dosage}</p>
      <div className="flex items-center mt-2 text-sm text-gray-500">
        <Clock size={16} className="mr-1" />
        <span>{medication.frequency}</span>
      </div>
      <div className="flex items-center mt-2 text-sm text-gray-500">
        <Calendar size={16} className="mr-1" />
        <span>Started: {medication.startDate}</span>
      </div>
      {medication.endDate && (
        <div className="flex items-center mt-1 text-sm text-gray-500">
          <Calendar size={16} className="mr-1" />
          <span>Ends: {medication.endDate}</span>
        </div>
      )}
    </div>
  )
}

export default MedicationTracker