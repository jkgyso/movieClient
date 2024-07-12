import React, { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

const AddMovie = () => {
  const { user } = useContext(UserContext);

  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');

  const [isActive, setIsActive] = useState(false);

  
  useEffect(() => {
    setIsActive(title !== '' && director !== '' && year !== '' && description !== '' && genre !== '');
  }, [title, director, year, description, genre]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://movieappapi-6awg.onrender.com/movies/addMovie`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          director,
          year,
          description,
          genre
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add movie');
      }

      const data = await response.json();

      Swal.fire({
        icon: 'success',
        title: 'Movie Added',
        text: 'The movie has been added successfully.'
      });

      
      setTitle('');
      setDirector('');
      setYear('');
      setDescription('');
      setGenre('');

    } catch (error) {
      console.error('Error adding movie:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Add Movie',
        text: 'An error occurred while adding the movie. Please try again.'
      });
    }
  };

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1 className="my-5 text-center">Add Movie</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control type="text" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Director:</Form.Label>
          <Form.Control type="text" placeholder="Enter Director" value={director} onChange={(e) => setDirector(e.target.value)} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Year:</Form.Label>
          <Form.Control type="number" placeholder="Enter Year" value={year} onChange={(e) => setYear(e.target.value)} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description:</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Genre:</Form.Label>
          <Form.Control type="text" placeholder="Enter Genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!isActive} className='mt-3'>
          Add Movie
        </Button>
      </Form>
    </>
  );
};

export default AddMovie;
