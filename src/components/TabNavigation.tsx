import { useLocation, Link } from 'react-router-dom'

interface TabNavigationProps {
  children: React.ReactNode
}

function TabNavigation({ children }: TabNavigationProps) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-white">
      {/* Apple-style Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-md mx-auto">
          <div className="flex">
            {/* Main Tab */}
            <Link
              to="/"
              className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-200 border-b-2 ${
                location.pathname === '/' || location.pathname === '/home'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 1v4" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 1v4" />
                </svg>
                <span>Main</span>
              </div>
            </Link>

            {/* Hello Human Tab */}
            <Link
              to="/hello-human"
              className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-200 border-b-2 ${
                location.pathname === '/hello-human'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Hello</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pb-16">
        {children}
      </div>
    </div>
  )
}

export default TabNavigation