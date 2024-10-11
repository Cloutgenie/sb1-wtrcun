import React from 'react'

interface QuickActionProps {
  icon: React.ReactNode
  label: string
}

const QuickAction: React.FC<QuickActionProps> = ({ icon, label }) => {
  return (
    <button className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
      {icon}
      <span className="mt-2 text-sm font-medium text-gray-700">{label}</span>
    </button>
  )
}

export default QuickAction