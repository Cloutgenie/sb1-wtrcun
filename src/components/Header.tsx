import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, LogOut, FileText, Pill, User, Settings, Clipboard, BookOpen, Activity } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import NotificationCenter from './NotificationCenter'
import Logo from './Logo'

interface HeaderProps {
  toggleMobileMenu: () => void
}

const Header: React.FC<HeaderProps> = ({ toggleMobileMenu }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <ul className="flex space-x-4 items-center">
              <NavItem to="/" text="Home" />
              {user ? (
                <>
                  <NavItem 
                    to={
                      user.role === 'doctor' 
                        ? "/doctor/dashboard" 
                        : user.role === 'admin'
                        ? "/admin/dashboard"
                        : "/patient/dashboard"
                    } 
                    text="Dashboard" 
                  />
                  {user.role === 'patient' && (
                    <>
                      <NavItem to="/search" text="Find a Doctor" />
                      <NavItem to="/medical-records" text="Medical Records" />
                      <NavItem to="/medications" text="Medications" icon={<Pill size={18} />} />
                      <NavItem to="/prescriptions" text="Prescriptions" icon={<Clipboard size={18} />} />
                      <NavItem to="/education" text="Education" icon={<BookOpen size={18} />} />
                      <NavItem to="/health-metrics" text="Health Metrics" icon={<Activity size={18} />} />
                    </>
                  )}
                  {user.role === 'admin' && (
                    <NavItem to="/admin/settings" text="Settings" icon={<Settings size={18} />} />
                  )}
                  <NavItem to="/profile" text="Profile" icon={<User size={18} />} />
                  <NotificationCenter />
                  <li>
                    <button onClick={handleLogout} className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors flex items-center">
                      <LogOut className="mr-1" size={18} />
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <NavItem to="/login" text="Login" />
                  <NavItem to="/register" text="Register" />
                </>
              )}
            </ul>
          </nav>
          <button className="md:hidden" onClick={toggleMobileMenu}>
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  )
}

interface NavItemProps {
  to: string
  text: string
  icon?: React.ReactNode
}

const NavItem: React.FC<NavItemProps> = ({ to, text, icon }) => (
  <li>
    <Link
      to={to}
      className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors flex items-center"
    >
      {icon && <span className="mr-1">{icon}</span>}
      {text}
    </Link>
  </li>
)

export default Header