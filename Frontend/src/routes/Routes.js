// Routes.js

import React from 'react';
import { Route, Routes as RouterRoutes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NeighborhoodsPage from '../pages/NeighborhoodsPage';
import BarbersList from '../pages/BarbersList';


const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<HomePage />} />
      <Route path="/neighborhoods/:city" element={<NeighborhoodsPage />} />
      {/* <Route path="/barber/:id" component={BarberDetails} /> */}
      <Route path="/barbers" component={BarbersList} />
    </RouterRoutes>
  );
};

export default Routes;