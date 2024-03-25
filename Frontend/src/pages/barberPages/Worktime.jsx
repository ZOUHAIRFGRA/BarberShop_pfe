import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Swal from 'sweetalert2';

import {
  fetchAvailableSlots,
  deleteAvailableSlot,
  updateAvailableSlot,
} from "../../actions/barberActions";

const AvailableSlotsComponent = () => {
  const dispatch = useDispatch();
  const { slots, loading, error } = useSelector((state) => state.barber);
  const [updatingSlotId, setUpdatingSlotId] = useState(null);
  const [updatedSlots, setUpdatedSlots] = useState([]); // Local state to track updated slots

  useEffect(() => {
    dispatch(fetchAvailableSlots());
  }, [dispatch]);

  const handleDeleteSlot = (slotId) => {
    // Display a confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this slot!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      // If user confirms deletion, dispatch the delete action
      if (result.isConfirmed) {
        dispatch(deleteAvailableSlot(slotId));
      }
    });
  };

  const handleEditSlot = (slotId) => {
    setUpdatingSlotId(slotId);
  };

  const handleSaveUpdate = async () => {
    try {
      const updatedSlotsArray = [];
      const slotsCopy = [...slots]; // Make a copy of the slots from the state

      updatedSlots.forEach((updatedSlot) => {
        const slotIndex = slotsCopy.findIndex(
          (slot) => slot._id === updatedSlot._id
        );
        if (slotIndex !== -1) {
          // Check if the version matches
          if (slotsCopy[slotIndex].__v === updatedSlot.__v) {
            // Update the local copy with the new data
            slotsCopy[slotIndex] = updatedSlot;
            updatedSlotsArray.push(updatedSlot);
          } else {
            throw new Error("Document version mismatch. Please try again.");
          }
        }
      });

      // Dispatch the updateAvailableSlot action with updated slots data
      await dispatch(updateAvailableSlot(updatedSlotsArray));

      // Reset the updatingSlotId state to exit update mode
      setUpdatingSlotId(null);

      // Reload the data by dispatching the fetchAvailableSlots action
      dispatch(fetchAvailableSlots());
    } catch (error) {
      console.error(error.message);
      // Handle the error gracefully (e.g., display an error message to the user)
    }
  };

  const handleUpdateDayStatus = (slotId, dayIndex, newStatus) => {
    // Find the slot that is being updated
    const updatedSlot = slots.find((slot) => slot._id === slotId);

    // Check if the slot or availableDays is undefined
    if (!updatedSlot || !updatedSlot.availableDays) {
      console.error("Slot or availableDays is undefined");
      return;
    }

    // Update the status of the specific day in the slot
    updatedSlot.availableDays[dayIndex].status = newStatus;

    // Update the updatedSlots array in the local state
    const newUpdatedSlots = [...slots];
    const updatedSlotIndex = newUpdatedSlots.findIndex(
      (slot) => slot._id === slotId
    );
    newUpdatedSlots[updatedSlotIndex] = updatedSlot;
    setUpdatedSlots(newUpdatedSlots);
  };

  return (
    <Container>
      <h1 className="mt-5 mb-3">Available Slots</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {slots && (
        <Row>
          {slots.map((slot) => (
            <Col key={slot._id} xs={12} sm={6} md={4} lg={3} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{slot.time}</Card.Title>
                  <Card.Text>Status: {slot.status}</Card.Text>
                  <ul className="list-unstyled">
                    {slot.availableDays.map((day, index) => (
                      <li key={day._id}>
                        {day.dayOfWeek}:
                        {updatingSlotId === slot._id ? (
                          <select
                            value={day.status}
                            onChange={(e) =>
                              handleUpdateDayStatus(
                                slot._id,
                                index,
                                e.target.value
                              )
                            }
                          >
                            <option value="available">Available</option>
                            <option value="booked">Booked</option>
                          </select>
                        ) : (
                          <span>{day.status}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                  {updatingSlotId === slot._id && (
                    <Button variant="success" onClick={handleSaveUpdate}>
                      Save
                    </Button>
                  )}
                  {updatingSlotId !== slot._id && ( // Render the "Update" and "Delete" buttons only if not in edit mode
                    <>
                      <Button
                        variant="primary"
                        onClick={() => handleEditSlot(slot._id)}
                      >
                        Update
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteSlot(slot._id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default AvailableSlotsComponent;
