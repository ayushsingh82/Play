import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const Web3Context = createContext();

// This will be updated after contract deployment
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000";

export function Web3Provider({ children }) {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);

        try {
          // Dynamically import contract ABI
          const { abi } = await import('../contracts/MemeTokenPrediction.json');
          
          const contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            abi,
            provider.getSigner()
          );
          setContract(contract);
        } catch (error) {
          console.warn('Contract ABI not found, dApp in development mode');
        }
        
        setIsInitialized(true);
      }
    };

    init();
  }, []);

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const placeBet = async (bucketIndex, amount) => {
    if (!contract) {
      console.error('Contract not initialized');
      return false;
    }

    try {
      const tx = await contract.placeBet(bucketIndex, ethers.utils.parseEther(amount));
      await tx.wait();
      return true;
    } catch (error) {
      console.error('Error placing bet:', error);
      return false;
    }
  };

  return (
    <Web3Context.Provider 
      value={{ 
        account, 
        connectWallet, 
        contract, 
        placeBet,
        isInitialized 
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export const useWeb3 = () => useContext(Web3Context); 