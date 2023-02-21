import React, { useState, useContext, useEffect } from 'react'
import { AppState } from '../App'
import { Bars} from 'react-loader-spinner';
import {ethers } from 'ethers';
const Withdraw = () => {
    const App = useContext(AppState);
    const [balance, setbalance] = useState("0");
    const [Amount, setAmount] = useState('');
    const [num, setNum] = useState(0)
    const [txLoading, settxLoading] = useState(false);
    const [Error, setError] = useState('');
    const [Message, setMessage] = useState('');
    async function getBal() {
        const balance = await App.EtherPayContract.getUserLockedBalance(App.Address);
        setbalance(ethers.utils.formatEther(balance))
    }
    const transferAmount = async (event) => {
        event.preventDefault();
        settxLoading(true)
        try {
            const tx = await App.EtherPayContract.unlock({ value: ethers.utils.parseEther(Amount) });
            await tx.wait();
            setMessage('Funds locked successfully!');
            setAmount('0');
            getBal()
            setbalance(balance);
            settxLoading(false)
        } catch (error) {
            //setError(error.message);
            setError('An error occurred while Withdrawing funds');
            settxLoading(false)
        }
    };
    useEffect(() => {
        setTimeout(() => {
            setError(null);
            setMessage(null);
        }, 9000);
        async function fetchData() {
            getBal()
            setbalance(balance);
        }
        async function Acchange() {
            window.ethereum.on('accountsChanged', () => {
                let x = num + 1
                setNum(x)
                getBal()
            });
        }
        fetchData();
        Acchange()
    }, [Error, Message, num ,balance]);

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
                    <h1 className="ml-2 text-lg font-medium">Locked Funds :</h1>
                    <h1 className="ml-2 text-lg font-medium">{balance.slice(0, 5)} Eth</h1>
                </div>
            </div>
            {/* Transfer To */}
            <div className="flex w-4/5  justify-center items-center mt-5">
                <input onChange={(e) => setAmount(e.target.value)} value={Amount} type={"number"} className="w-102  p-5 bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none rounded-lg" placeholder="Amount" />
            </div>
            {/* Transfer Button */}
            {txLoading ?
                <div className="flex mt-4 w-1/2 cursor-pointer justify-center items-center p-2 bg-gradient-to-r from-sky-500 to-blue-500 bg-opacity-70 border-2 border-blue-900 border-opacity-80 text-xl font-medium rounded-lg">
                    <Bars
                        width={30}
                        height={46}
                        color={'white'}
                    />
                </div>
                :
                <div onClick={transferAmount} className="flex mt-4 w-1/2 cursor-pointer justify-center items-left p-2 bg-gradient-to-r from-sky-500 to-blue-500  border-2 border-blue-900 border-opacity-80 text-xl font-medium rounded-lg">
                    Withdraw Funds
                </div>
            }

            {/* Error & Message */}
            {Error && <p className="text-red-600 text-lg mt-2 px-3">{Error}</p>}
            {Message && <p className="text-green-600 text-lg mt-2 px-1">{Message}</p>}
        </div>
    )
}

export default Withdraw;