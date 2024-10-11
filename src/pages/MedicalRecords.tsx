import React, { useState, useEffect } from 'react'
import { FileText, Download, Eye, Search, Filter } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'
import MedicalRecordDetail from '../components/MedicalRecordDetail'

interface MedicalRecord {
  id: string
  type: string
  date: string
  doctor: string
  description: string
  fileUrl?: string
  details?: string
}

const MedicalRecords: React.FC = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 5

  useEffect(() => {
    // Simulating API call to fetch medical records
    setTimeout(() => {
      setRecords([
        { 
          id: '1', 
          type: 'Lab Result', 
          date: '2024-02-15', 
          doctor: 'Dr. Smith', 
          description: 'Blood Test Results',
          details: 'Hemoglobin: 14.2 g/dL\nWhite Blood Cell Count: 7,500 cells/mcL\nPlatelet Count: 250,000 platelets/mcL\n\nAll results within normal range.'
        },
        { 
          id: '2', 
          type: 'Prescription', 
          date: '2024-01-20', 
          doctor: 'Dr. Johnson', 
          description: 'Antibiotic Prescription',
          details: 'Medication: Amoxicillin\nDosage: 500mg\nFrequency: 3 times daily\nDuration: 7 days\n\nTake with food. Complete entire course of antibiotics.'
        },
        { 
          id: '3', 
          type: 'Imaging', 
          date: '2023-12-05', 
          doctor: 'Dr. Lee', 
          description: 'Chest X-Ray', 
          fileUrl: '#',
          details: 'Findings: Clear lung fields. No evidence of pneumonia or other abnormalities.'
        },
        { 
          id: '4', 
          type: 'Visit Summary', 
          date: '2023-11-10', 
          doctor: 'Dr. Patel', 
          description: 'Annual Check-up Summary',
          details: 'Blood Pressure: 120/80 mmHg\nHeart Rate: 72 bpm\nWeight: 70 kg\nBMI: 24.5\n\nOverall health status: Good. Recommended to maintain current diet and exercise routine.'
        },
        { 
          id: '5', 
          type: 'Lab Result', 
          date: '2023-10-01', 
          doctor: 'Dr. Garcia', 
          description: 'Cholesterol Panel',
          details: 'Total Cholesterol: 180 mg/dL\nHDL: 55 mg/dL\nLDL: 110 mg/dL\nTriglycerides: 75 mg/dL\n\nResults within normal range. Continue current lifestyle habits.'
        },
        { 
          id: '6', 
          type: 'Prescription', 
          date: '2023-09-15', 
          doctor: 'Dr. Wilson', 
          description: 'Allergy Medication',
          details: 'Medication: Cetirizine\nDosage: 10mg\nFrequency: Once daily\nDuration: As needed for allergy symptoms'
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleViewRecord = (record: MedicalRecord) => {
    setSelectedRecord(record)
  }

  const handleCloseDetail = () => {
    setSelectedRecord(null)
  }

  const filteredRecords = records.filter(record => 
    (record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
     record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
     record.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterType === '' || record.type === filterType)
  )

  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Medical Records</h1>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search records..."
            className="w-full pl-10 pr-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="text-gray-400" size={20} />
          <select
            className="border rounded-md px-2 py-2"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Lab Result">Lab Result</option>
            <option value="Prescription">Prescription</option>
            <option value="Imaging">Imaging</option>
            <option value="Visit Summary">Visit Summary</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRecords.map((record) => (
              <tr key={record.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FileText className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{record.type}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{record.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{record.doctor}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{record.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                    onClick={() => handleViewRecord(record)}
                  >
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {record.fileUrl && (
                    <a href={record.fileUrl} className="text-green-600 hover:text-green-900" download>
                      <Download className="h-5 w-5" aria-hidden="true" />
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        recordsPerPage={recordsPerPage}
        totalRecords={filteredRecords.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      {selectedRecord && (
        <MedicalRecordDetail record={selectedRecord} onClose={handleCloseDetail} />
      )}
    </div>
  )
}

interface PaginationProps {
  recordsPerPage: number
  totalRecords: number
  paginate: (pageNumber: number) => void
  currentPage: number
}

const Pagination: React.FC<PaginationProps> = ({ recordsPerPage, totalRecords, paginate, currentPage }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul className="flex justify-center space-x-2">
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-1 rounded-md ${
                currentPage === number
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default MedicalRecords