import { Form, Button } from "react-bootstrap";
import "./AuthForm.css";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const SignUpForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordRef.current.value;
    if (enteredPassword === enteredConfirmPassword) {
      const user = {
        email: enteredEmail,
        password: enteredPassword,
      };
      axios
        .post("http://localhost:3000/user/signup", user)
        .then((response) => {
          console.log(response);
          alert("you are succesfully signed up");
          history.replace("/Login");
        })
        .catch((err) => {
          alert(err.response.data.err);
        });
    } else {
      alert("Confirm password must be same as Password");
    }
  };

  return (
    <Form className="Auth-form border d-grid" onSubmit={submitHandler}>
      <h3 style={{ textAlign: "center" }}>Sign Up</h3>
      <Form.Group className="mb-2" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          required
          ref={emailInputRef}
        />
      </Form.Group>

      <Form.Group className="mb-2" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          required
          ref={passwordInputRef}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          required
          ref={confirmPasswordRef}
        />
      </Form.Group>

      <Button
        style={{ background: "#C85C8E", border: "1px solid #C85C8E" }}
        type="submit"
      >
        Submit
      </Button>
    </Form>
  );
};

export default SignUpForm;
