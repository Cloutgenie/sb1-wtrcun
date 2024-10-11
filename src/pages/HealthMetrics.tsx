import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Plus, Edit2, Trash2, Calendar } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'
import { useNotifications } from '../contexts/NotificationContext'

interface HealthMetric {
  id: string
  date: string
  weight: number
  bloodPressure: string
  heartRate: number
}

const HealthMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<HealthMetric[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingMetric, setEditingMetric] = useState<HealthMetric | null>(null)
  const { addNotification } = useNotifications()

  useEffect(() => {
    // Simulating API call to fetch health metrics
    setTimeout(() => {
      setMetrics([
        { id: '1', date: '2024-03-01', weight: 70, bloodPressure: '120/80', heartRate: 72 },
        { id: '2', date: '2024-03-08', weight: 69.5, bloodPressure: '118/78', heartRate: 70 },
        { id: '3', date: '2024-03-15', weight: 69, bloodPressure: '122/82', heartRate: 74 },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleAddMetric = (metric: Omit<HealthMetric, 'id'>) => {
    const newMetric = { ...metric, id: Date.now().toString() }
    setMetrics([...metrics, newMetric])
    setShowForm(false)
    addNotification({ type: 'success', message: 'Health metric added successfully!' })
  }

  const handleEditMetric = (metric: HealthMetric) => {
    setMetrics(metrics.map(m => m.id === metric.id ? metric : m))
    setEditingMetric(null)
    setShowForm(false)
    addNotification({ type: 'success', message: 'Health metric updated successfully!' })
  }

  const handleDeleteMetric = (id: string) => {
    setMetrics(metrics.filter(m => m.id !== id))
    addNotification({ type: 'success', message: 'Health metric deleted successfully!' })
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Health Metrics</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add Metric
        </button>
      </div>

      {showForm && (
        <MetricForm
          onSubmit={editingMetric ? handleEditMetric : handleAddMetric}
          onCancel={() => {
            setShowForm(false)
            setEditingMetric(null)
          }}
          initialData={editingMetric}
        />
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={metrics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line yAxisId="right" type="monotone" dataKey="heartRate" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight (kg)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Pressure</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heart Rate (bpm)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {metrics.map((metric) => (
              <tr key={metric.id}>
                <td className="px-6 py-4 whitespace-nowrap">{metric.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{metric.weight}</td>
                <td className="px-6 py-4 whitespace-nowrap">{metric.bloodPressure}</td>
                <td className="px-6 py-4 whitespace-nowrap">{metric.heartRate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setEditingMetric(metric)
                      setShowForm(true)
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteMetric(metric.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

interface MetricFormProps {
  onSubmit: (metric: Omit<HealthMetric, 'id'>) => void
  onCancel: () => void
  initialData?: HealthMetric | null
}

const MetricForm: React.FC<MetricFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [date, setDate] = useState(initialData?.date || '')
  const [weight, setWeight] = useState(initialData?.weight.toString() || '')
  const [bloodPressure, setBloodPressure] = useState(initialData?.bloodPressure || '')
  const [heartRate, setHeartRate] = useState(initialData?.heartRate.toString() || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      date,
      weight: parseFloat(weight),
      bloodPressure,
      heartRate: parseInt(heartRate, 10)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{initialData ? 'Edit' : 'Add'} Health Metric</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
          <input
            type="number"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Blood Pressure</label>
          <input
            type="text"
            value={bloodPressure}
            onChange={(e) => setBloodPressure(e.target.value)}
            placeholder="e.g., 120/80"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Heart Rate (bpm)</label>
          <input
            type="number"
            value={heartRate}
            onChange={(e) => setHeartRate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
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
          {initialData ? 'Update' : 'Add'} Metric
        </button>
      </div>
    </form>
  )
}

export default HealthMetrics