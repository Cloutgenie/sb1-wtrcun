import React, { useState } from 'react'

interface Setting {
  id: number
  name: string
  enabled: boolean
}

const SystemSettings: React.FC = () => {
  const [settings, setSettings] = useState<Setting[]>([
    { id: 1, name: 'Enable Telemedicine', enabled: true },
    { id: 2, name: 'Allow Patient Self-Registration', enabled: true },
    { id: 3, name: 'Enable SMS Notifications', enabled: false },
    { id: 4, name: 'Maintenance Mode', enabled: false },
  ])

  const toggleSetting = (id: number) => {
    setSettings(settings.map(setting =>
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ))
  }

  return (
    <ul className="divide-y divide-gray-200">
      {settings.map((setting) => (
        <li key={setting.id} className="py-4 flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-900">{setting.name}</p>
            <p className="text-sm text-gray-500">{setting.enabled ? 'Enabled' : 'Disabled'}</p>
          </div>
          <button
            onClick={() => toggleSetting(setting.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              setting.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}
          >
            {setting.enabled ? 'On' : 'Off'}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default SystemSettings