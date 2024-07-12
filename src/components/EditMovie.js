import { useState, useEffect } from 'react';
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

    const editMovie = (e) => {
        e.preventDefault();

        fetch(`https://movieappapi-6awg.onrender.com/movies/updateMovie/${movie._id}`, {
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
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.message === 'Movie updated successfully') {
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Movie Successfully Updated',
                });

                // Update local state
                setTitle(title);
                setDirector(director);
                setYear(year);
                setDescription(description);
                setGenre(genre);

                closeEdit();
                fetchData(); // Update moviesData in AdminView
            } else {
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Failed to update movie',
                });

                closeEdit();
            }
        })
        .catch((error) => {
            console.error('Error updating movie:', error);
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: 'Failed to update movie',
            });
            closeEdit();
        });
    };

    return (
        <>
            <Button variant="primary" size="sm" onClick={openEdit}>
                Edit
            </Button>

            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={editMovie}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Movie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeEdit}>
                            Close
                        </Button>
                        <Button variant="success" type="submit">
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}
