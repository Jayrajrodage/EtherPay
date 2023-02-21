import React, { useState, useContext, useEffect } from 'react'
import { AppState } from "../App";
import { ethers } from 'ethers';
import { Bars, TailSpin } from 'react-loader-spinner';
const Recipient = () => {
  const App = useContext(AppState);
  
  const [recipientAddress, setRecipientAddress] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState([])
  const [num, setNum] = useState(0)
  const [txLoading, settxLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      const recipients = await App.EtherPayContract.filters.recipeints(App.Address)
      const recipentsData = await App.EtherPayContract.queryFilter(recipients);
      setData(recipentsData)
    }
    
    getData();
  }, [num])

  const addRecipient = async () => {
    settxLoading(true);
    try {
      const tx = await App.EtherPayContract.addRecipient(recipientAddress, recipientName);
      await tx.wait();
      setMessage("Recipient Saved Sucessfully!")
      settxLoading(false)
      setRecipientAddress('');
      setRecipientName('');
    } catch (error) {
      setError("somthing went wrong")
      settxLoading(false)
    }

    let nextnum = num + 1;
    setNum(nextnum);
  }

  const setRecipient = (address, name) => {
    App.setRecipientAddress(address)
    setMessage("Selected the " + name + "'s address")
  }
  useEffect(() => {
    window.ethereum.on('accountsChanged', () => {
      let x=num+1
      setNum(x)
    }); 
  }, [num]);
  useEffect(() => {
    setTimeout(() => {
      setError(null);
      setMessage(null);
    }, 9000);
  }, [error,message]);
  return (
    <div className='flex flex-col items-center justify-center py-3 px-4 text-white'>
      <input onChange={(e) => setRecipientAddress(e.target.value)} value={recipientAddress} className="w-3/4 p-3 bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none rounded-lg" placeholder="Paste Recipient Address" />

      <input onChange={(e) => setRecipientName(e.target.value)} value={recipientName} className="mt-2 w-3/4 p-3 bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none rounded-lg" placeholder="Paste Recipient Name" />
      {txLoading ?
        <div className="flex mt-4 w-4/5 cursor-pointer justify-center items-center p-2 bg-gradient-to-r from-sky-500 to-blue-500 bg-opacity-70 border-2 border-blue-900 border-opacity-80 text-xl font-medium rounded-lg">
          <Bars
            width={30}
            height={46}
            color={'white'}
          />
        </div>
        :
        <div onClick={addRecipient} className="flex mt-4 w-3/4 cursor-pointer justify-center items-center p-2 bg-gradient-to-r from-sky-500 to-blue-500 bg-opacity-70 border-2 border-blue-900 border-opacity-80 text-xl font-medium rounded-lg">
          Add Recipient
        </div>
      }
      {error && <p className="text-red-600 text-lg mt-2 px-3">{error}</p>}
      {message && <p className="text-green-600 text-lg mt-2 px-1">{message}</p>}

      <div className='flex flex-col items-center justify-center mt-4 w-full'>

        {data.map((e) => {
          return (
            <div onClick={() => setRecipient(e.args.recipient, e.args.recipientName)} className={`bg-black cursor-pointer rounded-lg bg-opacity-60 border-2 border-blue-900 border-opacity-80 w-3/4 mt-2`}>
              <div className="flex w-full items-center justify-center rounded-t-lg">
                <div className="w-full py-2 px-2">
                  <p className="text-xl font-mono">Name: {e.args.recipientName}</p>
                  <p className="text-xs font-mono">address: {e.args.recipient}</p>
                </div>
              </div>
            </div>
          )
        })}

      </div>
      </div>
    
  )
}

export default Recipient