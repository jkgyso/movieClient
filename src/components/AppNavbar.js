import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavbar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar expand="lg" bg="light">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/">Movie Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" exact>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/movies/getMovies" exact>Movies</Nav.Link>
            {user.id !== null ? (
              <>
                {user.isAdmin && (
                  <Nav.Link as={NavLink} to="/movies/addMovie">Add Movies</Nav.Link>
                )}
                <Nav.Link as={NavLink} to="/logout" exact>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" exact>Login</Nav.Link>
                <Nav.Link as={NavLink} to="/register" exact>Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
