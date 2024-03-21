import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments } from "../actions/userActions";
import axios from 'axios'
const Appointements = () => {
  // const dispatch = useDispatch();
  // const appointments = useSelector((state) => state.auth.appointements);
  const [appointments,setAppointments] = useState([])
  console.log(appointments)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/appointements`, { withCredentials: true });
    console.log(response.data.appointments)
    setAppointments(response.data.appointments)
        setLoading(false);
      } catch (error) {
        // Handle error
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Appointments</h1>
      {appointments.map((appointment) => (
        <div key={appointment._id} className="card">
          <div className="card-body">
            <h5 className="card-title">
              Appointment with {appointment.barber.name}
            </h5>
            <p className="card-text">Service: {appointment.service.name}</p>
            <p className="card-text">
              Appointment Time: {appointment.appointmentTime}
            </p>
            <p className="card-text">
              Appointment Date: {appointment.selectedDay} |{" "}
              {appointment.selectedDayDate}{" "}
            </p>
            {/* Add more appointment details as needed */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Appointements;
