import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import UserContext from '../UserContext';

const MovieView = () => {
  const { movieId } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(null);
  const [showAlert, setShowAlert] = useState(false); // State for showing the alert

  const [loadingMovie, setLoadingMovie] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`https://movieappapi-6awg.onrender.com/movies/getMovie/${movieId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          if (response.status === 401) {
            navigate('/login');
            return;
          }
          throw new Error('Movie not found');
        }
        const data = await response.json();
        setMovie(data.movie);
        setLoadingMovie(false);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMovie();
  }, [movieId, navigate]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`https://movieappapi-6awg.onrender.com/movies/getComments/${movieId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();

      const commentsToShow = data.comments.map(comment => ({
        text: comment.comment
      }));
      setComments(commentsToShow || []);
      setLoadingComments(false);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCommentChange = e => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async e => {
    e.preventDefault();
    try {
      const response = await fetch(`https://movieappapi-6awg.onrender.com/movies/addComment/${movieId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ comment })
      });
      if (!response.ok) {
        throw new Error('Failed to add comment');
      }
      const data = await response.json();

      if (data.updatedMovie && data.updatedMovie.comments) {
        const commentsToShow = data.updatedMovie.comments.map(comment => ({
          text: comment.comment
        }));
        setComments(commentsToShow);

        // Show Bootstrap Alert for success
        setShowAlert(true);

        fetchComments();
      } else {
        console.error('Updated comments missing in response:', data);
      }

      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [movieId]);

  if (!user.id) {
    navigate('/login');
    return null;
  }

  if (loadingMovie || loadingComments) {
    return <Container className="mt-5"><p>Loading...</p></Container>;
  }

  if (error) {
    return <Container className="mt-5"><p>{error}</p></Container>;
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <Card.Title className='text-center'>{movie.title}</Card.Title>
              <Card.Subtitle>Director:</Card.Subtitle>
              <Card.Text>{movie.director}</Card.Text>
              <Card.Subtitle>Year:</Card.Subtitle>
              <Card.Text>{movie.year}</Card.Text>
              <Card.Subtitle>Description:</Card.Subtitle>
              <Card.Text>{movie.description}</Card.Text>
              <Card.Subtitle className='pb-2'>Comments:</Card.Subtitle>
              {comments !== null && comments.length > 0 ? (
                <ul className="list-unstyled">
                  {comments.map((comment, index) => (
                    <li key={index} className="mb-2">
                      <FaUser style={{ marginRight: '5px' }} />
                      {comment.text}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No comments yet.</p>
              )}

              <Form onSubmit={handleSubmitComment} className="mt-3">
                <Form.Group controlId="comment">
                  <Form.Label>Add Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={comment}
                    onChange={handleCommentChange}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className='mt-3'>
                  Add Comment
                </Button>
              </Form>

              <Alert variant="success" show={showAlert} onClose={() => setShowAlert(false)} dismissible className="mt-3">
                <Alert.Heading>Success!</Alert.Heading>
                <p>Comment added successfully!</p>
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieView;
