import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createCity } from '../../actions/adminActions';
import { useNavigate, useParams } from 'react-router-dom';

const AddCity = () => {
  const navigate =useNavigate()
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [neighborhoods, setNeighborhoods] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCity = {
      name,
      neighborhoods: neighborhoods.split(',').map((neighborhood) => neighborhood.trim())
    };
    dispatch(createCity(newCity));
    navigate('/admin-interface/');
  };

  return (
    <div>
      <h2>Add City</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter city name" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formBasicNeighborhoods">
          <Form.Label>Neighborhoods (Comma-separated)</Form.Label>
          <Form.Control type="text" placeholder="Enter neighborhoods" value={neighborhoods} onChange={(e) => setNeighborhoods(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddCity;
