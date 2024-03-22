import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { addService } from '../components/actions'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AddService() {
  const [formValue, setFormValue] = useState({
    name: '',
    price: '',
    duration: '',
    description: '',
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const count = useSelector((data) => data.barber.services[data.barber.services.length - 1])
  console.log(count)
  // const Add = () => {
  //   dispatch(
  //     addService({
  //       id: count.id + 1,
  //       name: formValue.name,
  //       price: formValue.price,
  //       duration: formValue.duration,
  //       description: formValue.description,
  //     }),
  //   )
  //   navigate('/services')
  //   setFormValue({
  //     name: '',
  //     price: '',
  //     duration: '',
  //     description: '',
  //   })
  //   toast.info("Le service a été ajouté avec succès!",{theme: "dark"});
  // }
  return (
    <div className="add-service-container">
      <h2>Add New Service</h2>
      <form>
        <div className="form-group">
          <label for="exampleInputEmail1">Name:</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter name..."
            value={formValue.name}
            onChange={(e) =>
              setFormValue({ ...formValue, name: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Price:</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter price..."
            onChange={(e) =>
              setFormValue({ ...formValue, price: e.target.value })
            }
            value={formValue.price}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Duration:</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter duration..."
            onChange={(e) =>
              setFormValue({ ...formValue, duration: e.target.value })
            }
            value={formValue.duration}
          />
        </div>
        <div className="form-group mb-3">
          <label for="exampleInputPassword1">Description:</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="6"
            placeholder="Enter description..."
            onChange={(e) =>
              setFormValue({ ...formValue, description: e.target.value })
            }
            value={formValue.description}
          ></textarea>
        </div>
        {/* <button type="submit" className="btn btn-primary" onClick={Add}>
          Add
        </button> */}
      </form>
    </div>
  )
}
