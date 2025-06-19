import { useState } from 'react'

function Demo() {
  const [showBalance, setShowBalance] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Purple Header Card - Exact match to the image */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-b-[32px] px-6 pt-8 pb-8 relative overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center mb-10 relative z-10">
          <h1 className="text-white text-4xl font-bold tracking-tight">PayWise</h1>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Balance Section */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white text-lg font-medium opacity-90">Available Balance</span>
            <button 
              onClick={() => setShowBalance(!showBalance)}
              className="text-white hover:text-purple-200 transition-colors p-2 opacity-80"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
          <div className="text-white text-5xl font-bold tracking-tight">
            {showBalance ? "฿82,500.50" : "••••••••"}
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="px-6 -mt-6 relative z-10">
        <div className="grid grid-cols-2 gap-4">
          {/* Send Money Card */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <h3 className="text-gray-900 text-xl font-bold mb-2">Send Money</h3>
            <p className="text-gray-500 text-sm">Transfer to friends</p>
          </div>
          
          {/* History Card */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-gray-900 text-xl font-bold mb-2">History</h3>
            <p className="text-gray-500 text-sm">View transactions</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-6 mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-gray-900 text-2xl font-bold">Recent Activity</h2>
          <button className="text-purple-600 font-semibold hover:text-purple-700 transition-colors">View All</button>
        </div>

        <div className="space-y-4">
          {/* John Doe Transaction */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-gray-900 font-bold text-lg">John Doe</h3>
                    <p className="text-gray-500 text-sm">@johndoe</p>
                    <p className="text-gray-600 text-sm mt-1">"Lunch split"</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-bold text-lg text-red-600">-฿5,000.00</p>
                    <p className="text-gray-500 text-sm">2024-01-15</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sarah Wilson Transaction */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                </svg>
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-gray-900 font-bold text-lg">Sarah Wilson</h3>
                    <p className="text-gray-500 text-sm">@sarahw</p>
                    <p className="text-gray-600 text-sm mt-1">"Movie tickets"</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-bold text-lg text-green-600">+฿2,500.00</p>
                    <p className="text-gray-500 text-sm">2024-01-14</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mike Chen Transaction */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-gray-900 font-bold text-lg">Mike Chen</h3>
                    <p className="text-gray-500 text-sm">@mikechan</p>
                    <p className="text-gray-600 text-sm mt-1">"Dinner payment"</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-bold text-lg text-red-600">-฿6,800.00</p>
                    <p className="text-gray-500 text-sm">2024-01-13</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Padding */}
      <div className="h-8"></div>
    </div>
  )
}

export default Demo