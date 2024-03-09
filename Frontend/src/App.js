// App.js
import React, { useState } from "react";
import { BrowserRouter, Route, Routes  } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import NeighborhoodsPage from "./pages/NeighborhoodsPage";
import BarbersList from "./pages/BarbersList";
import BarberDetails from "./pages/BarberDetails";
import AllBarbers from "./pages/AllBarbers";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import Profile from "./pages/Profile";
import './App.css'

const App = () => {
  const [contentVisible, setContentVisible] = useState(false);

  return (
    <BrowserRouter>
      <div>
        <Header contentVisible={contentVisible} />

        <Routes>
          <Route
            index
            element={<HomePage setContentVisible={setContentVisible} />}
          />
          <Route
            path="/barbers/:city"
            element={
              <NeighborhoodsPage setContentVisible={setContentVisible} />
            }
          />
          {/* Adjust the route for BarbersList */}
          <Route
            path="/barbers/:city/:neighborhood"
            element={<BarbersList setContentVisible={setContentVisible} />}
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

          <Route
            path="/login"
            element={<Login setContentVisible={setContentVisible} />}
          />
          <Route
            path="/profile"
            element={<Profile setContentVisible={setContentVisible}/>}
          />
          <Route
            path="/register"
            element={<Register setContentVisible={setContentVisible} />}
          />
          <Route
            path="*"
            element={<NoPage setContentVisible={setContentVisible} />}
          />
        </Routes>

        <Footer contentVisible={contentVisible} />
      </div>
    </BrowserRouter>
  );
};

export default App;
