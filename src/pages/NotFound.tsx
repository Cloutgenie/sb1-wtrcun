import React from 'react'
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors inline-flex items-center">
        <Home className="mr-2" size={20} />
        Go to Homepage
      </Link>
    </div>
  )
}

export default NotFound