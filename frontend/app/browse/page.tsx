'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import GigCard from '@/components/gig-card'

const mockGigs = [
  {
    id: '1',
    title: 'Modern UI Design System',
    category: 'Design',
    price: 5000,
    rating: 4.9,
    seller: { name: 'Sarah Chen', title: 'UI Designer' },
  },
  {
    id: '2',
    title: 'E-commerce Platform Development',
    category: 'Development',
    price: 8000,
    rating: 4.8,
    seller: { name: 'Alex Rodriguez', title: 'Full Stack Developer' },
  },
  {
    id: '3',
    title: 'Brand Identity & Logo Design',
    category: 'Design',
    price: 3000,
    rating: 5.0,
    seller: { name: 'Jamie Lee', title: 'Brand Designer' },
  },
  {
    id: '4',
    title: 'Mobile App UI/UX Design',
    category: 'Design',
    price: 4500,
    rating: 4.7,
    seller: { name: 'Emma Wilson', title: 'Mobile Designer' },
  },
  {
    id: '5',
    title: 'Website Redesign & Development',
    category: 'Development',
    price: 7000,
    rating: 4.9,
    seller: { name: 'Marcus Johnson', title: 'Web Developer' },
  },
  {
    id: '6',
    title: '3D Product Visualization',
    category: 'Design',
    price: 6000,
    rating: 4.8,
    seller: { name: 'Lisa Park', title: '3D Designer' },
  },
]

export default function BrowsePage() {
  const [gigs, setGigs] = useState(mockGigs)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const filteredGigs = gigs.filter((gig) => {
    const matchesSearch = gig.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || gig.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Browse Projects</h1>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Content">Content</option>
              </select>
            </div>
          </div>
        </div>

        {/* Gigs Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-gray-600 mb-8">{filteredGigs.length} projects found</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGigs.map((gig) => (
              <GigCard key={gig.id} gig={gig} />
            ))}
          </div>

          {filteredGigs.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No projects found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
