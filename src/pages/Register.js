import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Register() {
  const { user } = useContext(UserContext);

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
    <Form onSubmit={(e) => registerUser(e)}>
      <h1 className="my-5 text-center">Register</h1>
      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter Email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Mobile Number:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Mobile Number"
          required
          value={mobileNo}
          onChange={e => setMobileNo(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter Password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Confirm Password:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!isActive} className='mt-3'>Submit</Button>
    </Form>
  );
}