import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import MovieList from './pages/Movies';
import MovieView from './pages/MovieView';
import AddMovie from './pages/AddMovie';
import Error from './pages/Error';
import { UserProvider } from './UserContext';

function App() {
  const [user, setUser] = useState({ id: null, isAdmin: null });

  const unsetUser = () => {
    localStorage.clear();
  }


  useEffect(() => {
    fetch(`https://movieappapi-6awg.onrender.com/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.user) {
          setUser({
            id: data.user._id,
            isAdmin: data.user.isAdmin
          });
        } else {
          setUser({ id: null, isAdmin: null });
        }
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
        setUser({ id: null, isAdmin: null });
      });
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar /> {/* Ensure this is correctly imported */}
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/movies/getMovies" element={<MovieList />} />
            <Route exact="true" path="/movies/getMovie/:movieId" element={<MovieView />} />
            <Route path="/movies/addMovie" element={<AddMovie />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;