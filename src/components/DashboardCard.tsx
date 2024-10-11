import React from 'react'

interface DashboardCardProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  className?: string
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, icon, children, className }) => {
  return (
    <div className={`bg-white shadow rounded-lg p-6 ${className}`}>
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </h2>
      {children}
    </div>
  )
}

export default DashboardCard