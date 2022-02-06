import './App.css';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import { Hop, Chain, CanonicalToken } from '@hop-protocol/sdk';

function App() {
  const [value, setValue] = useState("");
  const [address, setAddress] = useState();
  const [currency, setCurrency] = useState('MATIC');

  useEffect(() => {
    const getInitialConnection = async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      setAddress(account);
    }

    getInitialConnection();
  }, []);

  const handleBtnClick = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const hop = new Hop('mainnet', signer);
    const bridge = hop.connect(signer).bridge(CanonicalToken.MATIC);

    // const valueWei = ethers.utils.parseEther(value);
    const tx = await bridge.send((10**19).toString(), Chain.Polygon, Chain.Gnosis);
    console.log(tx.hash)

    // const transactionParameters = {
    //   to: '0x1A3DAA6F487A480c1aD312b90FD0244871940b66', // Required except during contract publications.
    //   from: address, // must match user's active address.
    //   value: valueHexString, // Only required to send ether to the recipient from the initiating external account.
    // };
    
    // const txHash = await window.ethereum.request({
    //   method: 'eth_sendTransaction',
    //   params: [transactionParameters],
    // });
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