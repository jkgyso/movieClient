import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import MovieCard from './MovieCard';

const UserView = ({ moviesData }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (moviesData) {
      setMovies(moviesData);
    }
  }, [moviesData]);

  return (
    <div className="container">
      <Row>
        <Col md={12}>
          <h1 className="text-center mt-3">Explore Movies</h1>
        </Col>
      </Row>

      {/* Movies Section */}
      <Row className="mt-4">
        <Col xs={12}>
          <Row>
            {movies.length > 0 ? (
              movies.map(movie => (
                <Col key={movie._id} xs={12} md={6} className="mb-4">
                  <div style={{ height: '100%' }}> {/* Ensures uniform height for all cards */}
                    <MovieCard movieProp={movie} style={{ height: '100%' }} />
                  </div>
                </Col>
              ))
            ) : (
              <Col xs={12} className="text-center mt-4">No movies found.</Col>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default UserView;
