// src/components/Liquidity.js
import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import ForexCurvePoolABI from '../abis/ForexCurvePool.json';

function Liquidity() {
  const [amounts, setAmounts] = useState({ TokenA: '', TokenB: '' });
  const [lpTokenAmount, setLpTokenAmount] = useState('');
  const { account, library } = useWeb3React();

  const tokens = ['TokenA', 'TokenB']; // Replace with your tokens

  const handleInputChange = (token, value) => {
    setAmounts({ ...amounts, [token]: value });
  };

  const handleAddLiquidity = async () => {
    if (!account) {
      alert('Please connect your wallet.');
      return;
    }
    const contractAddress = 'FOREX_CURVE_POOL_ADDRESS';
    const contract = new ethers.Contract(contractAddress, ForexCurvePoolABI, library.getSigner());

    const amountsArray = tokens.map((token) =>
      ethers.utils.parseUnits(amounts[token] || '0', 18) // Adjust decimals
    );
    const minMintAmount = 0; // Implement slippage protection

    try {
      // Approve tokens if necessary
      for (let token of tokens) {
        const tokenAddress = 'TOKEN_ADDRESS'; // Replace with actual address
        const tokenContract = new ethers.Contract(
          tokenAddress,
          ['function approve(address spender, uint256 amount) public returns (bool)'],
          library.getSigner()
        );
        const amount = ethers.utils.parseUnits(amounts[token] || '0', 18);
        await tokenContract.approve(contractAddress, amount);
      }

      const tx = await contract.addLiquidity(amountsArray, minMintAmount);
      await tx.wait();
      alert('Liquidity added!');
    } catch (error) {
      console.error(error);
      alert('Failed to add liquidity.');
    }
  };

  const handleRemoveLiquidity = async () => {
    if (!account) {
      alert('Please connect your wallet.');
      return;
    }
    const contractAddress = 'FOREX_CURVE_POOL_ADDRESS';
    const contract = new ethers.Contract(contractAddress, ForexCurvePoolABI, library.getSigner());

    const lpAmount = ethers.utils.parseUnits(lpTokenAmount, 18);
    const minAmounts = tokens.map(() => '0'); // Implement slippage protection

    try {
      const tx = await contract.removeLiquidity(lpAmount, minAmounts);
      await tx.wait();
      alert('Liquidity removed!');
    } catch (error) {
      console.error(error);
      alert('Failed to remove liquidity.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4">Add/Remove Liquidity</Typography>
      <div>
        {tokens.map((token) => (
          <TextField
            key={token}
            label={`${token} Amount`}
            value={amounts[token]}
            onChange={(e) => handleInputChange(token, e.target.value)}
            type="number"
          />
        ))}
        <Button variant="contained" color="primary" onClick={handleAddLiquidity}>
          Add Liquidity
        </Button>
      </div>
      <div>
        <TextField
          label="LP Token Amount"
          value={lpTokenAmount}
          onChange={(e) => setLpTokenAmount(e.target.value)}
          type="number"
        />
        <Button variant="contained" color="secondary" onClick={handleRemoveLiquidity}>
          Remove Liquidity
        </Button>
      </div>
    </div>
  );
}

export default Liquidity;
