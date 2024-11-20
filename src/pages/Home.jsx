import { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';
import BettingModal from '../components/BettingModal';

function Home() {
  const { account, connectWallet } = useWeb3();
  const [selectedBasket, setSelectedBasket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prices, setPrices] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  const memeBaskets = [
    {
      id: 1,
      name: 'DOGE Basket',
      symbol: 'DOGE',
      description: 'Much wow, very profit',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      id: 2,
      name: 'SHIB Basket',
      symbol: 'SHIB',
      description: 'To the moon with Shiba',
      color: 'from-red-400 to-red-600'
    },
    {
      id: 3,
      name: 'PEPE Basket',
      symbol: 'PEPE',
      description: 'Rare Pepes only',
      color: 'from-green-400 to-green-600'
    },
    {
      id: 4,
      name: 'FLOKI Basket',
      symbol: 'FLOKI',
      description: 'Viking-approved gains',
      color: 'from-blue-400 to-blue-600'
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

  const handleBasketSelect = (basket) => {
    if (!account) {
      connectWallet();
      return;
    }
    setSelectedBasket(basket);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-blue-950 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Meme Coin Baskets
          </h1>
          <div className="flex justify-center items-center gap-4 text-xl">
            <span className="text-blue-200">Next round ends in:</span>
            <span className="bg-blue-900/50 px-4 py-2 rounded-lg font-mono">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {memeBaskets.map((basket) => (
            <div 
              key={basket.id}
              className="bg-blue-900/20 rounded-xl p-6 border border-blue-800/50 backdrop-blur-sm hover:border-blue-600 transition-all cursor-pointer"
              onClick={() => handleBasketSelect(basket)}
            >
              <div className={`text-4xl mb-4 bg-gradient-to-r ${basket.color} bg-clip-text text-transparent`}>
                {basket.symbol}
              </div>
              <h3 className="text-xl font-semibold mb-2">{basket.name}</h3>
              <p className="text-blue-200 mb-4">{basket.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-300">Current Price:</span>
                <span className="text-lg font-semibold">${prices[basket.symbol] || '0.00'}</span>
              </div>
              <button 
                className={`w-full mt-4 py-2 px-4 rounded-lg bg-gradient-to-r ${basket.color} text-white font-semibold hover:opacity-90 transition-opacity`}
              >
                Select Basket
              </button>
            </div>
          ))}
        </div>

        {!account && (
          <div className="text-center">
            <button
              onClick={connectWallet}
              className="btn bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 rounded-xl"
            >
              Connect Wallet to Start Betting
            </button>
          </div>
        )}

        <BettingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          basket={selectedBasket}
        />
      </div>
    </div>
  );
}

export default Home; 