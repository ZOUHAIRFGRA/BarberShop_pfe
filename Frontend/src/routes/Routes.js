// Routes.js

import React from 'react';
import { Route, Routes as RouterRoutes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NeighborhoodsPage from '../pages/NeighborhoodsPage';
import BarbersList from '../pages/BarbersList';
import NoPage from '../pages/NoPage';
import Login from '../pages/Login';
import Register from '../pages/Register';

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<HomePage />} />
      <Route path="/neighborhoods/:city" element={<NeighborhoodsPage />} />
      {/* Adjust the route for BarbersList */}
      <Route path="/neighborhoods/:city/:neighborhood" element={<BarbersList />} />
      <Route path="*" element={<NoPage />} />

      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
    </RouterRoutes>
  );
};

export default Routes;
