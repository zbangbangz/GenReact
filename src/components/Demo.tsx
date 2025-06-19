import { useState } from 'react'

function Demo() {
  const [showBalance, setShowBalance] = useState(true)
  
  const transactions = [
    {
      id: 1,
      name: "John Doe",
      username: "@johndoe",
      amount: -5000.00,
      date: "2024-01-15",
      description: "Lunch split",
      type: "send"
    },
    {
      id: 2,
      name: "Sarah Wilson",
      username: "@sarahw",
      amount: 2500.00,
      date: "2024-01-14",
      description: "Movie tickets",
      type: "receive"
    },
    {
      id: 3,
      name: "Mike Chen",
      username: "@mikechen",
      amount: -6800.00,
      date: "2024-01-13",
      description: "Rent contribution",
      type: "send"
    }
  ]

  return (
    <div>
      {/* Purple Header Card - Matching the image */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-b-[32px] px-6 pt-8 pb-8 relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-16 right-8 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-12 left-6 w-24 h-24 bg-white rounded-full blur-3xl"></div>
        </div>
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10 relative z-10">
          <h1 className="text-white text-3xl font-bold tracking-tight">PayWise</h1>
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <div className="w-8 h-8 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Balance Section */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white text-lg font-medium opacity-90">Available Balance</span>
            <button 
              onClick={() => setShowBalance(!showBalance)}
              className="text-white hover:text-purple-200 transition-colors p-2 opacity-80"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showBalance ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 616 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                )}
              </svg>
            </button>
          </div>
          <div className="text-white text-[48px] font-bold tracking-tight">
            {showBalance ? "฿82,500.50" : "••••••••"}
          </div>
        </div>
      </div>

      {/* Action Cards - Purple Theme */}
      <div className="px-6 -mt-6 relative z-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <h3 className="text-gray-900 text-xl font-bold mb-1">Send Money</h3>
            <p className="text-gray-600 text-sm">Transfer to friends</p>
          </div>
          
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-gray-900 text-xl font-bold mb-1">History</h3>
            <p className="text-gray-600 text-sm">View transactions</p>
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
          {transactions.map((transaction) => (
            <div key={transaction.id} className="bg-white rounded-3xl p-5 shadow-lg border border-gray-100">
              <div className="flex items-center">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-4 ${
                  transaction.type === 'send' ? 'bg-red-100' : 'bg-green-100'
                }`}>
                  <svg className={`w-6 h-6 ${
                    transaction.type === 'send' ? 'text-red-600' : 'text-green-600'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {transaction.type === 'send' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                    )}
                  </svg>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-gray-900 font-bold text-lg">{transaction.name}</h3>
                      <p className="text-gray-500 text-sm">{transaction.username}</p>
                      <p className="text-gray-600 text-sm mt-1">"{transaction.description}"</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className={`font-bold text-lg ${
                        transaction.amount < 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {transaction.amount < 0 ? '-' : '+'}฿{Math.abs(transaction.amount).toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </p>
                      <p className="text-gray-500 text-sm">{transaction.date}</p>
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

export default Demo