import React, { useState, useEffect } from "react";
import axios from "axios";

const Appointements = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Make API request to fetch appointments
        const response = await axios.get("http://localhost:4000/user/appointements", { withCredentials: true });

        // Set appointments data in state
        setAppointments(response.data.appointments);
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        // Handle error
        setError(error.response.data.message);
        setLoading(false);
      }
    };

    fetchAppointments();
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
            <h5 className="card-title">Appointment with {appointment.barber.name}</h5>
            <p className="card-text">Service: {appointment.service.name}</p>
            <p className="card-text">Appointment Time: {appointment.appointmentTime}</p>
            <p className="card-text">Appointment Date: {appointment.selectedDay} | {appointment.selectedDayDate} </p>
            {/* Add more appointment details as needed */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Appointements;
