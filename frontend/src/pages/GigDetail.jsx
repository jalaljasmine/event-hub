import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from '../api/axios'
import { Star, MessageSquare, Heart } from 'lucide-react'

export default function GigDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [gig, setGig] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetchGigDetail()
  }, [id])

  const fetchGigDetail = async () => {
    try {
      const response = await axios.get(`/gigs/${id}`)
      setGig(response.data.data)
    } catch (error) {
      console.error('Failed to fetch gig:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleContactSeller = () => {
    if (!user) {
      navigate('/login')
      return
    }
    // Navigate to message/contact page
    navigate(`/messages/${gig.seller.id}`)
  }

  const toggleSave = async () => {
    if (!user) {
      navigate('/login')
      return
    }
    // Save/unsave gig logic
    setSaved(!saved)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!gig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Project not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image */}
            <div className="mb-8 rounded-xl overflow-hidden bg-gray-100 h-96 flex items-center justify-center">
              {gig.image ? (
                <img src={gig.image} alt={gig.title} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400">No image</span>
              )}
            </div>

            {/* Title & Category */}
            <div className="mb-6">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                {gig.category}
              </p>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{gig.title}</h1>
              <p className="text-lg text-gray-600">{gig.description}</p>
            </div>

            {/* Stats */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <div className="flex flex-wrap gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Rating</p>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-2xl font-bold text-gray-900">
                      {gig.rating || 'N/A'}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Projects Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{gig.completedProjects || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Happy Clients</p>
                  <p className="text-2xl font-bold text-gray-900">{gig.happyClients || 0}</p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Project</h2>
                <p className="text-gray-600 whitespace-pre-line">{gig.fullDescription || gig.description}</p>
              </div>

              {gig.features && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h2>
                  <ul className="space-y-3">
                    {gig.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">✓</span>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Seller Card */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  {gig.seller?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{gig.seller?.name}</h3>
                  <p className="text-sm text-gray-600">{gig.seller?.title || 'Professional'}</p>
                </div>
              </div>

              {gig.seller?.bio && (
                <p className="text-sm text-gray-600 mb-6">{gig.seller.bio}</p>
              )}

              <button
                onClick={handleContactSeller}
                className="w-full py-3 px-4 rounded-lg bg-black hover:bg-gray-900 text-white font-semibold transition mb-3"
              >
                Contact Seller
              </button>

              <button
                onClick={toggleSave}
                className="w-full py-3 px-4 rounded-lg border border-gray-300 hover:border-gray-400 text-gray-900 font-semibold transition flex items-center justify-center gap-2"
              >
                <Heart className={`w-5 h-5 ${saved ? 'fill-red-500 text-red-500' : ''}`} />
                {saved ? 'Saved' : 'Save'}
              </button>
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Starting Price</p>
              <p className="text-4xl font-bold text-gray-900 mb-4">${gig.price}</p>
              <p className="text-sm text-gray-600 mb-6">
                {gig.deliveryTime} days delivery time
              </p>

              <div className="space-y-3 mb-6">
                {gig.revisions && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Revisions</span>
                    <span className="font-semibold text-gray-900">{gig.revisions}</span>
                  </div>
                )}
                {gig.responseTime && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Response Time</span>
                    <span className="font-semibold text-gray-900">{gig.responseTime}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
