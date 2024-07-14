import React, { useState, useEffect } from 'react';
import { Table, Row, Col, ListGroup } from 'react-bootstrap';
import EditMovie from './EditMovie';
import DeleteMovie from './DeleteMovie';
import AddMovie from './AddMovie'; // Import AddMovie component

export default function AdminView({ moviesData, fetchData }) {
    const [movies, setMovies] = useState([]);
    const [selectedSection, setSelectedSection] = useState('movies'); // State to track selected section

    useEffect(() => {
        setMovies(moviesData.map((movie, index) => ({
            ...movie,
            index: index + 1,
        })));
    }, [moviesData]);

    const handleSectionSelect = (section) => {
        setSelectedSection(section);
    };

    return (
        <>
            <Row className="flex-nowrap">
                {/* Sidebar */}
                <Col md={3} className="bg-light d-flex flex-column mt-5 m">
                    <>
                        <div className="p-3">
                            <h5>Movies Management</h5>
                        </div>
                        <ListGroup className="flex-grow-1">
                            <ListGroup.Item
                                action
                                active={selectedSection === 'movies'}
                                onClick={() => handleSectionSelect('movies')}
                                style={{
                                    backgroundColor: selectedSection === 'movies' ? '#26254F' : '',
                                    color: selectedSection === 'movies' ? 'white' : ''
                                }}
                                className="cursor-pointer"
                            >
                                Movies
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                active={selectedSection === 'addMovie'}
                                onClick={() => handleSectionSelect('addMovie')}
                                style={{
                                    backgroundColor: selectedSection === 'addMovie' ? '#26254F' : '',
                                    color: selectedSection === 'addMovie' ? 'white' : ''
                                }}
                                className="cursor-pointer"
                            >
                                Add Movies
                            </ListGroup.Item>
                        </ListGroup>
                    </>
                </Col>

                {/* Main Content */}
                <Col md={9}>
                    <>
                        {selectedSection === 'movies' && (
                            <>
                                <h1 className="text-center my-4">Welcome to our Movie Dashboard!</h1>
                                <Table hover responsive>
                                    <thead>
                                        <tr className="text-center">
                                            <th>#</th>
                                            <th>ID</th>
                                            <th>Title</th>
                                            <th>Director</th>
                                            <th>Year</th>
                                            <th>Genre</th>
                                            <th colSpan="2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {movies.map((movie) => (
                                            <tr key={movie._id}>
                                                <td>{movie.index}</td>
                                                <td>{movie._id}</td>
                                                <td>{movie.title}</td>
                                                <td>{movie.director}</td>
                                                <td>{movie.year}</td>
                                                <td>{movie.genre}</td>
                                                <td>
                                                    <EditMovie movie={movie} fetchData={fetchData} />
                                                </td>
                                                <td>
                                                    <DeleteMovie movieId={movie._id} fetchData={fetchData} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </>
                        )}
                        {selectedSection === 'addMovie' && (
                            <AddMovie />  // Render AddMovie component when 'Add Movies' is selected
                        )}
                    </>
                </Col>
            </Row>
        </>
    );
}
