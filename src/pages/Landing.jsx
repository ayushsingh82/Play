import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

function Landing() {
  const [isVisible, setIsVisible] = useState(false);
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true });
  const { ref: tradingRef, inView: tradingInView } = useInView({ triggerOnce: true });
  const { ref: communityRef, inView: communityInView } = useInView({ triggerOnce: true });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const memeCoins = [
    {
      name: 'DOGE',
      image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
      delay: '0',
      color: 'from-yellow-400 to-orange-400'
    },
    {
      name: 'SHIB',
      image: 'https://assets.coingecko.com/coins/images/11939/large/shiba.png',
      delay: '100',
      color: 'from-red-400 to-pink-400'
    },
    {
      name: 'PEPE',
      image: 'https://assets.coingecko.com/coins/images/29850/large/pepe-token.jpeg',
      delay: '200',
      color: 'from-green-400 to-emerald-400'
    },
    {
      name: 'FLOKI',
      image: 'https://assets.coingecko.com/coins/images/16746/large/PNG_image.png',
      delay: '300',
      color: 'from-blue-400 to-indigo-400'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-md bg-[#0A0F1E]/80">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 group-hover:scale-110 transition-transform duration-300 animate-pulse"></div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                MemeBaskets
              </span>
            </div>
            <Link 
              to="/app" 
              className="relative px-6 py-2.5 group overflow-hidden rounded-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-colors"></div>
              <div className="absolute inset-0 border border-white/20 rounded-xl group-hover:scale-105 transition-transform duration-300"></div>
              <span className="relative z-10 flex items-center font-medium">
                Launch App 
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            {/* Floating Coins */}
            <div className="relative h-48 mb-12">
              <div className="absolute left-1/2 transform -translate-x-1/2">
                {memeCoins.map((coin, index) => (
                  <div
                    key={coin.name}
                    className="absolute"
                    style={{
                      transform: `rotate(${index * 90}deg) translateX(80px)`,
                      opacity: isVisible ? 1 : 0,
                      transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${coin.delay}ms`
                    }}
                  >
                    <div className="relative group">
                      <div className={`absolute inset-0 bg-gradient-to-r ${coin.color} rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                      <img 
                        src={coin.image}
                        alt={coin.name}
                        className="relative w-20 h-20 rounded-full animate-float shadow-lg hover:scale-110 transition-transform duration-300"
                        style={{ animationDelay: `${coin.delay}ms` }}
                      />
                    </div>
                  </div>
                ))}
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-2xl animate-pulse"></div>
              </div>
            </div>

            {/* Hero Text */}
            <h1 
              className={`text-7xl font-bold mb-8 leading-tight transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                The Future of
              </span>
              <br />
              <span className="relative">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                  Meme Coin Trading
                </span>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-sm"></div>
              </span>
            </h1>

            <p 
              className={`text-2xl text-blue-200 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Join thousands of traders in predicting meme coin trends. Make predictions, earn rewards, and become a crypto oracle! 🚀
            </p>

            <div 
              className={`transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <Link 
                to="/app" 
                className="group relative overflow-hidden px-12 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-lg font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 inline-flex items-center"
              >
                <span className="relative z-10">Launch App</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="absolute inset-0 -translate-y-full group-hover:translate-y-0 bg-gradient-to-r from-blue-600 to-cyan-600 transition-transform duration-300"></div>
              </Link>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-32">
              {[
                {
                  icon: "⚡️",
                  title: "5-Minute Rounds",
                  description: "Quick prediction rounds for fast-paced action"
                },
                {
                  icon: "🎯",
                  title: "Easy Predictions",
                  description: "Simple interface to place your bets"
                },
                {
                  icon: "💰",
                  title: "Instant Rewards",
                  description: "Automatically receive rewards when you win"
                }
              ].map((feature, index) => (
                <div 
                  key={feature.title}
                  className={`group p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm transform hover:-translate-y-1 ${
                    isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
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

      {/* Trading Stats Section */}
      <div 
        ref={statsRef}
        className={`py-20 transition-all duration-1000 ${
          statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { value: '$10M+', label: 'Trading Volume' },
              { value: '50K+', label: 'Active Traders' },
              { value: '1M+', label: 'Predictions Made' },
              { value: '$500K+', label: 'Rewards Distributed' }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How Trading Works */}
      <div 
        ref={tradingRef}
        className={`py-20 bg-gradient-to-b from-transparent to-blue-900/20 transition-all duration-1000 ${
          tradingInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            How MemeBaskets Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Choose Your Basket',
                description: 'Select from our curated collection of trending meme coins',
                icon: '🎯'
              },
              {
                step: '02',
                title: 'Place Your Prediction',
                description: 'Bet on which basket will perform best in the next 5 minutes',
                icon: '⚡'
              },
              {
                step: '03',
                title: 'Win Rewards',
                description: 'Earn rewards when your prediction is correct',
                icon: '💰'
              }
            ].map((item, index) => (
              <div 
                key={item.step}
                className="relative p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-all duration-300"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
                <div className="text-6xl font-bold text-white/10 absolute bottom-4 right-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-blue-200">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div 
        ref={communityRef}
        className={`py-20 transition-all duration-1000 ${
          communityInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Join Our Growing Community
          </h2>
          <p className="text-xl text-blue-200 mb-12 max-w-2xl mx-auto">
            Be part of the future of meme coin trading. Connect with traders, share strategies, and earn rewards together.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: 'Discord Members', value: '25K+' },
              { label: 'Twitter Followers', value: '50K+' },
              { label: 'Daily Active Users', value: '5K+' },
              { label: 'Countries', value: '120+' }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl p-12 text-center border border-white/10 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Trading?</h2>
            <p className="text-xl text-blue-200 mb-8">
              Join thousands of traders and start predicting meme coin trends today!
            </p>
            <Link 
              to="/app" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-lg font-medium hover:scale-105 transition-all duration-300"
            >
              Launch App
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
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