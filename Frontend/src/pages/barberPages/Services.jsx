import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Swal from 'sweetalert2'
import { deleteServiceForBarber, fetchAllServicesForBarber } from '../../actions/barberActions'

function Services() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchAllServicesForBarber())
  },[dispatch])
  const services = useSelector((state) => state.barber.services)
  useEffect(()=>{console.log(services)},[services])

  const HandelDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteServiceForBarber(id))
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        })
      }
    })
  }
  return (
    <>
      <ToastContainer />
      <div className="container">
        <h2>List of my Services:</h2>
        <Link to="/services/addservice">
          <button className="btn btn-primary">Ajouter Service</button>
        </Link>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                {/* <th>Description</th> */}
                <th>Price</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((serv) => (
                <tr key={serv._id}>
                  <td>{serv.name}</td>
                  {/* <td>{serv.description}</td> */}
                  <td>{serv.price}</td>
                  <td>{serv.duration}</td>
                  <td>
                    <Link to={`/barber-interface/services/editservice/${serv._id}`}>
                      <button className="btn btn-info">Edit</button>
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => HandelDelete(serv._id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Services
