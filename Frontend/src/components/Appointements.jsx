import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments } from "../actions/userActions";
import axios from "axios";
import "./style/Appointements.css";
import { Alert } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
const Appointements = () => {
  // const dispatch = useDispatch();
  // const appointments = useSelector((state) => state.user.appointements);
  const [appointments, setAppointments] = useState([]);
  // console.log(appointments)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/appointements`,
          { withCredentials: true }
        );
        // Sort appointments by date, assuming appointmentDate is the date field
        const sortedAppointments = response.data.appointments.sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));
        setAppointments(sortedAppointments);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) {
    // Display the loading spinner while the data is being fetched
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <ClipLoader color={"#123abc"} loading={loading} size={170} />;
      </div>
    );
  }
  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  return (
    <div>
      <h1>Appointments</h1>
      {appointments.map((appointment) => (
        <div key={appointment._id} className="card">
          <a href="" className="">
            <div className="appointment-item">
              <div className="appointment1">
                <div className={`${appointment.status === 'approved' ? 'appointment_confirmed' : 'appointment_Unconfirmed'}`}>
                  <div className="confirmed">{appointment.status}</div>
                </div>

                <div className="div_coiffure">
                  <div>
                    <div className="coiffure">
                      <div className="coiffure1">
                        <div className="service-name">
                          {appointment.service.name}
                        </div>
                        <div className="info_coiffure">
                          <div data-testid="avatar" className="avatar">
                            <div className="avatar1">
                              <img
                                src="https://d2zdpiztbgorvt.cloudfront.net/region1/us/240346/biz_photo/20b5dcc0baf04ff8a0130c3c13ad99-oscar-lee-biz-photo-d7a28ce49c4b468f806e73f755105b-booksy.jpeg?size=250x250"
                                alt="Oscar Lee avatar"
                                data-testid="avatar-photo"
                              />
                            </div>
                          </div>
                          {appointment.barber.name}
                        </div>
                      </div>
                      <div>
                        <div className="service-price">
                          <div data-testid="service-price"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="appointment-date">
                <div className="appointment-month">
                  {appointment.selectedDay}
                </div>
                <div className="appointment-day">
                  {" "}
                  {appointment.selectedDayDate}{" "}
                </div>
                <div></div>
                <div data-testid="appointment-time">
                  {appointment.appointmentTime}
                </div>
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Appointements;
