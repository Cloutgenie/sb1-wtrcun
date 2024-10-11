import React from 'react'

const RecentActivityList: React.FC = () => {
  const activities = [
    { id: 1, description: 'New user registered', time: '5 minutes ago' },
    { id: 2, description: 'Dr. Smith updated patient records', time: '1 hour ago' },
    { id: 3, description: 'System maintenance completed', time: '3 hours ago' },
    { id: 4, description: 'New appointment booked', time: '5 hours ago' },
  ]

  return (
    <ul className="divide-y divide-gray-200">
      {activities.map((activity) => (
        <li key={activity.id} className="py-3">
          <p className="text-sm font-medium text-gray-900">{activity.description}</p>
          <p className="text-sm text-gray-500">{activity.time}</p>
        </li>
      ))}
    </ul>
  )
}

export default RecentActivityList