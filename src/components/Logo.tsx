import React from 'react'
import { Heart } from 'lucide-react'

interface LogoProps {
  className?: string
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <Heart className="text-green-500 mr-2" size={24} />
      <span className="text-2xl font-bold text-green-600 dark:text-green-400">CareAble</span>
    </div>
  )
}

export default Logo