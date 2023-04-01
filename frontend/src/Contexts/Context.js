import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { abi } from '../Utils/constants';
import { createContext, useContext } from 'react';

export function useConnect() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [account, setAccount] = useState(null);
  const provider = window.ethereum;

  const connectAccounts = async () => {
    if (window.ethereum) {
      try {
        const res = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        accountsChanged(res);
      } catch (err) {
        console.error(err.message);
        setErrorMessage('There was a problem connecting to MetaMask');
      }
      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x13881' }],
        });
      } catch (switchError) {
        // The network has not been added to MetaMask
        if (switchError.code === 4902) {
          console.log('Please add the Polygon network to MetaMask');
        }
        console.log('Cannot switch to the network');
      }
    } else {
      alert('Install MetaMask');
    }
  };

  const accountsChanged = (newAccount) => {
    // console.log(newAccount);
    if (newAccount.length) setAccount(newAccount[0]);
    else setAccount(null);
  };

  const chainChanged = () => {
    console.log('chain changed');
    setErrorMessage(null);
    setAccount(null);
  };
  const alreadyConnected = async () => {
    try {
      const res = await window.ethereum.request({
        method: 'eth_accounts',
      });
      accountsChanged(res);
    } catch (err) {
      console.error(err);
      setErrorMessage('There was a problem connecting to MetaMask');
    }
  };
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', accountsChanged);
      window.ethereum.on('chainChanged', chainChanged);
      alreadyConnected();
    }
  }, [account]);

  return { account, connectAccounts, errorMessage };
}


export function useContract() {
  const readOnlyProvider = ethers.getDefaultProvider(process.env.REACT_APP_RPC_URL);
  const { account } = useConnect();
  let provider;
  let signer;
  if (account) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
  }
  let contract = new ethers.Contract(
    process.env.REACT_APP_CONTRACT_ADDRESS,
    abi,
    account ? provider : readOnlyProvider
  );

  if (account) {
    contract = contract.connect(signer);
  }
  const createCampaign = async (form) => {
    if (!account) {
      alert('Please Connect Metamask');
      return;
    }
    try {

    } catch (err) {
      return err;
    }
  };

  const createArt = async () => {
  };

  const getOwnedArts = async (address) => {
  };

  const donate = async (id, _value) => {
  };

  const getCampaignDetails = async (id) => {
  };

  return {
    contract,
    createCampaign,
    createArt,
    getOwnedArts,
    donate,
    getCampaignDetails,
  };
}


const state = {
  account: '',
  connectAccounts: async () => {},
  createCampaign: async () => {},
  getCampaigns: async () => {},
  getUserCampaigns: async () => {},
  donate: async () => {},
  getCampaignDetails: async () => {},
};

export const StateContext = createContext(state);

export const StateContextProvider = ({ children }) => {
  const { account, connectAccounts } = useConnect();
  const {
    contract,
    createArt,
    getOwnedArts
  } = useContract();
  return (
    <StateContext.Provider
      value={{
        account,
        connectAccounts,
        contract,
        createArt,
        getOwnedArts
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);