import React, { useEffect } from "react";
import { Card, Row, Col, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchBarberProfile } from "../../actions/barberActions";

const Profile = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchBarberProfile());
  }, [dispatch]);
  
  const profile = useSelector((state) => state.barber.profile);

  // Check if profile is null or undefined
  if (!profile) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <div className="barber-profile">
      <Card>
        <Card.Header>
          <Row>
            <Col sm={3}>
              <Card.Img src={profile.image} alt="Barber" />
            </Col>
            <Col sm={9}>
              <Card.Title>{profile.name}</Card.Title>
              <Card.Text>{profile.username}</Card.Text>
              <Card.Text>{profile.email}</Card.Text>
              <Card.Text>{profile.address}</Card.Text>
              <Card.Text>{profile.phone}</Card.Text>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Title>Services Offered</Card.Title>
          <ListGroup>
            {profile.services.map((service) => (
              <ListGroup.Item key={service._id}>
                <p>{service.name} | {service.price} | {service.duration}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Card.Title>Available Slots</Card.Title>
           <ListGroup>
            {profile.availableSlots.map((slot) => (
              <ListGroup.Item key={slot._id}>
                <p>Time: {slot.time}</p>
                <p>Status: {slot.status}</p>
                <p>Available Days:</p>
                <ul>
                  {slot.availableDays.map((day) => (
                    <li key={day._id}>
                      <p>{day.dayOfWeek}</p>
                      <p>Status: {day.status}</p>
                    </li>
                  ))}
                </ul>
              </ListGroup.Item>
            ))}
          </ListGroup> 
          <Card.Title>Reviews</Card.Title>
          <Card.Text>Average Rating: {profile.averageRating}</Card.Text>
          <Card.Text>Number of Reviews: {profile.numberOfReviews}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
