import React, { useState, useEffect, useRef } from 'react';
import { useWeb3 } from '../context/Web3Context';
import BettingModal from '../components/BettingModal';
import axios from 'axios';
import { createChart, ColorType } from 'lightweight-charts';

function BettingPage() {
  const { account, connectWallet } = useWeb3();
  const [selectedBasket, setSelectedBasket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [priceData, setPriceData] = useState({});
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const chartRefs = {
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
    4: useRef(null)
  };

  const memeBaskets = [
    {
      id: 1,
      name: 'DOGE Basket',
      symbol: 'DOGE',
      coingeckoId: 'dogecoin',
      image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
      description: 'Much wow, very profit',
      color: 'from-yellow-400 to-orange-400',
      delay: '0'
    },
    {
      id: 2,
      name: 'SHIB Basket',
      symbol: 'SHIB',
      coingeckoId: 'shiba-inu',
      image: 'https://assets.coingecko.com/coins/images/11939/large/shiba.png',
      description: 'To the moon with Shiba',
      color: 'from-red-400 to-pink-400',
      delay: '100'
    },
    {
      id: 3,
      name: 'PEPE Basket',
      symbol: 'PEPE',
      coingeckoId: 'pepe',
      image: 'https://assets.coingecko.com/coins/images/29850/large/pepe-token.jpeg',
      description: 'Rare Pepes only',
      color: 'from-green-400 to-emerald-400',
      delay: '200'
    },
    {
      id: 4,
      name: 'FLOKI Basket',
      symbol: 'FLOKI',
      coingeckoId: 'floki',
      image: 'https://assets.coingecko.com/coins/images/16746/large/PNG_image.png',
      description: 'Viking-approved gains',
      color: 'from-blue-400 to-indigo-400',
      delay: '300'
    }
  ];

  // Fetch real-time price data
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const ids = memeBaskets.map(basket => basket.coingeckoId).join(',');
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_last_updated_at=true`,
          {
            headers: {
              'Accept': 'application/json',
              // Add your CoinGecko API key if you have one
              // 'X-CG-Pro-API-Key': 'YOUR_API_KEY'
            }
          }
        );
        setPriceData(response.data);
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  // Fetch and create charts
  useEffect(() => {
    const fetchChartData = async (coinId) => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1&interval=hourly`,
          {
            headers: {
              'Accept': 'application/json',
              // 'X-CG-Pro-API-Key': 'YOUR_API_KEY'
            }
          }
        );
        return response.data.prices.map(([timestamp, price]) => ({
          time: timestamp / 1000,
          value: price
        }));
      } catch (error) {
        console.error(`Error fetching chart data for ${coinId}:`, error);
        return null;
      }
    };

    const createCharts = async () => {
      setLoading(true);
      try {
        const chartDataPromises = memeBaskets.map(basket => 
          fetchChartData(basket.coingeckoId)
        );
        const results = await Promise.all(chartDataPromises);
        
        const newChartData = {};
        results.forEach((data, index) => {
          if (data) {
            newChartData[memeBaskets[index].id] = data;
          }
        });
        setChartData(newChartData);
      } catch (error) {
        console.error('Error creating charts:', error);
      } finally {
        setLoading(false);
      }
    };

    createCharts();
  }, []);

  // Create and update charts when data changes
  useEffect(() => {
    Object.entries(chartData).forEach(([basketId, data]) => {
      const ref = chartRefs[basketId];
      if (ref.current && data) {
        ref.current.innerHTML = '';
        
        const chart = createChart(ref.current, {
          width: ref.current.clientWidth,
          height: 100,
          layout: {
            background: { type: ColorType.Solid, color: 'transparent' },
            textColor: '#8b9cc8',
          },
          grid: {
            vertLines: { visible: false },
            horzLines: { visible: false },
          },
          rightPriceScale: { visible: false },
          timeScale: { visible: false },
          handleScroll: false,
          handleScale: false,
        });

        const lineSeries = chart.addLineSeries({
          color: '#4f46e5',
          lineWidth: 2,
          crosshairMarkerVisible: false,
        });
        lineSeries.setData(data);

        // Handle resize
        const handleResize = () => {
          chart.applyOptions({ width: ref.current.clientWidth });
        };
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
          chart.remove();
        };
      }
    });
  }, [chartData]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 
            className={`text-4xl font-bold mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Predict & Win
            </span>
          </h1>
          <div 
            className={`flex justify-center items-center gap-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-white/5 px-6 py-3 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="text-sm text-blue-300 mb-1">Round Status</div>
              <div className="text-2xl font-mono font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Not Started
              </div>
            </div>
          </div>
        </div>

        {/* Baskets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {memeBaskets.map((basket) => {
            const price = priceData[basket.coingeckoId]?.usd || 0;
            const change24h = priceData[basket.coingeckoId]?.usd_24h_change || 0;
            
            return (
              <div
                key={basket.id}
                className={`group relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${basket.delay}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`text-3xl font-bold bg-gradient-to-r ${basket.color} bg-clip-text text-transparent`}>
                      {basket.symbol}
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-white">
                        ${price.toFixed(price < 0.01 ? 8 : 4)}
                      </div>
                      <div className={`text-sm ${change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {change24h.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-24 h-24 mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-r ${basket.color} rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                      <img 
                        src={basket.image}
                        alt={basket.name}
                        className="relative w-full h-full object-contain rounded-full"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://via.placeholder.com/150?text=${basket.symbol}`;
                        }}
                      />
                    </div>
                  </div>

                  {/* Price Chart */}
                  <div className="relative w-full h-[120px] mb-6 bg-white/5 rounded-lg overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shine"></div>
                    <div className="h-full flex items-center justify-between px-6">
                      {/* Left Section - Price Change */}
                      <div className="space-y-2">
                        <div className="text-sm text-blue-200">24h Trend</div>
                        <div className={`text-2xl font-bold flex items-center gap-2 ${change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {change24h >= 0 ? (
                            <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
                            </svg>
                          )}
                         
                        </div>
                      </div>

                      {/* Center Section - Visual Bars */}
                      <div className="flex items-end space-x-1 h-16">
                        {[...Array(8)].map((_, i) => {
                          const randomHeight = 20 + Math.random() * 40;
                          const isPositive = change24h >= 0;
                          return (
                            <div
                              key={i}
                              className={`w-2 rounded-t-full transition-all duration-500 ${
                                isPositive 
                                  ? 'bg-emerald-400/40 group-hover:bg-emerald-400' 
                                  : 'bg-red-400/40 group-hover:bg-red-400'
                              }`}
                              style={{
                                height: `${randomHeight}px`,
                                transitionDelay: `${i * 50}ms`,
                                animation: 'pulse 2s infinite'
                              }}
                            />
                          );
                        })}
                      </div>

                      {/* Right Section - Market Stats */}
                      <div className="space-y-2 text-right">
                        <div className="text-sm text-blue-200">Win Rate</div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                          {(Math.random() * 20 + 60).toFixed(1)}%
                        </div>
                      </div>
                    </div>

                    {/* Bottom Progress Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          change24h >= 0 ? 'bg-emerald-400' : 'bg-red-400'
                        }`}
                        style={{ 
                          width: `${Math.min(Math.abs(change24h) * 2, 100)}%`,
                          marginLeft: change24h >= 0 ? '0' : 'auto',
                          marginRight: change24h >= 0 ? 'auto' : '0'
                        }}
                      />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <p className="text-blue-200 mb-6">{basket.description}</p>

                  {account ? (
                    <button
                      onClick={() => {
                        setSelectedBasket(basket);
                        setIsModalOpen(true);
                      }}
                      className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r ${basket.color} text-white font-semibold hover:opacity-90 transition-all`}
                    >
                      Place Bet
                    </button>
                  ) : (
                    <button
                      onClick={connectWallet}
                      className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold transition-all"
                    >
                      Connect Wallet
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div 
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {[
            { label: 'Total Bets', value: '1,234' },
            { label: 'Total Volume', value: '$45,678' },
            { label: 'Active Users', value: '567' },
            { label: 'Average Win Rate', value: '32%' }
          ].map((stat, index) => (
            <div 
              key={stat.label} 
              className="bg-white/5 rounded-xl p-6 border border-white/10 backdrop-blur-sm"
              style={{ transitionDelay: `${600 + index * 100}ms` }}
            >
              <div className="text-sm text-blue-300 mb-1">{stat.label}</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        <BettingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          basket={selectedBasket}
        />
      </div>
    </div>
  );
}

export default BettingPage; 