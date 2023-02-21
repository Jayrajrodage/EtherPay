import React,{useState,useContext,useEffect} from 'react'
import { AppState } from '../App'
import { ethers } from 'ethers';
import { Bars,TailSpin } from 'react-loader-spinner';
const Send = () => {
  const App = useContext(AppState);
  useEffect(() => {
    setTimeout(() => {
      App.setError(null);
      App.setMessage(null);
    }, 9000);
  }, [App.Error, App.Message]);
  return (
    <div className="flex flex-col justify-center items-center text-white">
      {/* Balance */}
      <div className="flex w-4/5 justify-around items-center mt-7">
        <div className="flex items-center border-2 border-blue-900 border-opacity-60 p-3 bg-black rounded-lg bg-opacity-70">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="ml-2 bi bi-wallet2"
            viewBox="0 0 16 16"
          >
            <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
          </svg>
          <h1 className="ml-2 text-lg font-medium">Balance :</h1>
          <h1 className="ml-2 text-lg font-medium">{App.balance.slice(0,5)} Eth</h1>
        </div>
      </div>
      {/* Transfer To */}
      <div className="flex w-4/5 justify-between items-center mt-5">
        <input onChange={(e) => App.setRecipientAddress(e.target.value)} value={App.recipientAddress} className="w-3/4 p-3 bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none rounded-lg" placeholder="Paste Recipient Address Carefully" />
        <input onChange={(e) => App.setAmount(e.target.value)} value={App.amount} type={"number"} className="w-1/4 ml-4 p-3 bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none rounded-lg" placeholder="Amount" />
      </div>
      {/* Transfer Button */}
      {App.txLoading ?
        <div className="flex mt-4 w-4/5 cursor-pointer justify-center items-center p-2 bg-gradient-to-r from-sky-500 to-blue-500 bg-opacity-70 border-2 border-blue-900 border-opacity-80 text-xl font-medium rounded-lg">
          <Bars
            width={30}
            height={46}
            color={'white'}
          />
        </div>
        : 
        <div onClick={App.transferAmount} className="flex mt-4 w-4/5 cursor-pointer justify-center items-center p-2 bg-gradient-to-r from-sky-500 to-blue-500  border-2 border-blue-900 border-opacity-80 text-xl font-medium rounded-lg">
          Transfer Funds
        </div>
      }
      {/* Error & Message */}
      {App.Error && <p className="text-red-600 text-lg mt-2 px-3">{App.Error}</p>}
      {App.Message && <p className="text-green-600 text-lg mt-2 px-1">{App.Message}</p>}
    </div>
  )
}

export default Send