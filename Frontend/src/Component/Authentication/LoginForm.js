import { Form, Button } from "react-bootstrap";
import "./AuthForm.css";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { socket } from "../../App";

import { useDispatch } from "react-redux";
import { authActions } from "../../Store/auth-slice";
import axios from "axios";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const user = {
      email: enteredEmail,
      password: enteredPassword,
    };
    axios
      .post("http://localhost:3000/user/login", user)
      .then((response) => {
        console.log(response);
        dispatch(
          authActions.login({
            token: response.data.token,
            email: response.data.email,
            userId: response.data.userId,
          })
        );

        socket.emit("joinroom", response.data.userId);
        history.replace("/Users");
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.err);
      });
  };

  return (
    <Form className="Auth-form border d-grid" onSubmit={submitHandler}>
      <h3 style={{ textAlign: "center" }}>Login</h3>
      <Form.Group className="mb-2" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          required
          ref={emailInputRef}
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          required
          ref={passwordInputRef}
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
export default LoginForm;
