// Routes.js

import React from 'react';
import { Route, Routes as RouterRoutes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NeighborhoodsPage from '../pages/NeighborhoodsPage';
import BarbersList from '../pages/BarbersList';
import BarberDetails from '../pages/BarberDetails'; // Import the new page
import NoPage from '../pages/NoPage';
import Login from '../pages/Login';
import Register from '../pages/Register';

const Routes = () => {
  return (
    <RouterRoutes>
      <Route index element={<HomePage />} />
      <Route path="/neighborhoods/:city" element={<NeighborhoodsPage />} />
      {/* Adjust the route for BarbersList */}
      <Route path="/neighborhoods/:city/:neighborhood" element={<BarbersList />} />
      {/* New route for BarberDetails */}
      <Route path="/barber/:city/:neighborhood/:id" element={<BarberDetails />} />
      <Route path="*" element={<NoPage />} />

      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
    </RouterRoutes>
  );
};

export default Routes;
