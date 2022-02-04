import './App.css';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import { Hop, Chain } from '@hop-protocol/sdk';

// const hop = new Hop('mainnet');

function App() {
  const [value, setValue] = useState();
  const [address, setAccount] = useState();
  const [currency, setCurrency] = useState('MATIC');

  useEffect(() => {
    const getInitialConnection = async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      setAccount(account);
    }

    getInitialConnection();
  }, []);

  const handleBtnClick = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // const bridge = hop.connect(signer).bridge('USDC');

    // send 100 USDC tokens from Polygon -> xDai
    // const tx = await bridge.send('100000000', Chain.Polygon, Chain.xDai)
    // console.log(tx.hash)
    // contract = new ethers.Contract(contractAddress, Token.abi, signer);

    const valueHexString = new ethers.utils.parseEther(value).toHexString();
    const transactionParameters = {
      to: '0x1A3DAA6F487A480c1aD312b90FD0244871940b66', // Required except during contract publications.
      from: address, // must match user's active address.
      value: valueHexString, // Only required to send ether to the recipient from the initiating external account.
    };
    
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });
  }

  const handleInputChange = (e) => {
    setValue(e.target.value);
  }

  const handleSelectChange = (e) => {
    // console.log(e);
    setCurrency(e.target.value);
  }

  return (
    <div className="App">
      <input value={value} onChange={(e) => handleInputChange(e)}/>
      <select value={currency} onChange={(e) => {handleSelectChange(e)}}>
        <option>MATIC</option>
        <option>ETH</option>
        <option>DAI</option>
      </select>
      <button onClick={() => handleBtnClick()}>PAY</button>
    </div>
  );
}

export default App;