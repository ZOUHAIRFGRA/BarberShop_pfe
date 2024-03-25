import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css'
import SideBar from "./Sidebar/SideBar";
import Appointments from "../../pages/barberPages/Appointments";
import Services from "../../pages/barberPages/Services";
import Statistics from "../../pages/barberPages/Analytics";
import Worktime from "../../pages/barberPages/Worktime";
import Setting from "../../pages/barberPages/Setting";
import NotFound from "../../pages/barberPages/NotFound";
import Profile from "../../pages/barberPages/Profile";
import AddService from "../../pages/barberPages/AddService";
import EditService from "../../pages/barberPages/EditService";
import { useDispatch } from "react-redux";
import { loadBarber } from "../../actions/barberActions";
import { ToastContainer } from 'react-toastify';

const BarberInterface = () => {

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(loadBarber());
  // }, [dispatch]);

  return (
    <SideBar>
      <ToastContainer/>
      <Routes>
        <Route path="/appointments" element={<Appointments />} />
        <Route index element={<Services />} />
        <Route path="/analytics" element={<Statistics />} />
        <Route path="/worktime" element={<Worktime />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/settings/profile" element={<Profile />} />
        <Route path="/services/addservice" element={<AddService />} />
        <Route path="/services/editservice/:id" element={<EditService />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </SideBar>
  );
};

export default BarberInterface;
