import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useNotifications } from '../contexts/NotificationContext'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const { addNotification } = useNotifications()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      addNotification({ type: 'success', message: 'Login successful!' })
      navigate('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
      addNotification({ type: 'error', message: 'Login failed. Please check your credentials.' })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-full max-w-md">
        <h3 className="text-2xl font-bold text-center mb-6">Login to Your Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div className="flex items-center border-2 py-2 px-3 rounded-md">
              <Mail className="text-gray-400" />
              <input 
                className="pl-2 outline-none border-none w-full"
                type="email" 
                name="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center border-2 py-2 px-3 rounded-md">
              <Lock className="text-gray-400" />
              <input 
                className="pl-2 outline-none border-none w-full"
                type={showPassword ? "text" : "password"}
                name="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="focus:outline-none"
              >
                {showPassword ? <EyeOff className="text-gray-400" /> : <Eye className="text-gray-400" />}
              </button>
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-4">
            <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 w-full">Login</button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot password?</Link>
        </div>
        <div className="mt-4 text-center">
          <span className="text-sm">Don't have an account? </span>
          <Link to="/register" className="text-sm text-blue-600 hover:underline">Register here</Link>
        </div>
      </div>
    </div>
  )
}

export default Login