import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-900 font-bold text-lg">
                ◆
              </div>
              <span className="ml-2 text-lg font-bold">Contra</span>
            </div>
            <p className="text-gray-400 text-sm">
              Find talented creatives and post projects to bring your ideas to life.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">For Clients</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/gigs" className="hover:text-white transition">
                  Browse Projects
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Creatives</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/register" className="hover:text-white transition">
                  Get Started
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Resources
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Community
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2024 Contra. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition">
                Terms
              </a>
              <a href="#" className="hover:text-white transition">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
