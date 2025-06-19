import { useLocation } from 'react-router-dom'

interface TabNavigationProps {
  children: React.ReactNode
}

function TabNavigation({ children }: TabNavigationProps) {
  const location = useLocation()
  
  const handleExternalLink = () => {
    window.open('https://paywisedemo1.vercel.app/', '_blank')
  }

  const handleMainPage = () => {
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Tab Navigation */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-md mx-auto">
          <div className="flex">
            {/* Main Tab */}
            <button
              onClick={handleMainPage}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors duration-200 border-b-2 ${
                location.pathname === '/' || location.pathname === '/home'
                  ? 'border-purple-600 text-purple-600 bg-purple-50'
                  : 'border-transparent text-gray-600 hover:text-purple-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 1v4" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 1v4" />
                </svg>
                <span>Main</span>
              </div>
            </button>

            {/* External Demo Tab */}
            <button
              onClick={handleExternalLink}
              className="flex-1 py-4 px-6 text-center font-semibold transition-colors duration-200 border-b-2 border-transparent text-gray-600 hover:text-purple-600 hover:bg-gray-50"
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>Demo</span>
              </div>
            </button>
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