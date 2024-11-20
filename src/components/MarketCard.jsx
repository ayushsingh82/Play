import { useState } from 'react'

function MarketCard({ title, description, endDate, options, totalBets }) {
  const [selectedOption, setSelectedOption] = useState(null)

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
          {totalBets} bets
        </span>
      </div>
      
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="space-y-3 mb-4">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelectedOption(option.id)}
            className={`w-full p-3 rounded-lg border transition-colors ${
              selectedOption === option.id
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-primary/50'
            }`}
          >
            <div className="flex justify-between items-center">
              <span>{option.text}</span>
              <span className="font-semibold">{option.odds}x</span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Ends: {new Date(endDate).toLocaleDateString()}</span>
        <button className="btn btn-primary">
          Place Bet
        </button>
      </div>
    </div>
  )
}

export default MarketCard 