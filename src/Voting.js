// src/components/Voting.js
import React, { useState } from 'react';
import { Button, Select, MenuItem, Typography } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import GovernanceTokenABI from '../abis/GovernanceToken.json';

function Voting() {
  const [selectedProposal, setSelectedProposal] = useState('');
  const { account, library } = useWeb3React();

  const proposals = [
    { id: 1, description: 'Increase Amplification Coefficient' },
    { id: 2, description: 'Adjust Trading Fee' },
    // Add more proposals
  ];

  const handleVote = async () => {
    if (!account) {
      alert('Please connect your wallet.');
      return;
    }
    const governanceTokenAddress = 'GOVERNANCE_TOKEN_ADDRESS';
    const governanceContract = new ethers.Contract(
      governanceTokenAddress,
      GovernanceTokenABI,
      library.getSigner()
    );

    try {
      const proposalId = selectedProposal;
      const support = true; // true for 'Yes', false for 'No'
      const tx = await governanceContract.castVote(proposalId, support);
      await tx.wait();
      alert('Vote submitted!');
    } catch (error) {
      console.error(error);
      alert('Voting failed.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4">Vote on Proposals</Typography>
      <Select
        value={selectedProposal}
        onChange={(e) => setSelectedProposal(e.target.value)}
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select Proposal
        </MenuItem>
        {proposals.map((proposal) => (
          <MenuItem key={proposal.id} value={proposal.id}>
            {proposal.description}
          </MenuItem>
        ))}
      </Select>
      <Button variant="contained" color="primary" onClick={handleVote}>
        Vote
      </Button>
    </div>
  );
}

export default Voting;
