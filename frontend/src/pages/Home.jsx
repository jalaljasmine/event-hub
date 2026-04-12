import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../api/axios'
import GigCard from '../components/GigCard'
import { Search } from 'lucide-react'

export default function Home() {
  const [gigs, setGigs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchFeaturedGigs()
  }, [])

  const fetchFeaturedGigs = async () => {
    try {
      const response = await axios.get('/gigs?limit=6&featured=true')
      setGigs(response.data.data || [])
    } catch (error) {
      console.error('Failed to fetch gigs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/gigs?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Find talented creatives
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Browse thousands of independent professionals ready to bring your ideas to life.
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-12">
            <div className="flex gap-3 max-w-3xl">
              <div className="flex-1 flex items-center border border-gray-300 rounded-xl px-4 py-3 bg-white hover:border-gray-400 focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-300">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Search across 1M+ independents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 outline-none text-gray-900 placeholder-gray-400 bg-transparent"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-black hover:bg-gray-900 text-white font-semibold transition"
              >
                Search
              </button>
            </div>
          </form>

          {/* Category Chips */}
          <div className="space-y-4">
            <p className="text-sm text-gray-500 font-medium">BROWSE BY CATEGORY</p>
            <div className="flex flex-wrap gap-2">
              {[
                'Web developers',
                'Graphic designers',
                'Product designers',
                'Content creators',
                'Motion designers',
                'UI/UX designers',
              ].map((cat) => (
                <Link key={cat} to={`/gigs?category=${cat}`}>
                  <button className="px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-gray-400 text-gray-700 font-medium transition text-sm">
                    {cat}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gigs Section */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Projects we love
              </h2>
              <p className="text-gray-600">Standout projects making waves around the web</p>
            </div>
            <Link to="/gigs">
              <button className="text-gray-600 hover:text-gray-900 font-medium text-sm">
                View more →
              </button>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : gigs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gigs.map((gig) => (
                <GigCard key={gig.id} gig={gig} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No gigs available yet</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 border-t border-gray-200 py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Looking to post a project?
          </h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-lg">
            Post your project and get matched with talented professionals from around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <button className="px-8 py-3 rounded-lg bg-black hover:bg-gray-900 text-white font-semibold transition">
                Post a Project
              </button>
            </Link>
            <Link to="/gigs">
              <button className="px-8 py-3 rounded-lg border border-gray-300 hover:border-gray-400 text-gray-900 font-semibold transition">
                Browse Projects
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
