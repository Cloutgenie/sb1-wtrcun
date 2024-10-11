import React from 'react'
import { X, Download, FileText, Calendar, User } from 'lucide-react'

interface MedicalRecordDetailProps {
  record: {
    id: string
    type: string
    date: string
    doctor: string
    description: string
    fileUrl?: string
    details?: string
  }
  onClose: () => void
}

const MedicalRecordDetail: React.FC<MedicalRecordDetailProps> = ({ record, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{record.type}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X size={24} />
          </button>
        </div>
        <div className="mt-2 space-y-4">
          <div className="flex items-center">
            <Calendar className="mr-2 text-gray-400" size={20} />
            <p className="text-sm text-gray-600">Date: {record.date}</p>
          </div>
          <div className="flex items-center">
            <User className="mr-2 text-gray-400" size={20} />
            <p className="text-sm text-gray-600">Doctor: {record.doctor}</p>
          </div>
          <div className="flex items-start">
            <FileText className="mr-2 text-gray-400 mt-1" size={20} />
            <div>
              <p className="text-sm font-medium text-gray-900">Description:</p>
              <p className="text-sm text-gray-600">{record.description}</p>
            </div>
          </div>
          {record.details && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-900">Details:</p>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{record.details}</p>
            </div>
          )}
          {record.fileUrl && (
            <div className="mt-4">
              <a
                href={record.fileUrl}
                download
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Download className="mr-2" size={16} />
                Download File
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MedicalRecordDetail