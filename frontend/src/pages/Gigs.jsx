import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from '../api/axios'
import GigCard from '../components/GigCard'
import { Search, SlidersHorizontal } from 'lucide-react'

export default function Gigs() {
  const [searchParams] = useSearchParams()
  const [gigs, setGigs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [sortBy, setSortBy] = useState('recent')
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchGigs()
  }, [searchQuery, category, sortBy, page])

  const fetchGigs = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (searchQuery) params.append('search', searchQuery)
      if (category) params.append('category', category)
      params.append('sort', sortBy)
      params.append('page', page)

      const response = await axios.get(`/gigs?${params.toString()}`)
      setGigs(response.data.data || [])
    } catch (error) {
      console.error('Failed to fetch gigs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1)
  }

  const categories = [
    'All Categories',
    'Web Development',
    'Graphic Design',
    'Product Design',
    'Content Creation',
    'Motion Design',
    'UI/UX Design',
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Browse Projects</h1>
          <p className="text-gray-600">Explore thousands of projects from talented professionals</p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1 flex items-center border border-gray-300 rounded-xl px-4 py-3 bg-white hover:border-gray-400 focus-within:border-gray-400">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 outline-none text-gray-900 placeholder-gray-400 bg-transparent"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-black hover:bg-gray-900 text-white font-semibold transition"
            >
              Search
            </button>
          </form>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value)
                setPage(1)
              }}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat === 'All Categories' ? '' : cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value)
                setPage(1)
              }}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="recent">Most Recent</option>
              <option value="trending">Trending</option>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Gigs Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : gigs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {gigs.map((gig) => (
              <GigCard key={gig.id} gig={gig} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No projects found matching your criteria</p>
          </div>
        )}

        {/* Pagination */}
        {gigs.length > 0 && (
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-400 transition"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-600">Page {page}</span>
            <button
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-900 font-medium hover:border-gray-400 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
