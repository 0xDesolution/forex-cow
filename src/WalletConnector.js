// src/components/WalletConnector.js
import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../connectors';
import { Button } from '@mui/material';

function WalletConnector() {
  const { activate, active, account, deactivate } = useWeb3React();

  const connect = async () => {
    try {
      await activate(injected);
    } catch (ex) {
      console.error(ex);
    }
  };

  const disconnect = async () => {
    try {
      deactivate();
    } catch (ex) {
      console.error(ex);
    }
  };

  return (
    <div>
      {active ? (
        <div>
          <Button color="inherit" onClick={disconnect}>
            Disconnect
          </Button>
          <span>{account}</span>
        </div>
      ) : (
        <Button color="inherit" onClick={connect}>
          Connect Wallet
        </Button>
      )}
    </div>
  );
}

export default WalletConnector;
