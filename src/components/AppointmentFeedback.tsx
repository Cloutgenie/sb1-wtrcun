import React, { useState } from 'react'
import { Star } from 'lucide-react'

interface AppointmentFeedbackProps {
  appointmentId: string
  onSubmit: (feedback: { rating: number; comment: string }) => void
}

const AppointmentFeedback: React.FC<AppointmentFeedbackProps> = ({ appointmentId, onSubmit }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ rating, comment })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Rate Your Appointment</h3>
      <div className="flex mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={`mr-1 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            <Star fill={star <= rating ? 'currentColor' : 'none'} />
          </button>
        ))}
      </div>
      <textarea
        className="w-full p-2 border rounded-md mb-4"
        rows={4}
        placeholder="Leave a comment (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        disabled={rating === 0}
      >
        Submit Feedback
      </button>
    </form>
  )
}

export default AppointmentFeedback