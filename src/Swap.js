// src/components/Swap.js
import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, Typography } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import ForexCurvePoolABI from '../abis/ForexCurvePool.json';

function Swap() {
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [amount, setAmount] = useState('');
  const { account, library } = useWeb3React();

  const tokens = ['TokenA', 'TokenB']; // Replace with your token symbols
  const tokenAddresses = {
    TokenA: 'TOKEN_A_ADDRESS',
    TokenB: 'TOKEN_B_ADDRESS',
    // Add more tokens
  };

  const getTokenIndex = (token) => tokens.indexOf(token);

  const handleSwap = async () => {
    if (!account) {
      alert('Please connect your wallet.');
      return;
    }
    if (fromToken === toToken) {
      alert('Cannot swap the same token.');
      return;
    }
    const contractAddress = 'FOREX_CURVE_POOL_ADDRESS';
    const contract = new ethers.Contract(contractAddress, ForexCurvePoolABI, library.getSigner());

    const sellTokenIndex = getTokenIndex(fromToken);
    const buyTokenIndex = getTokenIndex(toToken);
    const dx = ethers.utils.parseUnits(amount, 18); // Adjust decimals as needed
    const minDy = 0; // Implement slippage protection

    try {
      const tx = await contract.exchange(
        sellTokenIndex,
        buyTokenIndex,
        dx,
        minDy,
        account // Recipient address
      );
      await tx.wait();
      alert('Swap successful!');
    } catch (error) {
      console.error(error);
      alert('Swap failed.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4">Swap Tokens</Typography>
      <div>
        <Select value={fromToken} onChange={(e) => setFromToken(e.target.value)} displayEmpty>
          <MenuItem value="" disabled>
            Select From Token
          </MenuItem>
          {tokens.map((token) => (
            <MenuItem key={token} value={token}>
              {token}
            </MenuItem>
          ))}
        </Select>
        <Select value={toToken} onChange={(e) => setToToken(e.target.value)} displayEmpty>
          <MenuItem value="" disabled>
            Select To Token
          </MenuItem>
          {tokens.map((token) => (
            <MenuItem key={token} value={token}>
              {token}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
        />
        <Button variant="contained" color="primary" onClick={handleSwap}>
          Swap
        </Button>
      </div>
    </div>
  );
}

export default Swap;
