import { Link } from 'react-router-dom';

function Home() {
  const memeCoins = [
    {
      name: 'DOGE',
      image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
      color: 'from-yellow-400 to-yellow-600',
      price: '$0.12',
      change: '+5.2%'
    },
    {
      name: 'SHIB',
      image: 'https://assets.coingecko.com/coins/images/11939/large/shiba.png',
      color: 'from-red-400 to-red-600',
      price: '$0.00003',
      change: '+3.8%'
    },
    {
      name: 'PEPE',
      image: 'https://assets.coingecko.com/coins/images/29850/large/pepe-token.jpeg',
      color: 'from-green-400 to-green-600',
      price: '$0.0000012',
      change: '+8.1%'
    },
    {
      name: 'FLOKI',
      image: 'https://assets.coingecko.com/coins/images/16746/large/PNG_image.png',
      color: 'from-blue-400 to-blue-600',
      price: '$0.0003',
      change: '+6.5%'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-4 pt-32 pb-20">
          <div className="text-center mb-20">
            <h1 className="text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Trade the Future of
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Meme Coins
              </span>
            </h1>
            <p className="text-2xl text-blue-200 mb-12 max-w-3xl mx-auto">
              Predict which meme coin will moon next and earn rewards in 5-minute trading rounds! 🚀
            </p>
            <Link
              to="/app/bet"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
            >
              Start Trading
              <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Meme Coins Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {memeCoins.map((coin) => (
              <div key={coin.name} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-blue-900/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-700/50 hover:border-blue-500 transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`text-2xl font-bold bg-gradient-to-r ${coin.color} bg-clip-text text-transparent`}>
                      {coin.name}
                    </div>
                    <div className="text-right">
                      <div className="text-white">{coin.price}</div>
                      <div className="text-emerald-400 text-sm">{coin.change}</div>
                    </div>
                  </div>
                  <div className="w-24 h-24 mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    <img 
                      src={coin.image} 
                      alt={coin.name} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <Link
                    to="/app/bet"
                    className={`block w-full py-3 text-center bg-gradient-to-r ${coin.color} rounded-lg text-white font-semibold hover:opacity-90 transition-opacity`}
                  >
                    Trade Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { label: 'Total Volume', value: '$1M+', icon: '📈' },
              { label: 'Active Users', value: '10K+', icon: '👥' },
              { label: 'Average Returns', value: '25%', icon: '💰' }
            ].map((stat) => (
              <div key={stat.label} className="bg-blue-900/20 backdrop-blur-sm rounded-xl p-8 border border-blue-700/50">
                <div className="text-3xl mb-4">{stat.icon}</div>
                <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 