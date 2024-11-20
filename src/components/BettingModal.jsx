import { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';

function BettingModal({ isOpen, onClose, market, selectedOption }) {
  const [amount, setAmount] = useState('');
  const { account, connectWallet, placeBet } = useWeb3();
  const [isLoading, setIsLoading] = useState(false);

  const handleBet = async () => {
    if (!account) {
      await connectWallet();
      return;
    }

    setIsLoading(true);
    try {
      const success = await placeBet(selectedOption.id, amount);
      if (success) {
        onClose();
      }
    } catch (error) {
      console.error('Error placing bet:', error);
    }
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Place Your Bet</h3>
        
        {!account ? (
          <button
            onClick={connectWallet}
            className="w-full btn btn-primary mb-4"
          >
            Connect Wallet
          </button>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-gray-600">Selected Token:</p>
              <p className="font-semibold">{selectedOption?.text}</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bet Amount (Tokens)
              </label>
              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter amount"
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={onClose}
                className="flex-1 btn bg-gray-100 hover:bg-gray-200"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                onClick={handleBet}
                className="flex-1 btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Confirming...' : 'Confirm Bet'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BettingModal; 