import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { updateServiceForBarber } from '../../actions/barberActions';
import 'react-toastify/dist/ReactToastify.css'

export default function EditService() {
  const { id } = useParams(); // Get the service ID from the URL params
  const dispatch = useDispatch();
  const services = useSelector((state) => state.barber.services);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description:'',
    duration: '',
    images: '',
  });

  useEffect(() => {
    // Find the service with the matching ID
    const service = services.find((serv) => serv._id === id);
    if (service) {
      // Populate the form with the existing service values
      setFormData({
        name: service.name,
        price: service.price,
        description: service.description,
        duration: service.duration,
        images: service.images,
      });
    }
  }, [id, services]);

  const { name, price, duration, images,description } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the update service action
    dispatch(updateServiceForBarber(id, formData));
    console.log(services)
     navigate('/barber-interface')
    toast.success('Le service a été modifié avec succès!', { theme: 'dark' });
  };
  

  return (
    <Container>
      <h2>Edit Service</h2>
      <Button variant="primary" onClick={()=>{toast("Wow so easy !")}}>Notify !</Button>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="serviceName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="servicePrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            name="price"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="servicedescription">
          <Form.Label>description</Form.Label>
          <Form.Control
            type="text"
            value={description}
            name="description"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="serviceDuration">
          <Form.Label>Duration</Form.Label>
          <Form.Control
            type="text"
            value={duration}
            onChange={handleChange}
            name="duration"
          />
        </Form.Group>

        <Form.Group controlId="serviceImages">
          <Form.Label>Images</Form.Label>
          <Form.Control
            type="text"
            name="images"
            value={images}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>

      </Form>

    </Container>
  );
}
