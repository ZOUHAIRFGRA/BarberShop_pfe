import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

function Appointments() {
  const appointments = useSelector((state) => state.barber.appointments)
  
  const dispatch = useDispatch()

  const handleApprove = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // dispatch(approveAppointment(id))
        Swal.fire({
          title: 'Approuvé!',
          text: 'Le Rendez-vous a été approuvé avec succès',
          icon: 'success',
        })
      }
    })
  }

  const handleReject = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reject it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // dispatch(rejectAppointment(id))
        Swal.fire({
          title: 'Rejeté!',
          text: 'Le Rendez-vous a été rejeté avec succès',
          icon: 'success',
        })
      }
    })
  }

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
              {appointments.map((appointment) => {
                if (appointment.status === 'rejeté') {
                  return (
                    <tr key={appointment.id}>
                      <td style={{ textDecoration: 'line-through' }}>
                        {appointment.date}
                      </td>
                      <td style={{ textDecoration: 'line-through' }}>
                        {appointment.time}
                      </td>
                      <td style={{ textDecoration: 'line-through' }}>
                        {appointment.clientName}
                      </td>
                      <td style={{ textDecoration: 'line-through' }}>
                        {appointment.service}
                      </td>
                      <td style={{ color: 'red', fontWeight: 'bold' }}>
                        {appointment.status}
                      </td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => handleApprove(appointment.id)}
                        >
                          Approuver
                        </button>{' '}
                        <button
                          className="btn btn-danger"
                          onClick={() => handleReject(appointment.id)}
                        >
                          Rejeter
                        </button>
                      </td>
                    </tr>
                  )
                } else if (appointment.status === 'approuvé') {
                  return (
                    <tr key={appointment.id}>
                      <td>{appointment.date}</td>
                      <td>{appointment.time}</td>
                      <td>{appointment.clientName}</td>
                      <td>{appointment.service}</td>
                      <td style={{ color: 'green', fontWeight: 'bold' }}>
                        {appointment.status}
                      </td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => handleApprove(appointment.id)}
                        >
                          Approuver
                        </button>{' '}
                        <button
                          className="btn btn-danger"
                          onClick={() => handleReject(appointment.id)}
                        >
                          Rejeter
                        </button>
                      </td>
                    </tr>
                  )
                } else {
                  return (
                    <tr key={appointment.id}>
                      <td>{appointment.date}</td>
                      <td>{appointment.time}</td>
                      <td>{appointment.clientName}</td>
                      <td>{appointment.service}</td>
                      <td style={{ fontWeight: 'bold' }}>
                        {appointment.status}
                      </td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => handleApprove(appointment.id)}
                        >
                          Approuver
                        </button>{' '}
                        <button
                          className="btn btn-danger"
                          onClick={() => handleReject(appointment.id)}
                        >
                          Rejeter
                        </button>
                      </td>
                    </tr>
                  )
                }
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info" role="alert">
          Aucun rendez-vous à venir
        </div>
      )}
    </div>
  )
}

export default Appointments
