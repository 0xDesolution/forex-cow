// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Web3ReactProvider } from '@web3-react/core';
import App from './App';
import { Web3Provider } from '@ethersproject/providers';
import { BrowserRouter as Router } from 'react-router-dom';

function getLibrary(provider) {
  return new Web3Provider(provider);
}

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <Router>
      <App />
    </Router>
  </Web3ReactProvider>,
  document.getElementById('root')
);
