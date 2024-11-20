import { Link } from 'react-router-dom'
import { useWeb3 } from '../context/Web3Context'

function Navbar() {
  const { account, connectWallet } = useWeb3();

  return (
    <nav className="bg-blue-950 border-b border-blue-800/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/app" className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            MemeBaskets
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link 
              to="/app" 
              className="text-blue-200 hover:text-white transition-colors"
            >
              Baskets
            </Link>
            <Link 
              to="/app/history" 
              className="text-blue-200 hover:text-white transition-colors"
            >
              History
            </Link>
            {account ? (
              <div className="flex items-center bg-blue-900/50 px-4 py-2 rounded-lg border border-blue-700">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span className="text-blue-200">
                  {account.slice(0, 6)}...{account.slice(-4)}
                </span>
              </div>
            ) : (
              <button 
                onClick={connectWallet} 
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg transition-all"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar; 