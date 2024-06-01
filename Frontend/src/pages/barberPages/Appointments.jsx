import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  approveAppointment,
  fetchAllAppointmentsForBarber,
  rejectAppointment,
  flagAppointementAsDone
} from "../../actions/barberActions";
import { useEffect } from "react";

function Appointments() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllAppointmentsForBarber());
  }, [dispatch]);

  const appointments = useSelector((state) => state.barber.appointments);
  // useEffect(() => {
  //   console.log(appointments);
  // }, [appointments]);
  const handleApprove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(approveAppointment(id));
        Swal.fire({
          title: "Approuvé!",
          text: "Le Rendez-vous a été approuvé avec succès",
          icon: "success",
        });
      }
    });
  };
  const handleflagAppointementAsDone = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, its done!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(flagAppointementAsDone(id));
        Swal.fire({
          title: "Terminé!",
          text: "Le Rendez-vous a été terminé avec succès",
          icon: "success",
        });
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(rejectAppointment(id));
        Swal.fire({
          title: "Rejeté!",
          text: "Le Rendez-vous a été rejeté avec succès",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
    <h2>Prochains Rendez-vous</h2>
    {appointments.length > 0 ? (
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Heure</th>
              <th>Nom du Client</th>
              <th>Service</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.selectedDayDate}</td>
                <td>{appointment.appointmentTime}</td>
                <td>{appointment.user && appointment.user.username}</td>
                <td>{appointment.service.name}</td>
                <td style={{ fontWeight: "bold", color: appointment.status === "rejected" ? "red" :appointment.status === "approved" ? "green" : "blue" }}>
                  {appointment.status}
                </td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => handleApprove(appointment._id)} // Use appointment._id instead of appointment.id
                  >
                    Approuver
                  </button>{" "}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleReject(appointment._id)} // Use appointment._id instead of appointment.id
                  >
                    Rejeter
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => handleflagAppointementAsDone(appointment._id)} // Use appointment._id instead of appointment.id
                  >
                    Terminé
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="alert alert-info" role="alert">
        Aucun rendez-vous à venir
      </div>
    )}
  </div>
  
  );
}

export default Appointments;
