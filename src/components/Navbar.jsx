import { Link } from 'react-router-dom'
import { useWeb3 } from '../context/Web3Context'
import { useState, useRef, useEffect } from 'react';

function Navbar() {
  const { account, connectWallet, disconnectWallet, isConnecting } = useWeb3();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="border-b border-blue-800/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/app" className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              MemeBaskets
            </Link>
            <div className="flex items-center space-x-6">
              <Link 
                to="/app"
                className="text-blue-200 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                to="/app/markets"
                className="text-blue-200 hover:text-white transition-colors"
              >
                Markets
              </Link>
            </div>
          </div>
          
          <div className="relative" ref={dropdownRef}>
            {account ? (
              <>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 bg-blue-900/50 px-4 py-2 rounded-lg border border-blue-700 hover:bg-blue-800/50 transition-colors"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-blue-200">
                    {account.slice(0, 6)}...{account.slice(-4)}
                  </span>
                  <svg 
                    className={`w-4 h-4 text-blue-200 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-blue-900/95 rounded-lg shadow-lg border border-blue-700 backdrop-blur-sm">
                    <div className="py-2">
                      <a 
                        href={`https://testnet.codexscan.io/address/${account}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-blue-200 hover:bg-blue-800/50 transition-colors"
                      >
                        View on Explorer
                      </a>
                      <button
                        onClick={() => {
                          disconnectWallet();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-red-400 hover:bg-blue-800/50 transition-colors"
                      >
                        Disconnect Wallet
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <button 
                onClick={connectWallet}
                disabled={isConnecting}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg transition-all disabled:opacity-50"
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar; 