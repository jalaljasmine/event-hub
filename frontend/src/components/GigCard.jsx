import { Link } from 'react-router-dom'
import { Star, MessageSquare } from 'lucide-react'

export default function GigCard({ gig }) {
  return (
    <Link to={`/gigs/${gig.id}`}>
      <div className="bg-white border border-gray-200 rounded-xl hover:border-gray-400 hover:shadow-lg transition overflow-hidden cursor-pointer h-full group">
        {/* Image */}
        <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
          {gig.image ? (
            <img
              src={gig.image}
              alt={gig.title}
              className="w-full h-full object-cover group-hover:scale-105 transition"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
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
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
              {gig.seller?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {gig.seller?.name || 'Unknown'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {gig.seller?.title || 'Professional'}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between gap-4 mb-4">
            {gig.rating !== undefined && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-900">
                  {gig.rating.toFixed(1)}
                </span>
              </div>
            )}
            {gig.price && (
              <div className="text-right">
                <p className="text-xs text-gray-500">From</p>
                <p className="font-bold text-gray-900">${gig.price}</p>
              </div>
            )}
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
