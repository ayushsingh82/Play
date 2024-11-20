import { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';
import BettingModal from '../components/BettingModal';

function BettingPage() {
  const { account, connectWallet } = useWeb3();
  const [selectedBasket, setSelectedBasket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  const memeBaskets = [
    {
      id: 1,
      name: 'DOGE Basket',
      symbol: 'DOGE',
      description: 'Much wow, very profit',
      color: 'from-yellow-400 to-yellow-600',
      price: '$0.12',
      change: '+5.2%'
    },
    {
      id: 2,
      name: 'SHIB Basket',
      symbol: 'SHIB',
      description: 'To the moon with Shiba',
      color: 'from-red-400 to-red-600',
      price: '$0.00003',
      change: '+3.8%'
    },
    {
      id: 3,
      name: 'PEPE Basket',
      symbol: 'PEPE',
      description: 'Rare Pepes only',
      color: 'from-green-400 to-green-600',
      price: '$0.0000012',
      change: '+8.1%'
    },
    {
      id: 4,
      name: 'FLOKI Basket',
      symbol: 'FLOKI',
      description: 'Viking-approved gains',
      color: 'from-blue-400 to-blue-600',
      price: '$0.0003',
      change: '+6.5%'
    }
  ];

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
          {memeBaskets.map((basket) => (
            <div
              key={basket.id}
              className="group bg-blue-900/20 rounded-xl p-6 border border-blue-800/50 backdrop-blur-sm hover:border-blue-600 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`text-3xl font-bold bg-gradient-to-r ${basket.color} bg-clip-text text-transparent`}>
                  {basket.symbol}
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-white">{basket.price}</div>
                  <div className="text-sm text-emerald-400">{basket.change}</div>
                </div>
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
          ))}
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