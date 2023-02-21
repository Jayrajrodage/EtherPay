import React , {useState} from 'react'
import Send from "./Send"
import Lock from './Lock'
import RecentTx from './RecentTx'
import Recipient from "./Recipient"
import Withdraw from './Winthdraw'
const Main = () => {
  const [route, setRoute] = useState('send');
  return (
    <div className='w-full mt-12 flex flex-col justify-center items-center'>
      <div className='flex justify-around text-log font-medium items-center bg-gray-900 border-2 border-b-0 text-white border-opacity-50 border-blue-800 rounded-t-lg w-1/2'>
        {/* send */}
        <li onClick={() => setRoute('send')} className={`list-none cursor-pointer py-2 w-1/4 ${route == 'send' ? "bg-black bg-opacity-60 font-bold"  : "bg-gray-900"} text-center rounded-tl-lg hover:bg-black hover:bg-opacity-60`}>
          Send ETH
        </li>
        {/* Recipients */}
        <li onClick={() => setRoute('recipients')} className={`list-none cursor-pointer py-2 w-1/4 ${route == 'recipients' ? "bg-black bg-opacity-60 font-bold" : "bg-gray-900"} text-center rounded-tl-lg hover:bg-black hover:bg-opacity-60`}>
          Recipients
        </li>
        {/* Recent Tx */}
        <li onClick={() => setRoute('recent_tx')} className={`list-none cursor-pointer py-2 w-1/4 ${route == 'recent_tx' ? "bg-black bg-opacity-60 font-bold" : "bg-gray-900"} text-center rounded-tl-lg hover:bg-black hover:bg-opacity-60`}>
          Recent Transactions 
        </li>
        {/* lock funds */}
        <li onClick={() => setRoute('lock')} className={`list-none cursor-pointer py-2 w-1/4 ${route == 'lock' ? "bg-black bg-opacity-60 font-bold" : "bg-gray-900"} text-center rounded-tl-lg hover:bg-black hover:bg-opacity-60`}>
          Lock Funds
        </li>
        {/* Withdraw funds */}
        <li onClick={() => setRoute('withdraw')} className={`list-none cursor-pointer py-2 w-1/4 ${route == 'withdraw' ? "bg-black bg-opacity-60 font-bold" : "bg-gray-900"} text-center rounded-tl-lg hover:bg-black hover:bg-opacity-60`}>
          withdraw Funds
        </li>
      </div>
      {/* Screen */}
      <div className='bg-black bg-opacity-60 pb-5 overflow-y-auto border-2 border-t-0 shadow-lg border-opacity-50 border-blue-800 rounded-b-lg w-1/2'>
        {(() => {
          if (route == 'send') {
            return <Send />
          } else if (route == 'recipients') {
            return <Recipient />
          } else if (route == 'recent_tx') {
            return <RecentTx />
          } else if (route == "lock") {
            return <Lock/>
          } else if (route == "withdraw") {
            return <Withdraw />
          }

        })()}
      </div>

    </div>
  )
}

export default Main