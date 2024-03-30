import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {  addNeighborhood } from '../../actions/adminActions'; // Importing addNeighborhood action

const EditCity = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { cities } = useSelector((state) => state.admin);
  const [name, setName] = useState('');
  const [newNeighborhood, setNewNeighborhood] = useState('');
  const [neighborhoods, setNeighborhoods] = useState([]);

  useEffect(() => {
    const city = cities.find((city) => city._id === id);
    if (city) {
      setName(city.name);
      setNeighborhoods(city.neighborhoods);
    }
  }, [cities, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/admin-interface');
  };

  const handleAddNeighborhood = async () => {
    try {
      await dispatch(addNeighborhood(name, newNeighborhood)); // Dispatching addNeighborhood action
      setNewNeighborhood('');
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Edit City</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter city name" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formBasicNeighborhoods">
          <Form.Label>Neighborhoods</Form.Label>
          <Table striped bordered hover>
            <tbody>
              {neighborhoods.map((neighborhood, index) => (
                <tr key={index}>
                  <td>{neighborhood.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Form.Group>
        <Form.Group controlId="formBasicNewNeighborhood">
          <Form.Label>Add Neighborhood</Form.Label>
          <Form.Control type="text" placeholder="Enter new neighborhood" value={newNeighborhood} onChange={(e) => setNewNeighborhood(e.target.value)} />
        </Form.Group>
        <Button variant="primary" onClick={handleAddNeighborhood}>
          Add Neighborhood
        </Button>
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default EditCity;
