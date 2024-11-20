import MarketCard from '../components/MarketCard'

function Home() {
  const trendingMarkets = [
    {
      id: 1,
      title: "Next Viral Social Media Platform",
      description: "Which emerging social platform will reach 100M users first in 2024?",
      endDate: "2024-12-31",
      totalBets: 1234,
      options: [
        { id: 1, text: "BeReal 2.0", odds: 3.5 },
        { id: 2, text: "Threads", odds: 2.1 },
        { id: 3, text: "Lemon8", odds: 4.2 },
        { id: 4, text: "Other", odds: 5.0 }
      ]
    },
    {
      id: 2,
      title: "Next Big AI Development",
      description: "What will be the next breakthrough in AI by end of 2024?",
      endDate: "2024-12-31",
      totalBets: 892,
      options: [
        { id: 1, text: "AGI Breakthrough", odds: 8.0 },
        { id: 2, text: "Human-like Reasoning", odds: 4.5 },
        { id: 3, text: "Emotion Understanding", odds: 3.2 },
        { id: 4, text: "Other", odds: 2.0 }
      ]
    }
  ]

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Predict The Next Big Trend
        </h1>
        <p className="text-xl text-gray-600">
          Bet on upcoming trends in memes, university rankings, social movements, and viral challenges
        </p>
      </div>

      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">🔥 Trending Markets</h2>
          <button className="text-primary hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingMarkets.map((market) => (
            <MarketCard key={market.id} {...market} />
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Create Your Own Market</h2>
        <p className="text-gray-600 mb-6">
          Have a prediction about the next big trend? Create a market and let others bet on it!
        </p>
        <button className="btn btn-primary">Create Market</button>
      </div>
    </div>
  )
}

export default Home 