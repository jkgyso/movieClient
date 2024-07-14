import { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Login() {
    const { user, setUser } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [redirectToMovies, setRedirectToMovies] = useState(false);

    function authenticate(e) {
        e.preventDefault();
        fetch('https://movieappapi-6awg.onrender.com/users/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.access) {
                localStorage.setItem('token', data.access);
                retrieveUserDetails(data.access).then(() => {
                    Swal.fire({
                        title: "Login Successful",
                        icon: "success",
                        text: "Check Out our Movies!"
                    }).then(() => {
                        setRedirectToMovies(true);
                    });
                });
            } else {
                Swal.fire({
                    title: "Authentication Failed",
                    icon: "error",
                    text: data.error || "An error occurred. Please try again."
                });
            }
        })
        .catch(error => {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "An error occurred while trying to log in. Please try again."
            });
        });

        setEmail('');
        setPassword('');
    }

    const retrieveUserDetails = (token) => {
        return fetch('https://movieappapi-6awg.onrender.com/users/details', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setUser({
                id: data.user._id,
                isAdmin: data.user.isAdmin
            });
        });
    };

    useEffect(() => {
        setIsActive(email !== "" && password !== "");
    }, [email, password]);

    if (redirectToMovies || user.id) {
        return <Navigate to="/movies/getMovies" />;
    }

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col xs={12} md={8} lg={6} className="login-box p-4" style={{ backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '2px solid #26254F' }}>
                    <Form onSubmit={(e) => authenticate(e)}>
                        <h1 className="text-center mb-4">Login</h1>
                        <Form.Group controlId="userEmail" className="mb-3">
                            <Form.Label><strong>Email address</strong></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="password" className="mb-3">
                            <Form.Label><strong>Password</strong></Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <div className="d-grid gap-2 mb-3">
                            <Button variant="primary" type="submit" disabled={!isActive} style={{ backgroundColor: '#FFA81F', borderColor: '#FFA81F', color: 'black', width: '100%' }}><strong>
                                Submit</strong>
                            </Button>
                        </div>
                    </Form>
                    <div className="text-center mt-3">
                        <p>
                            Don't have an account? <Link to="/register" style={{ color: '#FFA81F' }}>Register here</Link>
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
