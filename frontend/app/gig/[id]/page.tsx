'use client'

import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const mockGig = {
  id: '1',
  title: 'Modern UI Design System',
  description: 'I will create a comprehensive UI design system for your platform with components, typography, colors, and more.',
  category: 'Design',
  price: 5000,
  rating: 4.9,
  reviews: 24,
  seller: {
    name: 'Sarah Chen',
    title: 'Senior UI Designer',
    avatar: '',
    bio: 'I have 5+ years of experience in UI/UX design with a focus on modern, clean interfaces.',
    hourlyRate: 85,
    responseTime: '2 hours',
  },
  details: [
    'Complete design system documentation',
    'Figma file with all components',
    'Design guidelines and best practices',
    'Accessibility considerations',
    '2 rounds of revisions included',
  ],
}

export default function GigDetailPage({ params }: { params: { id: string } }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <div className="flex gap-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span>/</span>
            <Link href="/browse" className="hover:text-gray-900">Browse</Link>
            <span>/</span>
            <span className="text-gray-900">{mockGig.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Image */}
              <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-8 flex items-center justify-center">
                <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>

              {/* Title and Category */}
              <div className="mb-8">
                <p className="text-sm text-gray-500 uppercase font-medium mb-2">{mockGig.category}</p>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{mockGig.title}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-lg">★</span>
                    <span className="font-medium text-gray-900">{mockGig.rating}</span>
                    <span className="text-gray-600">({mockGig.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About this project</h2>
                <p className="text-gray-700 leading-relaxed mb-6">{mockGig.description}</p>

                <h3 className="text-lg font-bold text-gray-900 mb-4">What&apos;s included</h3>
                <ul className="space-y-3">
                  {mockGig.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Seller Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 sticky top-24">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-gray-300 mb-4" />

                <h3 className="text-lg font-bold text-gray-900 mb-1">{mockGig.seller.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{mockGig.seller.title}</p>

                <div className="space-y-3 mb-6 py-4 border-y border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Response time</span>
                    <span className="font-medium text-gray-900">{mockGig.seller.responseTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Hourly rate</span>
                    <span className="font-medium text-gray-900">${mockGig.seller.hourlyRate}/hr</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-6 leading-relaxed">{mockGig.seller.bio}</p>

                {/* Price and Action */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Starting from</p>
                  <p className="text-3xl font-bold text-gray-900">${mockGig.price}</p>
                </div>

                <div className="space-y-3">
                  <button className="w-full py-3 px-4 rounded-lg bg-gray-900 hover:bg-gray-800 text-white font-medium transition">
                    Get in Touch
                  </button>
                  <button className="w-full py-3 px-4 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-900 font-medium transition">
                    Save Project
                  </button>
                </div>
              </div>

              {/* Similar Projects */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">More from this creator</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <Link key={item} href="#">
                      <div className="p-4 border border-gray-200 rounded-lg hover:border-gray-400 transition">
                        <p className="font-medium text-gray-900 line-clamp-2 mb-2">Project Title {item}</p>
                        <p className="text-sm text-gray-600">From $3,000</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
