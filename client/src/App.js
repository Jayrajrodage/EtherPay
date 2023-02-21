import { useState, createContext, useEffect } from 'react';
import Header from './component/Header'
import Main from './component/Main'
import Login from "./component/Login"
import { ethers } from 'ethers';
import EtherPay from "./EtherPay/EtherPay.json"
const AppState = createContext();
function App() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const { ethereum } = window;
  const EtherPayContractAddress = "0x534702e8Acf85B67d3D0B59a80CF92498Fe0a1Ff"
  const EtherPayContract = new ethers.Contract(EtherPayContractAddress, EtherPay.output.abi, signer);
  const [login, setLogin] = useState(false);
  const [Address, setAddress] = useState("");
  const [chain, setChain] = useState('');
  const [balance, setbalance] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [Error, setError] = useState('');
  const [Message, setMessage] = useState('');
  const [txLoading, setTxLoading] = useState(false);
  async function getBal() {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner();
    const balance = await signer.getBalance();
    setbalance(ethers.utils.formatEther(balance))
  }
  useEffect(() => {
    async function getBal() {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner();
      const balance = await signer.getBalance();
      setbalance(ethers.utils.formatEther(balance))
    }
    getBal()
  },[])
  useEffect(() => {
    ethereum.on("chainChanged", async (chainId) => {
      if (chainId == "0x5") {  
        setLogin(true)
        
      } else {
        setLogin(false);
      }
    })

    ethereum.on("accountsChanged", async (accounts) => {
      setAddress(accounts[0])
      getBal()
    })
  },[])
  const transferAmount = async () => {
    setTxLoading(true);
    const symbol = "Eth"
    try {
      const tx = await EtherPayContract._transfer(recipientAddress, symbol, {
          value: ethers.utils.parseEther(amount)
        });
        await tx.wait();
        getBal();
      setMessage("Transaction Sucessfull !")
      setAmount('');
      setRecipientAddress('')
    } catch (error) {
      setError(error.message)
    }
    setTxLoading(false)
  }
  
 
  return (
    <AppState.Provider value={{
      login, setLogin, Address, setAddress, chain, setChain, balance,
      setbalance, recipientAddress, setRecipientAddress, amount, setAmount,
      Error, setError, Message, setMessage, transferAmount, txLoading,
      setTxLoading, EtherPayContract
    }}>
      <div className="min-w-full h-screen">
        {login ?
          <div className="min-w-full min-h-full">
            {/* Main Application */}
            <Header />
            <Main/>
          </div>
          :
          <Login />
        }
      </div>
    </AppState.Provider>
  );
}

export default App;
export { AppState }
