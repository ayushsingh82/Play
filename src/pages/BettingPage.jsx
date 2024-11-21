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
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      id: 2,
      name: 'SHIB Basket',
      symbol: 'SHIB',
      coingeckoId: 'shiba-inu',
      image: 'https://assets.coingecko.com/coins/images/11939/large/shiba.png',
      description: 'To the moon with Shiba',
      color: 'from-red-400 to-red-600'
    },
    {
      id: 3,
      name: 'PEPE Basket',
      symbol: 'PEPE',
      coingeckoId: 'pepe',
      image: 'https://assets.coingecko.com/coins/images/29850/large/pepe-token.jpeg',
      description: 'Rare Pepes only',
      color: 'from-green-400 to-green-600'
    },
    {
      id: 4,
      name: 'FLOKI Basket',
      symbol: 'FLOKI',
      coingeckoId: 'floki',
      image: 'https://assets.coingecko.com/coins/images/16746/large/PNG_image.png',
      description: 'Viking-approved gains',
      color: 'from-blue-400 to-blue-600'
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

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 300));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Predict & Win
          </h1>
          <div className="flex justify-center items-center gap-4">
            <div className="bg-blue-900/50 px-6 py-3 rounded-xl backdrop-blur-sm border border-blue-800/50">
              <div className="text-sm text-blue-300 mb-1">Next Round Ends In</div>
              <div className="text-2xl font-mono font-bold text-blue-100">
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
        </div>

        {/* Baskets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {memeBaskets.map((basket) => {
            const price = priceData[basket.coingeckoId]?.usd || 0;
            const change24h = priceData[basket.coingeckoId]?.usd_24h_change || 0;
            
            return (
              <div
                key={basket.id}
                className="group bg-blue-900/20 rounded-xl p-6 border border-blue-800/50 backdrop-blur-sm hover:border-blue-600 transition-all"
              >
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
                
                <div className="w-24 h-24 mx-auto mb-6">
                  <img 
                    src={basket.image}
                    alt={basket.name}
                    className="w-full h-full object-contain rounded-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://via.placeholder.com/150?text=${basket.symbol}`;
                    }}
                  />
                </div>

                {/* Price Chart */}
                <div className="relative w-full h-[100px] mb-6">
                  {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                  ) : (
                    <div 
                      ref={chartRefs[basket.id]}
                      className="w-full h-full"
                    />
                  )}
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
                    className="w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all"
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {[
            { label: 'Total Bets', value: '1,234' },
            { label: 'Total Volume', value: '$45,678' },
            { label: 'Active Users', value: '567' },
            { label: 'Average Win Rate', value: '32%' }
          ].map((stat) => (
            <div key={stat.label} className="bg-blue-900/20 rounded-xl p-6 border border-blue-800/50 backdrop-blur-sm">
              <div className="text-sm text-blue-300 mb-1">{stat.label}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
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