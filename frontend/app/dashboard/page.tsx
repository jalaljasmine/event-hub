'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-gray-600">Loading...</div>
        </main>
        <Footer />
      </>
    )
  }

  if (!user) {
    return null
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <p className="text-gray-600 text-sm mb-2">Total Earnings</p>
              <p className="text-3xl font-bold text-gray-900">$12,450</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <p className="text-gray-600 text-sm mb-2">Active Projects</p>
              <p className="text-3xl font-bold text-gray-900">3</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <p className="text-gray-600 text-sm mb-2">Rating</p>
              <p className="text-3xl font-bold text-gray-900">4.9★</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Projects</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Project {item}</p>
                    <p className="text-sm text-gray-600">Client Name • In Progress</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
