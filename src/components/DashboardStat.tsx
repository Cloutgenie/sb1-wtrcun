import React from 'react'
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

interface DashboardStatProps {
  stat: {
    title: string
    value: string
    icon: React.ReactNode
    change: string
    trend: 'up' | 'down'
  }
}

const DashboardStat: React.FC<DashboardStatProps> = ({ stat }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`p-3 rounded-md ${
              stat.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {stat.icon}
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{stat.title}</dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">{stat.value}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          <span className={`font-medium ${
            stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
          } mr-2`}>
            {stat.trend === 'up' ? <ArrowUpIcon className="inline h-4 w-4" /> : <ArrowDownIcon className="inline h-4 w-4" />}
            {stat.change}
          </span>
          <span className="text-gray-500">from last month</span>
        </div>
      </div>
    </div>
  )
}

export default DashboardStat