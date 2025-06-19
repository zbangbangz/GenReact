import { useLocation, Link } from 'react-router-dom'

interface BottomNavigationProps {
  children: React.ReactNode
}

function BottomNavigation({ children }: BottomNavigationProps) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Content */}
      <div>
        {children}
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="max-w-md mx-auto">
          <div className="flex">
            {/* Main Tab */}
            <Link
              to="/"
              className={`flex-1 py-3 px-2 text-center transition-all duration-200 ${
                location.pathname === '/' || location.pathname === '/home'
                  ? 'text-gray-900'
                  : 'text-gray-600'
              }`}
            >
              <div className="flex flex-col items-center space-y-1">
                <div className={`w-6 h-6 ${
                  location.pathname === '/' || location.pathname === '/home'
                    ? 'text-gray-900'
                    : 'text-gray-600'
                }`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 1v4" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 1v4" />
                  </svg>
                </div>
                <span className="text-xs font-medium">Home</span>
              </div>
            </Link>

            {/* Demo Tab */}
            <Link
              to="/demo"
              className={`flex-1 py-3 px-2 text-center transition-all duration-200 ${
                location.pathname === '/demo'
                  ? 'text-gray-900'
                  : 'text-gray-600'
              }`}
            >
              <div className="flex flex-col items-center space-y-1">
                <div className={`w-6 h-6 ${
                  location.pathname === '/demo'
                    ? 'text-gray-900'
                    : 'text-gray-600'
                }`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="text-xs font-medium">Demo</span>
              </div>
            </Link>

            {/* Hello Tab */}
            <Link
              to="/hello-human"
              className={`flex-1 py-3 px-2 text-center transition-all duration-200 ${
                location.pathname === '/hello-human'
                  ? 'text-gray-900'
                  : 'text-gray-600'
              }`}
            >
              <div className="flex flex-col items-center space-y-1">
                <div className={`w-6 h-6 ${
                  location.pathname === '/hello-human'
                    ? 'text-gray-900'
                    : 'text-gray-600'
                }`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xs font-medium">Hello</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomNavigation