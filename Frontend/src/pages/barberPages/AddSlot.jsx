import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button,Container } from 'react-bootstrap';
import { createAvailableSlots } from '../../actions/barberActions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const AddSlot = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();

  const [time, setTime] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setTime(event.target.value);
    setError(''); // Clear any previous error message
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate time format using regular expression
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(time)) {
      setError('Please enter a valid time format (e.g., 09:34)');
      return;
    }

    const slot = { time };
    dispatch(createAvailableSlots([slot]));
    setTime('');
    navigate('/barber-interface/worktime')
    toast.info("Slot added successfully",{theme: "dark"});

  };

  return (
    <Container className="d-flex justify-content-center">
      <div style={{ width: '400px' }}> {/* Adjust width as needed */}
        <h2 className="text-center">Add Slot</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter time (e.g., 09:34 and for pm use: 15:00 etc)"
              value={time}
              onChange={handleChange}
              isInvalid={!!error} // Apply Bootstrap validation styles
            />
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
          </Form.Group>
          <div className='text-center pt-3' > 
          <Button variant="success" type="submit">Add Slot</Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default AddSlot;
