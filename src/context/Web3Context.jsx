import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const Web3Context = createContext();

export function Web3Provider({ children }) {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Initialize wallet connection
  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        
        // Listen for account changes
        window.ethereum.on('accountsChanged', (accounts) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          } else {
            setAccount(null);
          }
        });

        // Listen for chain changes
        window.ethereum.on('chainChanged', () => {
          window.location.reload();
        });

        try {
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        } catch (error) {
          console.warn('No account connected');
        }
        
        setIsInitialized(true);
      }
    };

    init();

    // Cleanup listeners
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
      }
    };
  }, []);

  // Connect wallet function
  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      if (!window.ethereum) {
        alert('Please install MetaMask!');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      setAccount(accounts[0]);
      
      // Switch to Codex testnet
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x1E14' }], // 7700 in hex
        });
      } catch (switchError) {
        // If the chain hasn't been added to MetaMask
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x1E14',
                chainName: 'Codex Testnet',
                nativeCurrency: {
                  name: 'CODEX',
                  symbol: 'CODEX',
                  decimals: 18
                },
                rpcUrls: ['https://testnet.codex.storage'],
                blockExplorerUrls: ['https://testnet.codexscan.io']
              }]
            });
          } catch (addError) {
            console.error('Error adding chain:', addError);
          }
        }
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet function
  const disconnectWallet = async () => {
    try {
      setAccount(null);
      // Clear any local storage or state related to the wallet connection
      localStorage.removeItem('walletConnected');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  return (
    <Web3Context.Provider 
      value={{ 
        account, 
        connectWallet,
        disconnectWallet,
        provider,
        isInitialized,
        isConnecting
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export const useWeb3 = () => useContext(Web3Context); 