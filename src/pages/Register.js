import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import RegisterImage from '../images/register.png';

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [isActive, setIsActive] = useState(false);

  function registerUser(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        title: "Password Mismatch",
        icon: "error",
        text: "Passwords do not match."
      });
      return;
    }

    fetch('https://movieappapi-6awg.onrender.com/users/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password,
        mobileNo: mobileNo
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        if (data.message === "Registered Successfully") {
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setMobileNo('');

          Swal.fire({
            title: "Registration Successful",
            icon: "success",
            text: "Thank you for registering!"
          });
        } else if (data.error === "Password must be at least 8 characters") {
          Swal.fire({
            title: "Invalid Password",
            icon: "error",
            text: "Password must be at least 8 characters."
          });
        } else if (data.error === "Mobile number invalid") {
          Swal.fire({
            title: "Invalid Mobile Number",
            icon: "error",
            text: "Mobile number is invalid. It must be 11 digits."
          });
        } else if (data.error === "Email already exists") {
          Swal.fire({
            title: "Email Already Exists",
            icon: "error",
            text: "This email address is already registered."
          });
        }
      });
  }

  useEffect(() => {
    if (email !== "" && password !== "" && confirmPassword !== "" && mobileNo !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password, confirmPassword, mobileNo]);

  return (
    <Container fluid>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6} className="p-4" style={{ backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '2px solid #26254F' }}>
          <Form onSubmit={(e) => registerUser(e)}>
            <h1 className="my-5 text-center">Register</h1>
            <Form.Group className="mb-3">
              <strong style={{ color: 'black', display: 'block', marginBottom: '0.5rem' }}>Email:</strong>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <strong style={{ color: 'black', display: 'block', marginBottom: '0.5rem' }}>Mobile Number:</strong>
              <Form.Control
                type="text"
                placeholder="Enter Mobile Number"
                required
                value={mobileNo}
                onChange={e => setMobileNo(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <strong style={{ color: 'black', display: 'block', marginBottom: '0.5rem' }}>Password:</strong>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <strong style={{ color: 'black', display: 'block', marginBottom: '0.5rem' }}>Confirm Password:</strong>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="warning" type="submit" disabled={!isActive} className='mt-3' style={{ backgroundColor: '#FFA81F', border: 'none' }}>Submit</Button>
          </Form>
        </Col>
        <Col xs={12} md={6} className="p-0">
          <>
            <img src={RegisterImage} alt="Register" className="img-fluid" />
          </>
        </Col>
      </Row>
    </Container>
  );
}
