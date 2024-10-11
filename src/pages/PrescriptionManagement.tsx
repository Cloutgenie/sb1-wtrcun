import React, { useState, useEffect } from 'react'
import { FileText, Plus, Edit2, Trash2 } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'

interface Prescription {
  id: string
  medication: string
  dosage: string
  frequency: string
  startDate: string
  endDate: string
  prescribedBy: string
}

const PrescriptionManagement: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPrescription, setEditingPrescription] = useState<Prescription | null>(null)

  useEffect(() => {
    // Simulating API call to fetch prescriptions
    setTimeout(() => {
      setPrescriptions([
        {
          id: '1',
          medication: 'Lisinopril',
          dosage: '10mg',
          frequency: 'Once daily',
          startDate: '2024-03-01',
          endDate: '2024-06-01',
          prescribedBy: 'Dr. Johnson'
        },
        {
          id: '2',
          medication: 'Metformin',
          dosage: '500mg',
          frequency: 'Twice daily',
          startDate: '2024-02-15',
          endDate: '2024-08-15',
          prescribedBy: 'Dr. Smith'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleAddPrescription = (prescription: Omit<Prescription, 'id'>) => {
    const newPrescription = { ...prescription, id: Date.now().toString() }
    setPrescriptions([...prescriptions, newPrescription])
    setShowForm(false)
  }

  const handleEditPrescription = (prescription: Prescription) => {
    setPrescriptions(prescriptions.map(p => p.id === prescription.id ? prescription : p))
    setEditingPrescription(null)
    setShowForm(false)
  }

  const handleDeletePrescription = (id: string) => {
    setPrescriptions(prescriptions.filter(p => p.id !== id))
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Prescription Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add Prescription
        </button>
      </div>

      {showForm && (
        <PrescriptionForm
          onSubmit={editingPrescription ? handleEditPrescription : handleAddPrescription}
          onCancel={() => {
            setShowForm(false)
            setEditingPrescription(null)
          }}
          initialData={editingPrescription}
        />
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {prescriptions.map(prescription => (
          <PrescriptionCard
            key={prescription.id}
            prescription={prescription}
            onEdit={() => {
              setEditingPrescription(prescription)
              setShowForm(true)
            }}
            onDelete={() => handleDeletePrescription(prescription.id)}
          />
        ))}
      </div>
    </div>
  )
}

interface PrescriptionFormProps {
  onSubmit: (prescription: Omit<Prescription, 'id'>) => void
  onCancel: () => void
  initialData?: Prescription | null
}

const PrescriptionForm: React.FC<PrescriptionFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    medication: '',
    dosage: '',
    frequency: '',
    startDate: '',
    endDate: '',
    prescribedBy: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData as Omit<Prescription, 'id'>)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{initialData ? 'Edit' : 'Add'} Prescription</h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="medication"
          value={formData.medication}
          onChange={handleChange}
          placeholder="Medication"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="dosage"
          value={formData.dosage}
          onChange={handleChange}
          placeholder="Dosage"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
          placeholder="Frequency"
          className="p-2 border rounded"
          required
        />
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="prescribedBy"
          value={formData.prescribedBy}
          onChange={handleChange}
          placeholder="Prescribed By"
          className="p-2 border rounded"
          required
        />
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {initialData ? 'Update' : 'Add'} Prescription
        </button>
      </div>
    </form>
  )
}

interface PrescriptionCardProps {
  prescription: Prescription
  onEdit: () => void
  onDelete: () => void
}

const PrescriptionCard: React.FC<PrescriptionCardProps> = ({ prescription, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900">{prescription.medication}</h3>
        <div className="flex space-x-2">
          <button onClick={onEdit} className="text-blue-600 hover:text-blue-800">
            <Edit2 size={18} />
          </button>
          <button onClick={onDelete} className="text-red-600 hover:text-red-800">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <p className="text-gray-600 mt-2">{prescription.dosage}</p>
      <p className="text-gray-600">{prescription.frequency}</p>
      <p className="text-sm text-gray-500 mt-2">Start: {prescription.startDate}</p>
      <p className="text-sm text-gray-500">End: {prescription.endDate}</p>
      <p className="text-sm text-gray-500 mt-2">Prescribed by: {prescription.prescribedBy}</p>
    </div>
  )
}

export default PrescriptionManagement