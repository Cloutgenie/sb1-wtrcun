import React from 'react'
import { Link } from 'react-router-dom'
import { Activity, Heart, Weight } from 'lucide-react'

const HealthSummary: React.FC = () => {
  // This would typically come from an API call or state management
  const healthData = {
    weight: 70.5,
    bloodPressure: "120/80",
    heartRate: 72,
    lastUpdated: "2024-03-12"
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="space-y-4">
        <div className="flex items-center">
          <Weight className="h-5 w-5 text-blue-500 mr-2" />
          <span className="text-sm font-medium text-gray-700">Weight:</span>
          <span className="ml-2 text-sm text-gray-900">{healthData.weight} kg</span>
        </div>
        <div className="flex items-center">
          <Activity className="h-5 w-5 text-red-500 mr-2" />
          <span className="text-sm font-medium text-gray-700">Blood Pressure:</span>
          <span className="ml-2 text-sm text-gray-900">{healthData.bloodPressure} mmHg</span>
        </div>
        <div className="flex items-center">
          <Heart className="h-5 w-5 text-pink-500 mr-2" />
          <span className="text-sm font-medium text-gray-700">Heart Rate:</span>
          <span className="ml-2 text-sm text-gray-900">{healthData.heartRate} bpm</span>
        </div>
      </div>
      <p className="mt-4 text-xs text-gray-500">Last updated: {healthData.lastUpdated}</p>
      <Link
        to="/health-metrics"
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        View Full Health Metrics
      </Link>
    </div>
  )
}

export default HealthSummary