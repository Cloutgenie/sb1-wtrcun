import React from 'react'
import { Link } from 'react-router-dom'
import { X, Home, Search, FileText, Pill, Clipboard, BookOpen, Activity, User, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50">
      <div className="flex flex-col h-full bg-white dark:bg-gray-900 w-64 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-primary-600 dark:text-primary-400">Menu</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <nav className="flex-grow">
          <ul className="space-y-4">
            <NavItem to="/" icon={<Home size={20} />} text="Home" onClick={onClose} />
            {user ? (
              <>
                <NavItem to={`/${user.role}/dashboard`} icon={<Activity size={20} />} text="Dashboard" onClick={onClose} />
                {user.role === 'patient' && (
                  <>
                    <NavItem to="/search" icon={<Search size={20} />} text="Find a Doctor" onClick={onClose} />
                    <NavItem to="/medical-records" icon={<FileText size={20} />} text="Medical Records" onClick={onClose} />
                    <NavItem to="/medications" icon={<Pill size={20} />} text="Medications" onClick={onClose} />
                    <NavItem to="/prescriptions" icon={<Clipboard size={20} />} text="Prescriptions" onClick={onClose} />
                    <NavItem to="/education" icon={<BookOpen size={20} />} text="Education" onClick={onClose} />
                    <NavItem to="/health-metrics" icon={<Activity size={20} />} text="Health Metrics" onClick={onClose} />
                  </>
                )}
                <NavItem to="/profile" icon={<User size={20} />} text="Profile" onClick={onClose} />
                <li>
                  <button 
                    onClick={() => { logout(); onClose(); }}
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    <LogOut size={20} className="mr-2" />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <NavItem to="/login" icon={<User size={20} />} text="Login" onClick={onClose} />
                <NavItem to="/register" icon={<User size={20} />} text="Register" onClick={onClose} />
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  )
}

interface NavItemProps {
  to: string
  icon: React.ReactNode
  text: string
  onClick: () => void
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, text, onClick }) => (
  <li>
    <Link
      to={to}
      className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
      onClick={onClick}
    >
      {icon}
      <span className="ml-2">{text}</span>
    </Link>
  </li>
)

export default MobileNav