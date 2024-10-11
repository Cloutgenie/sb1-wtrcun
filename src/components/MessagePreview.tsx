import React from 'react'
import { Link } from 'react-router-dom'

interface MessagePreviewProps {
  message: {
    id: string
    doctor: string
    lastMessage: string
    timestamp: string
  }
}

const MessagePreview: React.FC<MessagePreviewProps> = ({ message }) => {
  return (
    <Link to={`/messages/${message.id}`} className="block">
      <div className="bg-white shadow rounded-lg p-4 hover:bg-gray-50 transition duration-150 ease-in-out">
        <h3 className="text-lg font-semibold text-gray-900">{message.doctor}</h3>
        <p className="mt-1 text-sm text-gray-600 truncate">{message.lastMessage}</p>
        <p className="mt-2 text-xs text-gray-500">{message.timestamp}</p>
      </div>
    </Link>
  )
}

export default MessagePreview