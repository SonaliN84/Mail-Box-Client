import { Link } from "react-router-dom";
import "./ShowEmail.css";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { emailDataActions } from "../../../../Store/emaildata-slice";
import axios from "axios";
const ShowEmail = (props) => {
  console.log("id", props.id);
  const data = props.emaildata;
  const dispatch = useDispatch();
  const newEmail = useSelector((state) => state.auth.userEmail);
  const authToken = useSelector((State) => State.auth.token);
  const receivedEmails = useSelector((state) => state.emailData.receivedEmails);
  console.log("read", props.read);
  const readHandler = () => {
    if (props.read == false) {
      axios
        .put(
          `http://localhost:3000/email/read-email/${props.id}`,
          { read: true },
          {
            headers: { Authorization: authToken },
          }
        )
        .then((response) => {
          console.log(response);

          dispatch(emailDataActions.setReadEmails(props.id));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="d-flex" style={{ maxWidth: "100%" }}>
      <Link
        to={`/Users/${props.id}`}
        style={{ textDecoration: "none", color: "black" }}
        className="flex-grow-1"
      >
        <div class="row showuser" onClick={readHandler}>
          <div class="col" style={{ overflow: "hidden", fontWeight: "bold" }}>
            {props.read === false ? (
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  background: "blue",
                  border: "1px solid blue",
                  borderRadius: "100px",
                  float: "left",
                }}
                className="me-2 my-2"
              ></div>
            ) : (
              ""
            )}

            {props.from}
          </div>
          <div
            class="col"
            style={{
              overflow: "hidden",
              fontStyle: "italic",
              textAlign: "right",
            }}
          >
            {props.date}
          </div>
          <div
            class="row"
            style={{ overflow: "hidden", wordBreak: "break-word" }}
            className="mx-3 my-2"
          >
            Subject:{props.subject}
          </div>
        </div>
      </Link>
      <div>
        <Button
          size="sm"
          style={{ background: "white", borderColor: "white" }}
          className="mt-1"
          onClick={deleteEmailHandler}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1345/1345874.png"
            style={{
              width: "20px",
              height: "20px",
              background: "white",
              borderRadius: "7px",
            }}
          />
        </Button>
      </div>
    </div>
  );
};
export default ShowEmail;
