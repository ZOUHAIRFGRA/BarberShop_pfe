// Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Home from './Home';
// import CitySelection from './CitySelection';
// import BarberList from './BarberList';
// import ServiceSelection from './ServiceSelection';
// import Checkout from './Checkout';
import Login from './Login';

const Routes = () => {
  return (
    <Router>
      <Switch>
        {/* <Route path="/" exact component={Home} /> */}
        {/* <Route path="/city-selection" component={CitySelection} /> */}
        {/* <Route path="/barbers/:city" component={BarberList} /> */}
        {/* <Route path="/services/:barberId" component={ServiceSelection} /> */}
        {/* <Route path="/checkout" component={Checkout} /> */}
        {/* <Route path="/login" component={Login} /> */}
      </Switch>
    </Router>
  );
};

export default Routes;
