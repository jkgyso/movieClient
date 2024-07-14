import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import UserContext from '../UserContext';
import '../App.css';

export default function AppNavbar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/" className="navbar-brand-custom">
          Reel Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" exact className="nav-link-custom">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/movies/getMovies" exact className="nav-link-custom">
              Movies
            </Nav.Link>
            {user.id !== null ? (
              <Nav.Link as={NavLink} to="/logout" exact className="nav-link-custom">
                Logout
              </Nav.Link>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" exact className="nav-link-custom">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register" exact className="nav-link-custom">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
