import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/authentication/sign-in" component={Login} />
        {/* Add more routes here as needed */}
      </Switch>
    </Router>
  );
};

export default Routes;