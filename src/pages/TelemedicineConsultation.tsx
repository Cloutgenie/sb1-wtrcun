import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Video, Mic, MicOff, VideoOff, PhoneOff, Send, MessageSquare } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useNotifications } from '../contexts/NotificationContext'

interface Message {
  id: number
  sender: 'patient' | 'doctor'
  content: string
  timestamp: Date
}

const TelemedicineConsultation: React.FC = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addNotification } = useNotifications()
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [appointmentDetails, setAppointmentDetails] = useState<any>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [showChat, setShowChat] = useState(false)

  useEffect(() => {
    // Simulating fetching appointment details
    const fetchAppointmentDetails = async () => {
      // In a real application, you would fetch this data from your API
      const mockAppointment = {
        id: appointmentId,
        doctorName: "Dr. Emily Johnson",
        patientName: "John Doe",
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      }
      setAppointmentDetails(mockAppointment)
    }

    fetchAppointmentDetails()
  }, [appointmentId])

  const toggleVideo = () => setIsVideoOn(!isVideoOn)
  const toggleAudio = () => setIsAudioOn(!isAudioOn)
  const toggleChat = () => setShowChat(!showChat)

  const endCall = () => {
    // In a real application, you would implement logic to end the call
    addNotification({ type: 'info', message: "Call ended. Redirecting to dashboard..." })
    navigate('/dashboard')
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now(),
        sender: user?.role === 'patient' ? 'patient' : 'doctor',
        content: newMessage.trim(),
        timestamp: new Date()
      }
      setMessages([...messages, message])
      setNewMessage('')

      // Simulate response after 2 seconds
      setTimeout(() => {
        const response: Message = {
          id: Date.now() + 1,
          sender: user?.role === 'patient' ? 'doctor' : 'patient',
          content: "Thank you for your message. How can I help you today?",
          timestamp: new Date()
        }
        setMessages(prevMessages => [...prevMessages, response])
      }, 2000)
    }
  }

  if (!appointmentDetails) {
    return <div>Loading...</div>
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 shadow">
        <h1 className="text-2xl font-bold">Telemedicine Consultation</h1>
        <p>Appointment with {user?.role === 'patient' ? appointmentDetails.doctorName : appointmentDetails.patientName}</p>
        <p>{appointmentDetails.date} at {appointmentDetails.time}</p>
      </div>

      <div className="flex-grow flex">
        <div className="w-full lg:w-3/4 bg-black relative">
          {/* This would be replaced with actual video stream components */}
          <div className="h-full flex items-center justify-center text-white">
            {isVideoOn ? (
              <video className="w-full h-full object-cover" autoPlay muted loop>
                <source src="https://assets.mixkit.co/videos/preview/mixkit-man-in-a-suit-working-on-a-laptop-32739-large.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="bg-gray-800 w-full h-full flex items-center justify-center">
                <VideoOff size={64} />
              </div>
            )}
          </div>
          <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-300 border-2 border-white rounded-lg overflow-hidden">
            {/* This would be the user's video feed */}
            <video className="w-full h-full object-cover" autoPlay muted loop>
              <source src="https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-on-video-call-6894-large.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        {showChat && (
          <div className="w-full lg:w-1/4 bg-white dark:bg-gray-800 p-4 flex flex-col">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Chat</h2>
            <div className="flex-grow overflow-y-auto mb-4 bg-gray-100 dark:bg-gray-700 border rounded p-2">
              {messages.map(message => (
                <div key={message.id} className={`mb-2 ${message.sender === (user?.role === 'patient' ? 'patient' : 'doctor') ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-2 rounded-lg ${message.sender === (user?.role === 'patient' ? 'patient' : 'doctor') ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-600 dark:text-white'}`}>
                    {message.content}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-grow p-2 border rounded-l dark:bg-gray-700 dark:text-white dark:border-gray-600"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-200 dark:bg-gray-800 p-4 flex justify-center space-x-4">
        <button
          onClick={toggleVideo}
          className={`p-2 rounded-full ${isVideoOn ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'}`}
        >
          {isVideoOn ? <Video size={24} /> : <VideoOff size={24} />}
        </button>
        <button
          onClick={toggleAudio}
          className={`p-2 rounded-full ${isAudioOn ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'}`}
        >
          {isAudioOn ? <Mic size={24} /> : <MicOff size={24} />}
        </button>
        <button
          onClick={toggleChat}
          className={`p-2 rounded-full ${showChat ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'}`}
        >
          <MessageSquare size={24} />
        </button>
        <button
          onClick={endCall}
          className="p-2 rounded-full bg-red-500 text-white"
        >
          <PhoneOff size={24} />
        </button>
      </div>
    </div>
  )
}

export default TelemedicineConsultation