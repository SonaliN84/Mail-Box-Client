import "./CreateEmail.css";
import JoditEditor from "jodit-react";
import { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import moment from "moment";
const CreateEmail = () => {
  const editor = useRef(null);
  const inputToRef = useRef("");
  const inputSubjectRef = useRef("");
  const authUserEmail = useSelector((state) => state.auth.userEmail);
  const authToken = useSelector((state) => state.auth.token);
  console.log(authUserEmail);
  const [content, setContent] = useState("");
  const changeDataHandler = () => {
    setContent(editor.current.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const enteredTo = inputToRef.current.value;
    const enteredSubject = inputSubjectRef.current.value;
    const enteredEmailData = editor.current.value;
    console.log(enteredTo);
    console.log(enteredSubject);
    console.log(enteredEmailData);

    let emailData = {
      from: authUserEmail,
      to: enteredTo,
      subject: enteredSubject,
      emaildata: enteredEmailData,
      read: false,
      date: moment().format("LLL"),
    };

    axios
      .post("http://localhost:3000/email/send-email", emailData, {
        headers: { Authorization: authToken },
      })
      .then((response) => {
        console.log(response);
        alert(response.data.message);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.err);
      });
  };
  return (
    <div className="emailInput">
      <form onSubmit={formSubmitHandler}>
        <input
          type="text"
          className="input"
          placeholder="To"
          ref={inputToRef}
        />
        <input
          type="text"
          className="input"
          placeholder="Subject"
          ref={inputSubjectRef}
        />
        <JoditEditor
          className="editor"
          ref={editor}
          value={content}
          // onChange={changeDataHandler}
          onChange={(newContent) => setContent(newContent)}
        />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{ backgroundColor: "#C85C8E", border: "1px solid #C85C8E" }}
            className="my-2 mx-2"
            type="submit"
          >
            Send
          </Button>
          <Link to="/Users">
            <Button
              style={{
                backgroundColor: "#C85C8E",
                border: "1px solid #C85C8E",
              }}
              className="my-2"
            >
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};
export default CreateEmail;
