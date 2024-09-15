// src/components/Bribe.js
import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import BribeContractABI from '../abis/BribeContract.json';

function Bribe() {
  const [bribeAmount, setBribeAmount] = useState('');
  const { account, library } = useWeb3React();

  const handleSubmitBribe = async () => {
    if (!account) {
      alert('Please connect your wallet.');
      return;
    }
    const bribeContractAddress = 'BRIBE_CONTRACT_ADDRESS';
    const bribeContract = new ethers.Contract(
      bribeContractAddress,
      BribeContractABI,
      library.getSigner()
    );

    const amount = ethers.utils.parseUnits(bribeAmount, 18);

    try {
      const tx = await bribeContract.submitBribe(amount);
      await tx.wait();
      alert('Bribe submitted!');
    } catch (error) {
      console.error(error);
      alert('Failed to submit bribe.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4">Bribe System</Typography>
      <TextField
        label="Bribe Amount"
        value={bribeAmount}
        onChange={(e) => setBribeAmount(e.target.value)}
        type="number"
      />
      <Button variant="contained" color="primary" onClick={handleSubmitBribe}>
        Submit Bribe
      </Button>
    </div>
  );
}

export default Bribe;
