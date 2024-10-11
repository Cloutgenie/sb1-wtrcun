import React, { useState, useEffect } from 'react'
import { Book, Search, ChevronRight } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'
import SearchBar from '../components/SearchBar'

interface EducationArticle {
  id: string
  title: string
  category: string
  summary: string
  content: string
}

const PatientEducation: React.FC = () => {
  const [articles, setArticles] = useState<EducationArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedArticle, setSelectedArticle] = useState<EducationArticle | null>(null)

  useEffect(() => {
    // Simulating API call to fetch education articles
    setTimeout(() => {
      setArticles([
        {
          id: '1',
          title: 'Understanding Diabetes',
          category: 'Chronic Conditions',
          summary: 'Learn about the types, causes, and management of diabetes.',
          content: 'Diabetes is a chronic condition that affects how your body turns food into energy...'
        },
        {
          id: '2',
          title: 'Heart Health Basics',
          category: 'Cardiovascular Health',
          summary: 'Essential information about maintaining a healthy heart.',
          content: 'Your heart is a vital organ that pumps blood throughout your body...'
        },
        {
          id: '3',
          title: 'Stress Management Techniques',
          category: 'Mental Health',
          summary: 'Effective strategies for managing stress in daily life.',
          content: 'Stress is a normal part of life, but chronic stress can have negative effects on your health...'
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleSearch = (query: string) => {
    setSearchTerm(query)
  }

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Patient Education</h1>
      
      <SearchBar onSearch={handleSearch} placeholder="Search articles..." />

      {selectedArticle ? (
        <ArticleDetail article={selectedArticle} onBack={() => setSelectedArticle(null)} />
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredArticles.map(article => (
            <ArticleCard
              key={article.id}
              article={article}
              onClick={() => setSelectedArticle(article)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface ArticleCardProps {
  article: EducationArticle
  onClick: () => void
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => (
  <div
    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{article.category}</p>
        <p className="text-gray-700">{article.summary}</p>
      </div>
      <Book className="text-blue-500 flex-shrink-0 ml-4" size={24} />
    </div>
    <div className="mt-4 flex items-center text-blue-600 hover:text-blue-800">
      <span className="text-sm font-medium">Read more</span>
      <ChevronRight size={16} className="ml-1" />
    </div>
  </div>
)

interface ArticleDetailProps {
  article: EducationArticle
  onBack: () => void
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onBack }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <button
      onClick={onBack}
      className="mb-4 text-blue-600 hover:text-blue-800 flex items-center"
    >
      <ChevronRight size={16} className="mr-1 transform rotate-180" />
      <span>Back to articles</span>
    </button>
    <h2 className="text-2xl font-bold text-gray-900 mb-2">{article.title}</h2>
    <p className="text-sm text-gray-600 mb-4">{article.category}</p>
    <div className="prose max-w-none">
      <p>{article.content}</p>
    </div>
  </div>
)

export default PatientEducation