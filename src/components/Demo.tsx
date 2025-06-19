import { useState } from 'react'

interface Transaction {
  id: string
  type: 'incoming' | 'outgoing'
  amount: number
  recipient: string
  paytag: string
  memo: string
  date: string
  time: string
  status: 'completed' | 'pending'
}

interface User {
  paytag: string
  name: string
  isActive: boolean
}

// Mock data - Updated to match PRD specifications
const mockUsers: User[] = [
  { paytag: '@johndoe', name: 'John Doe', isActive: true },
  { paytag: '@sarahw', name: 'Sarah Wilson', isActive: true },
  { paytag: '@mikechen', name: 'Mike Chen', isActive: true },
  { paytag: '@amylee', name: 'Amy Lee', isActive: true },
  { paytag: '@davidkim', name: 'David Kim', isActive: true }
]

// Updated mock transactions - sorted in reverse chronological order as per PRD
const mockTransactions: Transaction[] = [
  {
    id: 'TXN-2025-001234',
    type: 'outgoing',
    amount: 5000.00,
    recipient: 'John Doe',
    paytag: '@johndoe',
    memo: 'Lunch split',
    date: '2025-06-19',
    time: '14:32',
    status: 'completed'
  },
  {
    id: 'TXN-2025-001233',
    type: 'incoming',
    amount: 2500.00,
    recipient: 'Sarah Wilson',
    paytag: '@sarahw',
    memo: 'Movie tickets',
    date: '2025-06-18',
    time: '16:45',
    status: 'completed'
  },
  {
    id: 'TXN-2025-001232',
    type: 'outgoing',
    amount: 6800.00,
    recipient: 'Mike Chen',
    paytag: '@mikechen',
    memo: 'Rent contribution',
    date: '2025-06-17',
    time: '20:15',
    status: 'completed'
  }
]

