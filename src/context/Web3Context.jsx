import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import MemeTokenPrediction from '../contracts/MemeTokenPrediction.json';

const Web3Context = createContext();

const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';

export function Web3Provider({ children }) {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        MemeTokenPrediction.abi,
        provider.getSigner()
      );
      setContract(contract);
    }
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
    <Web3Context.Provider value={{ account, connectWallet, contract, placeBet }}>
      {children}
    </Web3Context.Provider>
  );
}

export const useWeb3 = () => useContext(Web3Context); 