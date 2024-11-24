import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % memeCoins.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const memeCoins = [
    {
      name: 'DOGE',
      image: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png',
      color: 'from-yellow-400 to-orange-400',
      price: '$0.12',
      change: '+5.2%',
      delay: '0',
      marketCap: '$16.2B',
      volume: '$982M',
      description: 'Much wow, very profit! The original meme coin.'
    },
    {
      name: 'SHIB',
      image: 'https://cryptologos.cc/logos/shiba-inu-shib-logo.png',
      color: 'from-red-400 to-pink-400',
      price: '$0.00003',
      change: '+3.8%',
      delay: '100',
      marketCap: '$5.8B',
      volume: '$456M',
      description: 'The DOGE killer with a growing ecosystem.'
    },
    {
      name: 'PEPE',
      image: 'https://cryptologos.cc/logos/pepe-pepe-logo.png',
      color: 'from-green-400 to-emerald-400',
      price: '$0.0000012',
      change: '+8.1%',
      delay: '200',
      marketCap: '$1.2B',
      volume: '$234M',
      description: 'The rarest Pepe of them all.'
    },
    {
      name: 'FLOKI',
      image: 'https://cryptologos.cc/logos/floki-inu-floki-logo.png',
      color: 'from-blue-400 to-indigo-400',
      price: '$0.0003',
      change: '+6.5%',
      delay: '300',
      marketCap: '$892M',
      volume: '$123M',
      description: 'Viking-inspired gains await.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      </div>

      {/* Featured Section */}
      <div className="relative">
        <div className="container mx-auto px-4 pt-10 pb-10">
          {/* Rotating Coins Section */}
          <div className="relative h-[400px] mb-10">
            {/* Center Light */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white">
                MB
              </div>
            </div>
            
            {/* Rotating Coins */}
            {memeCoins.map((coin, index) => (
              <div
                key={coin.name}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `rotate(${index * 90}deg) translateX(150px) rotate(-${index * 90}deg)`,
                  transition: 'transform 0.5s ease-out',
                  marginLeft: '-40px',
                  marginTop: '-40px'
                }}
              >
                <div 
                  className={`relative group cursor-pointer transform transition-all duration-500 ${
                    activeIndex === index ? 'scale-125' : 'scale-100'
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${coin.color} rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                  <img 
                    src={coin.image} 
                    alt={coin.name} 
                    className="relative w-20 h-20 rounded-full shadow-lg transition-transform duration-300 bg-white p-2"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://via.placeholder.com/150?text=${coin.name}`;
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Featured Coin Info */}
          <div className="text-center mb-10">
            <div className={`transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <h2 className={`text-4xl font-bold mb-4 bg-gradient-to-r ${memeCoins[activeIndex].color} bg-clip-text text-transparent`}>
                {memeCoins[activeIndex].name}
              </h2>
              <p className="text-lg text-blue-200 mb-6">{memeCoins[activeIndex].description}</p>
              <div className="flex justify-center items-center space-x-6 mb-6">
                <div className="text-center bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                  <div className="text-sm text-blue-200 mb-1">Price</div>
                  <div className="text-2xl font-bold">{memeCoins[activeIndex].price}</div>
                </div>
                <div className="text-center bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                  <div className="text-sm text-blue-200 mb-1">24h Change</div>
                  <div className="text-2xl font-bold text-emerald-400">{memeCoins[activeIndex].change}</div>
                </div>
                <div className="text-center bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                  <div className="text-sm text-blue-200 mb-1">Market Cap</div>
                  <div className="text-2xl font-bold">{memeCoins[activeIndex].marketCap}</div>
                </div>
                <div className="text-center bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                  <div className="text-sm text-blue-200 mb-1">Volume</div>
                  <div className="text-2xl font-bold">{memeCoins[activeIndex].volume}</div>
                </div>
              </div>
              <Link
                to="/app/bet"
                className={`inline-flex items-center px-8 py-4 bg-gradient-to-r ${memeCoins[activeIndex].color} rounded-xl text-lg font-medium hover:scale-105 transition-all duration-300 shadow-lg`}
              >
                Trade {memeCoins[activeIndex].name}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { label: 'Total Trading Volume', value: '$10M+', icon: '📈', desc: 'In the last 24 hours' },
              { label: 'Active Traders', value: '25K+', icon: '👥', desc: 'Growing community' },
              { label: 'Average Returns', value: '32%', icon: '💰', desc: 'Weekly ROI' }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="group bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer hover:transform hover:scale-105"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">{stat.value}</div>
                <div className="text-lg text-blue-200 mb-2">{stat.label}</div>
                <div className="text-sm text-blue-300">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 