import { useState } from 'react'
import { Link } from 'react-router-dom'

function HelloHuman() {
  const [showBalance, setShowBalance] = useState(true)
  
  const humanInteractions = [
    {
      id: 1,
      name: "AI Assistant",
      username: "@ai_helper",
      amount: 0,
      date: "2025-06-19",
      description: "Welcome message",
      type: "message"
    },
    {
      id: 2,
      name: "System",
      username: "@system",
      amount: 0,
      date: "2025-06-19",
      description: "Hello human! How can I help you today?",
      type: "message"
    },
    {
      id: 3,
      name: "Mike Chen",
      username: "@mikechan",
      amount: 0,
      date: "2025-06-19",
      description: "Thanks for the warm welcome!",
      type: "message"
    }
  ]

  return (
    <div>
      {/* Main Card Container - Same purple gradient theme */}
      <div className="bg-gradient-to-br from-purple-400 via-purple-500 to-purple-700 rounded-b-[32px] px-6 pt-8 pb-8 relative overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-16 right-8 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute bottom-12 left-6 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute top-32 left-16 w-12 h-12 bg-white rounded-full"></div>
        </div>
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10 relative z-10">
          <h1 className="text-white text-3xl font-bold tracking-wide">Hello Human!</h1>
          <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-sm font-bold">👋</span>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white text-opacity-95 text-lg font-medium">Welcome Status</span>
            <button 
              onClick={() => setShowBalance(!showBalance)}
              className="text-white text-opacity-90 hover:text-opacity-100 transition-opacity p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showBalance ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 616 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                )}
              </svg>
            </button>
          </div>
          <div className="text-white text-[42px] font-bold tracking-tight">
            {showBalance ? "Connected 🤖" : "••••••••"}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 -mt-6 relative z-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-50">
            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-5">
              <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-gray-900 text-xl font-bold mb-1">Chat</h3>
            <p className="text-gray-500 text-sm font-medium">Start conversation</p>
          </div>
          
          <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-50">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-5">
              <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-gray-900 text-xl font-bold mb-1">Greetings</h3>
            <p className="text-gray-500 text-sm font-medium">Send warm hello</p>
          </div>
        </div>
      </div>

      {/* Navigation Button */}
      <div className="px-6 mt-6">
        <Link 
          to="/"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-3xl shadow-lg transition-colors duration-200 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Main Page
        </Link>
      </div>

      {/* Recent Interactions */}
      <div className="px-6 mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-gray-900 text-2xl font-bold">Recent Interactions</h2>
          <button className="text-purple-600 font-semibold text-lg">View All</button>
        </div>

        <div className="space-y-3">
          {humanInteractions.map((interaction) => (
            <div key={interaction.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-50">
              <div className="flex items-center">
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-gray-900 font-bold text-lg">{interaction.name}</h3>
                      <p className="text-gray-500 text-sm font-medium">{interaction.username}</p>
                      <p className="text-gray-600 text-sm mt-1 font-medium">"{interaction.description}"</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-bold text-lg text-blue-500">💬</p>
                      <p className="text-gray-400 text-sm font-medium">{interaction.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Padding */}
      <div className="h-8"></div>
    </div>
  )
}

export default HelloHuman