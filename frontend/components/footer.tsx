import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-4">For Clients</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/browse" className="text-sm text-gray-600 hover:text-gray-900">
                  Browse Projects
                </Link>
              </li>
              <li>
                <Link href="/post" className="text-sm text-gray-600 hover:text-gray-900">
                  Post a Project
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  How it Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">For Creators</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/register" className="text-sm text-gray-600 hover:text-gray-900">
                  Start Selling
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Creator Resources
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Inspiration
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex justify-between items-center">
          <p className="text-sm text-gray-600">© 2024 Contra. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
              Cookies
            </Link>
            <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
