import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500"></div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                MemeBaskets
              </span>
            </div>
            <Link 
              to="/app" 
              className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-300 backdrop-blur-sm"
            >
              Launch App →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        <div className="container mx-auto px-4 pt-20 pb-32">
          <div className="max-w-5xl mx-auto text-center">
            <div className="animate-float mb-12">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-3xl opacity-50 scale-150"></div>
                <img 
                  src="/meme-coins.png" 
                  alt="Meme Coins" 
                  className="relative w-40 h-40"
                />
              </div>
            </div>
            
            <h1 className="text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Predict & Win with
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Meme Coin Baskets
              </span>
            </h1>
            
            <p className="text-2xl text-blue-200 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join the future of meme coin trading. Predict trends, win rewards, and become a crypto oracle in just 5 minutes! 🚀
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
              <Link 
                to="/app" 
                className="group relative overflow-hidden px-12 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-lg font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
              >
                <span className="relative z-10">Launch dApp</span>
                <div className="absolute inset-0 -translate-y-full group-hover:translate-y-0 bg-gradient-to-r from-blue-600 to-cyan-600 transition-transform duration-300"></div>
              </Link>
              <a 
                href="#how-it-works"
                className="px-12 py-4 bg-white/10 border border-white/20 rounded-xl text-lg font-medium hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
              >
                Learn More
              </a>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
              {[
                { symbol: 'DOGE', price: '$0.12', change: '+5.2%', volume: '$2.1M' },
                { symbol: 'SHIB', price: '$0.00003', change: '+3.8%', volume: '$1.8M' },
                { symbol: 'PEPE', price: '$0.0000012', change: '+8.1%', volume: '$1.5M' },
                { symbol: 'FLOKI', price: '$0.0003', change: '+6.5%', volume: '$1.2M' }
              ].map((coin) => (
                <div key={coin.symbol} 
                  className="relative group p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="text-2xl font-bold text-blue-400 mb-2">{coin.symbol}</div>
                    <div className="text-white mb-1">{coin.price}</div>
                    <div className="text-emerald-400 text-sm">{coin.change}</div>
                    <div className="text-blue-300 text-sm mt-2">Vol: {coin.volume}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div id="how-it-works" className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: "⚡️",
                  title: "Quick Rounds",
                  description: "5-minute prediction rounds for fast-paced action and quick rewards"
                },
                {
                  icon: "🎯",
                  title: "Simple Betting",
                  description: "Pick your basket and place your bet with one click"
                },
                {
                  icon: "💰",
                  title: "Instant Rewards",
                  description: "Automatically receive rewards when your prediction is correct"
                }
              ].map((feature) => (
                <div key={feature.title} 
                  className="group p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-blue-200">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-8 mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center text-blue-400">
            © 2024 MemeBaskets. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing; 