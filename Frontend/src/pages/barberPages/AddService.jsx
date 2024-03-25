import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addServiceToBarber } from '../../actions/barberActions';
export default function AddService() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description:'',
    duration: '',
    images: '',
  });

  const { name, price, duration, images,description } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addServiceToBarber(formData));
    navigate('/barber-interface')
    setFormData({
      name: '',
      price: '',
      description:'',
      duration: '',
      images: '',
    });
    toast.info("Le service a été ajouté avec succès!",{theme: "dark"});
  };
  return (
    <Container>
    <h2>Add Service</h2>
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
      <Form.Group controlId="servicedescription">
        <Form.Label>description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="servicePrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={price}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="serviceDuration">
        <Form.Label>Duration</Form.Label>
        <Form.Control
          type="text"
          name="duration"
          value={duration}
          onChange={handleChange}
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
        Add Service
      </Button>
    </Form>
  </Container>
);
};
