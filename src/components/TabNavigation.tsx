import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import App from '../App'
import Home from './Home'
import HelloHuman from './HelloHuman'
import Demo from './Demo'

function TabNavigation() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(() => {
    if (location.pathname === '/home') return 'home'
    if (location.pathname === '/hello-human') return 'hello'
    if (location.pathname === '/demo') return 'demo'
    return 'main'
  })

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />
      case 'hello':
        return <HelloHuman />
      case 'demo':
        return <Demo />
      default:
        return <App />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-md mx-auto">
          <div className="flex">
            <button
              onClick={() => setActiveTab('main')}
              className={`flex-1 py-4 px-4 text-center font-medium transition-all duration-200 ${
                activeTab === 'main'
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Main
            </button>
            <button
              onClick={() => setActiveTab('demo')}
              className={`flex-1 py-4 px-4 text-center font-medium transition-all duration-200 ${
                activeTab === 'demo'
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Demo
            </button>
            <button
              onClick={() => setActiveTab('hello')}
              className={`flex-1 py-4 px-4 text-center font-medium transition-all duration-200 ${
                activeTab === 'hello'
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Hello
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div>
        {renderContent()}
      </div>
    </div>
  )
}

export default TabNavigation