import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import './barber.css'
import SideBar from "./Sidebar/SideBar";
import { useDispatch } from "react-redux";
import { loadAdmin } from "../../actions/adminActions";
import { ToastContainer } from 'react-toastify';
import Cities from "../../pages/adminPages/Cities";
import NotFound from "../../pages/adminPages/NotFound";
import AddCity from "../../pages/adminPages/AddCity";
import EditCity from "../../pages/adminPages/EditCity";
import Barbers from "../../pages/adminPages/Barbers";
import Reviews from "../../pages/adminPages/Reviews";
import Users from "../../pages/adminPages/Users";

const BarberInterface = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAdmin());
  }, [dispatch]);

  return (
    <SideBar>
      <ToastContainer/>
      <Routes>
        <Route index  element={<Cities />} />
        <Route path="/cities/addCity" element={<AddCity />} />
        <Route path="/cities/editcity/:id" element={<EditCity />} />
        <Route path="/barbers" element={<Barbers />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </SideBar>
  );
};

export default BarberInterface;
