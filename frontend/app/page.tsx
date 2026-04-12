import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import GigCard from '@/components/gig-card'

// Mock data - replace with actual API calls
const featuredGigs = [
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
]

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-white border-b border-gray-200 py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Find talented creatives
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Browse thousands of independent professionals ready to bring your ideas to life.
              </p>
            </div>

            {/* Search Bar */}
            <form className="mb-12">
              <div className="flex gap-3 max-w-3xl">
                <div className="flex-1 flex items-center border border-gray-300 rounded-xl px-4 py-3 bg-white hover:border-gray-400 focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-300">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search across 1M+ independents..."
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
                {['Web developers', 'Graphic designers', 'Product designers', 'Content creators', 'Motion designers', 'UI/UX designers'].map((cat) => (
                  <Link key={cat} href={`/browse?category=${cat}`}>
                    <button className="px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-gray-400 text-gray-700 font-medium transition text-sm">
                      {cat}
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Gigs */}
        <section className="py-20 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-start mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Projects we love
                </h2>
                <p className="text-gray-600">Standout projects making waves around the web</p>
              </div>
              <Link href="/browse">
                <button className="text-gray-600 hover:text-gray-900 font-medium text-sm">
                  View more →
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGigs.map((gig) => (
                <GigCard key={gig.id} gig={gig} />
              ))}
            </div>
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
              <Link href="/register">
                <button className="px-8 py-3 rounded-lg bg-black hover:bg-gray-900 text-white font-semibold transition">
                  Post a Project
                </button>
              </Link>
              <Link href="/browse">
                <button className="px-8 py-3 rounded-lg border border-gray-300 hover:border-gray-400 text-gray-900 font-semibold transition">
                  Browse Projects
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
