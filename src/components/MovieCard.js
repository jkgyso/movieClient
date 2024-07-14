import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';

const MovieCard = ({ movieProp }) => {
  const { title, director, year, description, genre, _id } = movieProp;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Card style={{ border: 'none', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', height: '100%' }} className="mt-3">
      <Card.Body style={{ height: '100%' }}>
        <Card.Title>{title}</Card.Title>
        <Card.Text><strong>Director:</strong> {director}</Card.Text>
        <Card.Text><strong>Year:</strong> {year}</Card.Text>
        <Card.Text><strong>Description:</strong> {description}</Card.Text>
        <Card.Text><strong>Genre:</strong> {genre}</Card.Text>

        {/* Button for Details or Login */}
        {user ? (
          <Button variant="primary" style={{ backgroundColor: '#FFA81F', borderColor: '#FFA81F', color: 'black' }} onClick={() => navigate(`/movies/getMovie/${_id}`)}>Details</Button>
        ) : (
          <Button variant="primary" style={{ backgroundColor: '#FFA81F', borderColor: '#FFA81F', color: 'black' }} onClick={() => navigate('/login')}>Login to view details</Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
