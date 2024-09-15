// src/components/Fees.js
import React from 'react';
import { Button, Typography } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import ForexCurvePoolABI from '../abis/ForexCurvePool.json';

function Fees() {
  const { account, library } = useWeb3React();

  const handleCollectFees = async () => {
    if (!account) {
      alert('Please connect your wallet.');
      return;
    }
    const contractAddress = 'FOREX_CURVE_POOL_ADDRESS';
    const contract = new ethers.Contract(contractAddress, ForexCurvePoolABI, library.getSigner());

    try {
      const tx = await contract.collectFees();
      await tx.wait();
      alert('Fees collected!');
    } catch (error) {
      console.error(error);
      alert('Failed to collect fees.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4">Collect Fees</Typography>
      <Button variant="contained" color="primary" onClick={handleCollectFees}>
        Collect Fees
      </Button>
    </div>
  );
}

export default Fees;
