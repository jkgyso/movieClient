import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa'; // Importing user icon
import UserContext from '../UserContext';

const MovieCard = ({ movieProp }) => {
  const { title, director, year, description, genre, comments, _id } = movieProp;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Card style={{ border: 'none', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} className="mt-3">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text><strong>Director:</strong> {director}</Card.Text>
        <Card.Text><strong>Year:</strong> {year}</Card.Text>
        <Card.Text><strong>Description:</strong> {description}</Card.Text>
        <Card.Text><strong>Genre:</strong> {genre}</Card.Text>
        
        {/* Styling the Comments Section */}
        <div style={{ marginBottom: '10px' }}>
          <Card.Subtitle className="mb-2 text-muted"><strong>Comments:</strong></Card.Subtitle>
          {comments && comments.length > 0 ? (
            <ul style={{ listStyleType: 'none', padding: '0' }}>
              {comments.map((comment, index) => (
                <li key={index} style={{ marginBottom: '5px' }}>
                  <FaUser style={{ marginRight: '5px' }} /> {/* User icon */}
                  {comment.comment}
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments</p>
          )}
        </div>

        {/* Button for Details or Login */}
        {user ? (
          <Button variant="primary" onClick={() => navigate(`/movies/getMovie/${_id}`)}>Details</Button>
        ) : (
          <Button variant="primary" onClick={() => navigate('/login')}>Login to view details</Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
