import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function EditMovie({ movie, fetchData }) {
    const [title, setTitle] = useState(movie.title);
    const [director, setDirector] = useState(movie.director);
    const [year, setYear] = useState(movie.year);
    const [description, setDescription] = useState(movie.description);
    const [genre, setGenre] = useState(movie.genre);

    const [showEdit, setShowEdit] = useState(false);

    // Update state when movie prop changes
    useEffect(() => {
        setTitle(movie.title);
        setDirector(movie.director);
        setYear(movie.year);
        setDescription(movie.description);
        setGenre(movie.genre);
    }, [movie]);

    const openEdit = () => setShowEdit(true);
    const closeEdit = () => setShowEdit(false);

    const editMovie = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://movieappapi-6awg.onrender.com/movies/updateMovie/${movie._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    title,
                    director,
                    year,
                    description,
                    genre,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update movie');
            }

            const data = await response.json();

            if (data.message === 'Movie updated successfully') {
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Movie Successfully Updated',
                });

                // Update local state
                fetchData(); // Update moviesData in AdminView
                closeEdit();
            } else {
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Failed to update movie',
                });
            }
        } catch (error) {
            console.error('Error updating movie:', error);
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: 'Failed to update movie',
            });
        }
    };

    return (
        <>
            <Button
                size="sm"
                onClick={openEdit}
                style={{ backgroundColor: '#FFA81F', color: 'black', marginBottom: '1rem' }}
            >
                Edit
            </Button>

            <Modal show={showEdit} onHide={closeEdit} dialogClassName="modal-90w">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={editMovie}>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="director">
                            <Form.Label>Director</Form.Label>
                            <Form.Control
                                type="text"
                                value={director}
                                onChange={(e) => setDirector(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="year">
                            <Form.Label>Year</Form.Label>
                            <Form.Control
                                type="number"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="genre">
                            <Form.Label>Genre</Form.Label>
                            <Form.Control
                                type="text"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button type="submit" className='mt-3' style={{ backgroundColor: '#FFA81F', color: 'black' }}>
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeEdit}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
