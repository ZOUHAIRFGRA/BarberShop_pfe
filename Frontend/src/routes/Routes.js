// Routes.js

import React from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NeighborhoodsPage from "../pages/NeighborhoodsPage";
import BarbersList from "../pages/BarbersList";
import BarberDetails from "../pages/BarberDetails"; // Import the new page
import NoPage from "../pages/NoPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllBarbers from "../pages/AllBarbers";

const Routes = ({ setContentVisible }) => {
  return (
    <RouterRoutes>
      <Route
        index
        element={<HomePage setContentVisible={setContentVisible} />}
      />
      <Route path="/barbers/:city" 
      element={<NeighborhoodsPage setContentVisible={setContentVisible}/>} />
      {/* Adjust the route for BarbersList */}
      <Route
        path="/barbers/:city/:neighborhood"
        element={<BarbersList  setContentVisible={setContentVisible}/>}
      />
      {/* New route for BarberDetails */}
      <Route
        path="/barbers/:city/:neighborhood/:id"
        element={<BarberDetails setContentVisible={setContentVisible} />}
      />
      <Route
        path="/barbers/"
        element={<AllBarbers setContentVisible={setContentVisible} />}
      />
       <Route
        path="/barberDetails/:id"
        element={<BarberDetails setContentVisible={setContentVisible} />}
      />

      <Route path="/login" element={<Login setContentVisible={setContentVisible}/>} />
      <Route path="/register" element={<Register setContentVisible={setContentVisible}/>} />
      <Route path="*" element={<NoPage setContentVisible={setContentVisible}/>} />
    </RouterRoutes>
  );
};

export default Routes;
