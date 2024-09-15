// src/App.js
import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import WalletConnector from './components/WalletConnector';
import Swap from './components/Swap';
import Liquidity from './components/Liquidity';
import Voting from './components/Voting';
import Fees from './components/Fees';
import Bribe from './components/Bribe';

function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <WalletConnector />
          <Button color="inherit" component={Link} to="/swap">
            Swap
          </Button>
          <Button color="inherit" component={Link} to="/liquidity">
            Liquidity
          </Button>
          <Button color="inherit" component={Link} to="/voting">
            Voting
          </Button>
          <Button color="inherit" component={Link} to="/fees">
            Fees
          </Button>
          <Button color="inherit" component={Link} to="/bribe">
            Bribe
          </Button>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path="/swap" component={Swap} />
        <Route path="/liquidity" component={Liquidity} />
        <Route path="/voting" component={Voting} />
        <Route path="/fees" component={Fees} />
        <Route path="/bribe" component={Bribe} />
        <Route path="/" exact component={Swap} />
      </Switch>
    </div>
  );
}

export default App;
