import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import EditMovie from './EditMovie';
import DeleteMovie from './DeleteMovie';

export default function AdminView({ moviesData, fetchData }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        setMovies(moviesData.map((movie, index) => ({
            ...movie,
            index: index + 1,
        })));
    }, [moviesData]);

    return (
        <>
            <h1 className="text-center my-4">Admin Dashboard</h1>
            <Table striped bordered hover responsive>
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
    );
}