function Demo() {
  const [currentView, setCurrentView] = useState<'home' | 'transfer' | 'history' | 'confirmation' | 'pin' | 'receipt' | 'details'>('home')
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [showBalance, setShowBalance] = useState(true)
  const [pinAttempts, setPinAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  
  // Transfer form state
  const [transferData, setTransferData] = useState({
    paytag: '',
    amount: '',
    memo: '',
    recipient: null as User | null
  })
  
  const [pin, setPin] = useState('')
  const [searchResults, setSearchResults] = useState<User[]>([])
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  const currentBalance = 82500.50

  // Search PayTag users - Enhanced as per PRD US1.1
  const searchPayTag = (query: string) => {
    if (query.length < 1) {
      setSearchResults([])
      return
    }
    const results = mockUsers.filter(user => 
      user.paytag.toLowerCase().includes(query.toLowerCase()) ||
      user.name.toLowerCase().includes(query.toLowerCase())
    )
    setSearchResults(results)
  }

  // Enhanced validation as per PRD acceptance criteria
  const validateTransfer = () => {
    const newErrors: {[key: string]: string} = {}
    
    // PRD: "User not found" error validation
    if (!transferData.recipient) {
      newErrors.paytag = 'User not found'
    }
    
    const amount = parseFloat(transferData.amount)
    // PRD: Amount cannot be zero or negative
    if (!amount || amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0'
    } 
    // PRD: Cannot exceed available balance
    else if (amount > currentBalance) {
      newErrors.amount = 'Insufficient balance'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Enhanced PIN handling as per PRD US1.4 - Lock after 3 attempts
  const handlePinSubmit = () => {
    if (pin === '123456') { // Mock correct PIN
      setCurrentView('receipt')
      setPinAttempts(0)
      setPin('')
    } else {
      const newAttempts = pinAttempts + 1
      setPinAttempts(newAttempts)
      // PRD: Lock after 3 incorrect attempts
      if (newAttempts >= 3) {
        setIsLocked(true)
        setTimeout(() => {
          setIsLocked(false)
          setPinAttempts(0)
        }, 30000) // Lock for 30 seconds in demo
      }
      setPin('')
    }
  }

  // Generate transaction ID as per PRD requirements
  const generateTransactionId = () => {
    return `TXN-${new Date().getFullYear()}-${Math.floor(Math.random() * 999999).toString().padStart(6, '0')}`
  }

  // Reset transfer
  const resetTransfer = () => {
    setTransferData({ paytag: '', amount: '', memo: '', recipient: null })
    setSearchResults([])
    setErrors({})
    setPin('')
    setCurrentView('home')
  }

  // Transfer View - US1.1 & US1.2 Implementation
  if (currentView === 'transfer') {
    return (
      <div className="min-h-screen bg-scb-gray-50 font-scb">
        {/* Header */}
        <div className="bg-gradient-to-br from-scb-purple to-scb-purple-dark px-6 py-8">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setCurrentView('home')}
              className="text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-white text-xl font-bold">Send Money</h1>
            <div></div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* PayTag Search - US1.1: PayTag identifier */}
          <div>
            <label className="block text-scb-gray-700 font-medium mb-2">To (PayTag or Name)</label>
            <input
              type="text"
              placeholder="Enter @paytag or name"
              value={transferData.paytag}
              onChange={(e) => {
                setTransferData({...transferData, paytag: e.target.value, recipient: null})
                searchPayTag(e.target.value)
                setErrors({...errors, paytag: ''})
              }}
              className={`w-full p-4 rounded-2xl border ${errors.paytag ? 'border-red-500' : 'border-scb-gray-200'} focus:border-scb-purple focus:outline-none`}
            />
            {errors.paytag && <p className="text-red-500 text-sm mt-1">{errors.paytag}</p>}
            
            {/* Search Results */}
            {searchResults.length > 0 && !transferData.recipient && (
              <div className="mt-2 bg-white rounded-2xl shadow-lg border border-scb-gray-100">
                {searchResults.map((user) => (
                  <button
                    key={user.paytag}
                    onClick={() => {
                      setTransferData({...transferData, recipient: user, paytag: user.paytag})
                      setSearchResults([])
                    }}
                    className="w-full p-4 text-left hover:bg-scb-gray-50 first:rounded-t-2xl last:rounded-b-2xl border-b border-scb-gray-100 last:border-b-0"
                  >
                    <div className="font-medium text-scb-gray-900">{user.name}</div>
                    <div className="text-sm text-scb-purple">{user.paytag}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Selected Recipient - Clear display as per PRD */}
          {transferData.recipient && (
            <div className="bg-scb-purple bg-opacity-10 p-4 rounded-2xl border border-scb-purple border-opacity-30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-scb-gray-900">{transferData.recipient.name}</div>
                  <div className="text-sm text-scb-purple">{transferData.recipient.paytag}</div>
                </div>
                <button
                  onClick={() => setTransferData({...transferData, recipient: null, paytag: ''})}
                  className="text-scb-purple p-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Amount - US1.2: Amount entry */}
          <div>
            <label className="block text-scb-gray-700 font-medium mb-2">Amount (฿)</label>
            <input
              type="number"
              placeholder="0.00"
              value={transferData.amount}
              onChange={(e) => {
                setTransferData({...transferData, amount: e.target.value})
                setErrors({...errors, amount: ''})
              }}
              className={`w-full p-4 rounded-2xl border ${errors.amount ? 'border-red-500' : 'border-scb-gray-200'} focus:border-scb-purple focus:outline-none text-2xl font-bold`}
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
          </div>

          {/* Memo - US1.2: Optional memo */}
          <div>
            <label className="block text-scb-gray-700 font-medium mb-2">Memo (Optional)</label>
            <input
              type="text"
              placeholder="What's this for?"
              value={transferData.memo}
              onChange={(e) => setTransferData({...transferData, memo: e.target.value})}
              className="w-full p-4 rounded-2xl border border-scb-gray-200 focus:border-scb-purple focus:outline-none"
              maxLength={50}
            />
            <p className="text-xs text-scb-gray-500 mt-1">{transferData.memo.length}/50 characters</p>
          </div>

          {/* Continue Button */}
          <button
            onClick={() => {
              if (validateTransfer()) {
                setCurrentView('confirmation')
              }
            }}
            className="w-full bg-scb-purple text-white p-4 rounded-2xl font-medium hover:bg-scb-purple-dark transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    )
  }

  // Confirmation View - US1.3: Transaction Review
  if (currentView === 'confirmation') {
    return (
      <div className="min-h-screen bg-scb-gray-50 font-scb">
        {/* Header */}
        <div className="bg-gradient-to-br from-scb-purple to-scb-purple-dark px-6 py-8">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setCurrentView('transfer')}
              className="text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-white text-xl font-bold">Review Transfer</h1>
            <div></div>
          </div>
        </div>

        <div className="px-6 py-6">
          {/* Confirmation Card - PRD: Clear display of recipient name, PayTag, amount */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-scb-gray-100 mb-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-scb-purple bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-scb-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-scb-gray-900 mb-2">฿{parseFloat(transferData.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</h2>
              <p className="text-scb-gray-600">Please review the details below</p>
            </div>

            <div className="space-y-4">
              {/* PRD: Clear display of recipient's full name and PayTag */}
              <div className="flex justify-between">
                <span className="text-scb-gray-600">To</span>
                <div className="text-right">
                  <div className="font-medium text-scb-gray-900">{transferData.recipient?.name}</div>
                  <div className="text-sm text-scb-purple">{transferData.recipient?.paytag}</div>
                </div>
              </div>
              
              {transferData.memo && (
                <div className="flex justify-between">
                  <span className="text-scb-gray-600">Memo</span>
                  <span className="font-medium text-scb-gray-900">"{transferData.memo}"</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-scb-gray-600">Transfer Fee</span>
                <span className="font-medium text-scb-gray-900">฿0.00</span>
              </div>

              <hr className="border-scb-gray-200" />

              <div className="flex justify-between">
                <span className="text-scb-gray-600">Total Amount</span>
                <span className="text-xl font-bold text-scb-gray-900">฿{parseFloat(transferData.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {/* Confirm Button - Leads to PIN entry */}
          <button
            onClick={() => setCurrentView('pin')}
            className="w-full bg-scb-purple text-white p-4 rounded-2xl font-medium hover:bg-scb-purple-dark transition-colors"
          >
            Confirm & Enter PIN
          </button>
        </div>
      </div>
    )
  }

  // PIN View - US1.4: 6-digit PIN authorization
  if (currentView === 'pin') {
    return (
      <div className="min-h-screen bg-scb-gray-50 font-scb">
        {/* Header */}
        <div className="bg-gradient-to-br from-scb-purple to-scb-purple-dark px-6 py-8">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setCurrentView('confirmation')}
              className="text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-white text-xl font-bold">Authorize Transfer</h1>
            <div></div>
          </div>
        </div>

        <div className="px-6 py-12 text-center">
          {/* PRD: Lock after 3 incorrect attempts */}
          {isLocked ? (
            <div className="bg-red-50 p-6 rounded-3xl border border-red-200 mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-red-800 mb-2">Transaction Capability Locked</h3>
              <p className="text-red-600">Too many incorrect PIN attempts. Please try again later.</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-scb-gray-900 mb-2">Enter your 6-digit PIN</h2>
              <p className="text-scb-gray-600 mb-8">to authorize this transfer securely</p>
              
              {pinAttempts > 0 && (
                <div className="text-red-600 mb-4">
                  Incorrect PIN. {3 - pinAttempts} attempt(s) remaining.
                </div>
              )}

              {/* PIN Display */}
              <div className="flex justify-center space-x-4 mb-8">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-full border-2 ${
                      i < pin.length ? 'bg-scb-purple border-scb-purple' : 'border-scb-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Number Pad */}
              <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      if (pin.length < 6) {
                        const newPin = pin + num
                        setPin(newPin)
                        if (newPin.length === 6) {
                          setTimeout(() => {
                            handlePinSubmit()
                          }, 100)
                        }
                      }
                    }}
                    className="w-16 h-16 bg-white rounded-full text-xl font-bold text-scb-gray-900 hover:bg-scb-gray-50 shadow-lg border border-scb-gray-100"
                  >
                    {num}
                  </button>
                ))}
                <div></div>
                <button
                  onClick={() => {
                    if (pin.length < 6) {
                      const newPin = pin + '0'
                      setPin(newPin)
                      if (newPin.length === 6) {
                        setTimeout(() => {
                          handlePinSubmit()
                        }, 100)
                      }
                    }
                  }}
                  className="w-16 h-16 bg-white rounded-full text-xl font-bold text-scb-gray-900 hover:bg-scb-gray-50 shadow-lg border border-scb-gray-100"
                >
                  0
                </button>
                <button
                  onClick={() => setPin(pin.slice(0, -1))}
                  className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-scb-gray-50 shadow-lg border border-scb-gray-100"
                >
                  <svg className="w-6 h-6 text-scb-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                  </svg>
                </button>
              </div>
              
              <p className="text-xs text-scb-gray-500 mt-6">Demo PIN: 123456</p>
            </>
          )}
        </div>
      </div>
    )
  }

  // Receipt View - PRD: Digital receipt (E-Slip) with all essential details
  if (currentView === 'receipt') {
    const transactionId = generateTransactionId()
    const currentDate = new Date()
    const dateStr = currentDate.toLocaleDateString('en-GB')
    const timeStr = currentDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

    return (
      <div className="min-h-screen bg-scb-gray-50 font-scb">
        {/* Header */}
        <div className="bg-gradient-to-br from-scb-gold-dark to-scb-gold px-6 py-8">
          <div className="flex items-center justify-between">
            <div></div>
            <h1 className="text-white text-xl font-bold">Transfer Successful</h1>
            <button 
              onClick={resetTransfer}
              className="text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="px-6 py-6">
          {/* Success Icon */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-scb-gold bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-scb-gold-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-scb-gray-900 mb-2">Transfer Completed</h2>
            <p className="text-scb-gray-600">Your money has been sent successfully</p>
          </div>

          {/* PRD: Digital Receipt (E-Slip) with all essential details */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-scb-gray-100 mb-6">
            <div className="text-center border-b border-scb-gray-200 pb-4 mb-4">
              <h3 className="text-lg font-bold text-scb-gray-900">Digital Receipt (E-Slip)</h3>
              <p className="text-sm text-scb-gray-500 font-mono">{transactionId}</p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-scb-gray-600">Date & Time</span>
                <span className="font-medium text-scb-gray-900">{dateStr} {timeStr}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-scb-gray-600">From</span>
                <span className="font-medium text-scb-gray-900">You</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-scb-gray-600">To</span>
                <div className="text-right">
                  <div className="font-medium text-scb-gray-900">{transferData.recipient?.name}</div>
                  <div className="text-scb-purple">{transferData.recipient?.paytag}</div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-scb-gray-600">Amount</span>
                <span className="font-bold text-scb-gray-900">฿{parseFloat(transferData.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-scb-gray-600">Transfer Fee</span>
                <span className="font-medium text-scb-gray-900">฿0.00</span>
              </div>
              
              {transferData.memo && (
                <div className="flex justify-between">
                  <span className="text-scb-gray-600">Memo</span>
                  <span className="font-medium text-scb-gray-900">"{transferData.memo}"</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-scb-gray-600">Status</span>
                <span className="font-medium text-scb-gold-dark">Completed</span>
              </div>
            </div>
          </div>

          {/* Action Buttons - PRD: Save as image capability */}
          <div className="space-y-3">
            <button className="w-full bg-scb-purple text-white p-4 rounded-2xl font-medium hover:bg-scb-purple-dark transition-colors">
              Save Receipt as Image
            </button>
            <button 
              onClick={resetTransfer}
              className="w-full bg-scb-gray-100 text-scb-gray-700 p-4 rounded-2xl font-medium hover:bg-scb-gray-200 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    )
  }

  // History View - US2.1: Transaction History Feed (sorted in reverse chronological order)
  if (currentView === 'history') {
    return (
      <div className="min-h-screen bg-scb-gray-50 font-scb">
        {/* Header */}
        <div className="bg-gradient-to-br from-scb-purple to-scb-purple-dark px-6 py-8">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setCurrentView('home')}
              className="text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-white text-xl font-bold">Transaction History</h1>
            <div></div>
          </div>
        </div>

        <div className="px-6 py-6">
          {/* PRD: Transactions sorted in reverse chronological order */}
          <div className="space-y-4">
            {mockTransactions.map((transaction) => (
              <button
                key={transaction.id}
                onClick={() => {
                  setSelectedTransaction(transaction)
                  setCurrentView('details')
                }}
                className="w-full bg-white rounded-3xl p-6 shadow-lg border border-scb-gray-100 hover:bg-scb-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  {/* PRD: Visually distinct outgoing/incoming transfers */}
                  <div className={`w-14 h-14 ${transaction.type === 'outgoing' ? 'bg-red-100' : 'bg-scb-gold bg-opacity-20'} rounded-full flex items-center justify-center mr-4`}>
                    <svg className={`w-6 h-6 ${transaction.type === 'outgoing' ? 'text-red-600' : 'text-scb-gold-dark'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={transaction.type === 'outgoing' ? "M7 11l5-5m0 0l5 5m-5-5v12" : "M17 13l-5 5m0 0l-5-5m5 5V6"} />
                    </svg>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 text-left">
                        <h3 className="text-scb-gray-900 font-bold text-lg">{transaction.recipient}</h3>
                        <p className="text-scb-gray-500 text-sm">{transaction.paytag}</p>
                        {transaction.memo && <p className="text-scb-gray-600 text-sm mt-1">"{transaction.memo}"</p>}
                      </div>
                      <div className="text-right ml-4">
                        <p className={`font-bold text-lg ${transaction.type === 'outgoing' ? 'text-red-600' : 'text-scb-gold-dark'}`}>
                          {transaction.type === 'outgoing' ? '-' : '+'}฿{transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                        <p className="text-scb-gray-500 text-sm">{transaction.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Transaction Details View - US2.2: Detailed transaction information
  if (currentView === 'details' && selectedTransaction) {
    return (
      <div className="min-h-screen bg-scb-gray-50 font-scb">
        {/* Header */}
        <div className="bg-gradient-to-br from-scb-purple to-scb-purple-dark px-6 py-8">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setCurrentView('history')}
              className="text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-white text-xl font-bold">Transaction Details</h1>
            <div></div>
          </div>
        </div>

        <div className="px-6 py-6">
          {/* Amount Section */}
          <div className="text-center mb-6">
            <div className={`w-20 h-20 ${selectedTransaction.type === 'outgoing' ? 'bg-red-100' : 'bg-scb-gold bg-opacity-20'} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <svg className={`w-10 h-10 ${selectedTransaction.type === 'outgoing' ? 'text-red-600' : 'text-scb-gold-dark'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={selectedTransaction.type === 'outgoing' ? "M7 11l5-5m0 0l5 5m-5-5v12" : "M17 13l-5 5m0 0l-5-5m5 5V6"} />
              </svg>
            </div>
            <h2 className={`text-3xl font-bold mb-2 ${selectedTransaction.type === 'outgoing' ? 'text-red-600' : 'text-scb-gold-dark'}`}>
              {selectedTransaction.type === 'outgoing' ? '-' : '+'}฿{selectedTransaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </h2>
            <p className="text-scb-gray-600 capitalize">{selectedTransaction.type} Transfer</p>
          </div>

          {/* PRD: All transaction details as specified in US2.2 */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-scb-gray-100 mb-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-scb-gray-600">Transaction ID</span>
                <span className="font-mono text-sm font-medium text-scb-gray-900">{selectedTransaction.id}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-scb-gray-600">Date & Time</span>
                <span className="font-medium text-scb-gray-900">{selectedTransaction.date} {selectedTransaction.time}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-scb-gray-600">{selectedTransaction.type === 'outgoing' ? 'To' : 'From'}</span>
                <div className="text-right">
                  <div className="font-medium text-scb-gray-900">{selectedTransaction.recipient}</div>
                  <div className="text-sm text-scb-purple">{selectedTransaction.paytag}</div>
                </div>
              </div>
              
              {selectedTransaction.memo && (
                <div className="flex justify-between">
                  <span className="text-scb-gray-600">Memo</span>
                  <span className="font-medium text-scb-gray-900">"{selectedTransaction.memo}"</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-scb-gray-600">Status</span>
                <span className="font-medium text-scb-gold-dark capitalize">{selectedTransaction.status}</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full bg-scb-purple text-white p-4 rounded-2xl font-medium hover:bg-scb-purple-dark transition-colors">
            Share Receipt
          </button>
        </div>
      </div>
    )
  }

  // Home View - Main PayWise interface with SCB Bank theme
  return (
    <div className="font-scb">
      {/* SCB Purple Header Card - Matching Main tab exactly */}
      <div className="bg-gradient-to-br from-scb-purple to-scb-purple-dark rounded-b-[32px] px-6 pt-8 pb-8 relative overflow-hidden">
        {/* Subtle background elements - matching Main tab */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-16 right-8 w-32 h-32 bg-scb-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-12 left-6 w-24 h-24 bg-scb-gold rounded-full blur-3xl"></div>
        </div>
        
        {/* Header - matching Main tab */}
        <div className="flex justify-between items-center mb-10 relative z-10">
          <h1 className="text-white text-3xl font-bold tracking-tight">PayWise</h1>
          <div className="w-12 h-12 bg-scb-gold bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <div className="w-8 h-8 bg-scb-gold rounded-full"></div>
          </div>
        </div>

        {/* Balance Section - matching Main tab */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white text-lg font-medium opacity-90">Available Balance</span>
            <button 
              onClick={() => setShowBalance(!showBalance)}
              className="text-white hover:text-scb-gold-light transition-colors p-2 opacity-80"
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
            {showBalance ? `฿${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : "••••••••"}
          </div>
        </div>
      </div>

      {/* Action Cards - SCB Theme matching Main tab exactly */}
      <div className="px-6 -mt-6 relative z-10">
        <div className="grid grid-cols-2 gap-4">
          {/* Send Money Card */}
          <button
            onClick={() => setCurrentView('transfer')}
            className="bg-white rounded-3xl p-6 shadow-lg border border-scb-gray-100 hover:bg-scb-gray-50 transition-colors"
          >
            <div className="w-14 h-14 bg-scb-purple bg-opacity-10 rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-scb-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <h3 className="text-scb-gray-900 text-xl font-bold mb-1">Send Money</h3>
            <p className="text-scb-gray-600 text-sm">Transfer to friends</p>
          </button>
          
          {/* History Card */}
          <button
            onClick={() => setCurrentView('history')}
            className="bg-white rounded-3xl p-6 shadow-lg border border-scb-gray-100 hover:bg-scb-gray-50 transition-colors"
          >
            <div className="w-14 h-14 bg-scb-gold bg-opacity-20 rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-scb-gold-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-scb-gray-900 text-xl font-bold mb-1">History</h3>
            <p className="text-scb-gray-600 text-sm">View transactions</p>
          </button>
        </div>
      </div>

      {/* Recent Activity - matching Main tab exactly */}
      <div className="px-6 mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-scb-gray-900 text-2xl font-bold">Recent Activity</h2>
          <button 
            onClick={() => setCurrentView('history')}
            className="text-scb-purple font-semibold hover:text-scb-purple-light transition-colors"
          >
            View All
          </button>
        </div>

        <div className="space-y-4">
          {mockTransactions.slice(0, 3).map((transaction) => (
            <button
              key={transaction.id}
              onClick={() => {
                setSelectedTransaction(transaction)
                setCurrentView('details')
              }}
              className="w-full bg-white rounded-3xl p-5 shadow-lg border border-scb-gray-100 hover:bg-scb-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-4 ${
                  transaction.type === 'outgoing' ? 'bg-red-50' : 'bg-scb-gold bg-opacity-20'
                }`}>
                  <svg className={`w-6 h-6 ${
                    transaction.type === 'outgoing' ? 'text-red-600' : 'text-scb-gold-dark'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {transaction.type === 'outgoing' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                    )}
                  </svg>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-scb-gray-900 font-bold text-lg">{transaction.recipient}</h3>
                      <p className="text-scb-gray-500 text-sm">{transaction.paytag}</p>
                      {transaction.memo && <p className="text-scb-gray-600 text-sm mt-1">"{transaction.memo}"</p>}
                    </div>
                    <div className="text-right ml-4">
                      <p className={`font-bold text-lg ${
                        transaction.type === 'outgoing' ? 'text-red-600' : 'text-scb-gold-dark'
                      }`}>
                        {transaction.type === 'outgoing' ? '-' : '+'}฿{transaction.amount.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </p>
                      <p className="text-scb-gray-500 text-sm">{transaction.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Padding */}
      <div className="h-8"></div>
    </div>
  )
}

export default Demo