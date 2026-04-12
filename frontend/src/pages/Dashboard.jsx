import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from '../api/axios'
import GigCard from '../components/GigCard'
import { Plus, Settings } from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuth()
  const [userGigs, setUserGigs] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('gigs')
  const [showNewGigForm, setShowNewGigForm] = useState(false)
  const [newGig, setNewGig] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
  })

  useEffect(() => {
    if (activeTab === 'gigs') {
      fetchUserGigs()
    }
  }, [activeTab])

  const fetchUserGigs = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/gigs/my-gigs')
      setUserGigs(response.data.data || [])
    } catch (error) {
      console.error('Failed to fetch user gigs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateGig = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/gigs', newGig)
      setShowNewGigForm(false)
      setNewGig({ title: '', description: '', category: '', price: '' })
      fetchUserGigs()
    } catch (error) {
      console.error('Failed to create gig:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}!</p>
            </div>
            {user?.userType === 'seller' && (
              <button
                onClick={() => setShowNewGigForm(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-black hover:bg-gray-900 text-white font-semibold transition"
              >
                <Plus className="w-5 h-5" />
                New Gig
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('gigs')}
              className={`py-4 font-semibold transition ${
                activeTab === 'gigs'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {user?.userType === 'seller' ? 'My Gigs' : 'Saved Gigs'}
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 font-semibold transition ${
                activeTab === 'profile'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 font-semibold transition ${
                activeTab === 'settings'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Settings
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'gigs' && (
          <div>
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            ) : userGigs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userGigs.map((gig) => (
                  <GigCard key={gig.id} gig={gig} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-600 text-lg mb-4">
                  {user?.userType === 'seller' ? 'No gigs yet' : 'No saved gigs'}
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={user?.name || ''}
                  disabled
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900"
                />
              </div>
              {user?.userType === 'seller' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Professional Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Web Designer"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Bio
                    </label>
                    <textarea
                      rows="4"
                      placeholder="Tell us about yourself..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900"
                    ></textarea>
                  </div>
                </>
              )}
              <button className="px-6 py-3 rounded-lg bg-black hover:bg-gray-900 text-white font-semibold transition">
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between py-4 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-600">Receive updates about your gigs</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between py-4 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-900">Marketing Emails</p>
                  <p className="text-sm text-gray-600">Receive promotions and updates</p>
                </div>
                <input type="checkbox" className="w-5 h-5" />
              </div>
              <button className="px-6 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition">
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>

      {/* New Gig Modal */}
      {showNewGigForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Gig</h2>
            <form onSubmit={handleCreateGig} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={newGig.title}
                  onChange={(e) => setNewGig({ ...newGig, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Category
                </label>
                <select
                  required
                  value={newGig.category}
                  onChange={(e) => setNewGig({ ...newGig, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900"
                >
                  <option value="">Select category</option>
                  <option value="design">Design</option>
                  <option value="development">Development</option>
                  <option value="writing">Writing</option>
                  <option value="marketing">Marketing</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  required
                  value={newGig.price}
                  onChange={(e) => setNewGig({ ...newGig, price: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Description
                </label>
                <textarea
                  required
                  rows="4"
                  value={newGig.description}
                  onChange={(e) => setNewGig({ ...newGig, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900"
                ></textarea>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-lg bg-black hover:bg-gray-900 text-white font-semibold transition"
                >
                  Create Gig
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewGigForm(false)}
                  className="flex-1 py-3 px-4 rounded-lg border border-gray-300 text-gray-900 font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
