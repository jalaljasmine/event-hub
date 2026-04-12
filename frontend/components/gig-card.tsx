import Link from 'next/link'
import Image from 'next/image'

interface Gig {
  id: string
  title: string
  description?: string
  image?: string
  category?: string
  price: number
  rating?: number
  seller?: {
    name: string
    title?: string
    avatar?: string
  }
}

export default function GigCard({ gig }: { gig: Gig }) {
  return (
    <Link href={`/gig/${gig.id}`}>
      <div className="bg-white border border-gray-200 rounded-xl hover:border-gray-400 hover:shadow-lg transition overflow-hidden cursor-pointer h-full group">
        {/* Image */}
        <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden relative">
          {gig.image ? (
            <Image
              src={gig.image}
              alt={gig.title}
              fill
              className="object-cover group-hover:scale-105 transition"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Badge */}
          {gig.category && (
            <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
              {gig.category}
            </p>
          )}

          <h3 className="font-bold text-gray-900 line-clamp-2 mb-3 text-base">
            {gig.title}
          </h3>

          {/* User Info */}
          {gig.seller && (
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{gig.seller.name}</p>
                <p className="text-xs text-gray-500 truncate">{gig.seller.title || 'Professional'}</p>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between gap-4 mb-4">
            {gig.rating !== undefined && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="text-sm font-medium text-gray-900">{gig.rating.toFixed(1)}</span>
              </div>
            )}
            <div className="text-right">
              <p className="text-xs text-gray-500">From</p>
              <p className="font-bold text-gray-900">${gig.price}</p>
            </div>
          </div>

          {/* Action */}
          <button className="w-full py-2 px-4 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-900 font-medium text-sm transition">
            View Project
          </button>
        </div>
      </div>
    </Link>
  )
}
