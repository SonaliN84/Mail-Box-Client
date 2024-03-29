import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import RootLayout from "./Pages/RootLayout";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Users from "./Pages/Users";
import ComposeEmail from "./Pages/ComposeEmail";
import ShowFullEmail from "./Pages/ShowFullEmail";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { emailDataActions } from "./Store/emaildata-slice";
import SentEmails from "./Pages/SentEmails";
import ShowFullSentEmail from "./Pages/ShowFullSentEmail";
import axios from "axios";
import openSocket from "socket.io-client";
function App() {
  const authIsLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const authToken = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  let sentEmails = useSelector((state) => state.emailData.sentEmails);
  let receivedEmails = useSelector((state) => state.emailData.receivedEmails);
  let total = useSelector((state) => state.emailData.total);
  let limit = useSelector((state) => state.emailData.limit);

  const dispatch = useDispatch();
  console.log(userId);
  socket.on("read-email", (data) => {
    console.log("emailId", data.emailId);
    dispatch(emailDataActions.setSentReadEmail(data.emailId));
  });
  socket.on("new-received-email", (data) => {
    receivedEmails = [data.email, ...receivedEmails];
    dispatch(emailDataActions.setReceivedEmails(receivedEmails));
    dispatch(emailDataActions.setTotal(total + 1));
    dispatch(emailDataActions.setLimit(limit));
  });
  socket.on("new-sent-email", (data) => {
    console.log("sent new email data>>>", data);
    sentEmails = [...sentEmails, data.email];
    dispatch(emailDataActions.setSentEmails(sentEmails));
  });

  useEffect(() => {
    if (authIsLoggedIn) {
      socket.emit("joinroom", userId);

      axios
        .get("http://localhost:3000/email/sent-emails", {
          headers: { Authorization: authToken },
        })
        .then((response) => {
          console.log("SENT", response.data.sentEmails);
          dispatch(emailDataActions.setSentEmails(response.data.sentEmails));
        })
        .catch((err) => {
          console.log(err);
          alert("Something went wrong");
        });
    }
  }, [authIsLoggedIn]);

  return (
    <RootLayout>
      <Switch>
        {authIsLoggedIn && (
          <Route path="/" exact>
            <Redirect to="/Users" />
          </Route>
        )}
        {!authIsLoggedIn && (
          <Route path="/" exact>
            <Redirect to="/Login" />
          </Route>
        )}
        <Route path="/Signup">
          <Signup />
        </Route>
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/Users" exact>
          <Users />
        </Route>
        <Route path="/Users/:emailId">
          <ShowFullEmail />
        </Route>
        <Route path="/ComposeEmail">
          <ComposeEmail />
        </Route>
        <Route path="/SentEmails" exact>
          <SentEmails />
        </Route>
        <Route path="/SentEmails/:emailId">
          <ShowFullSentEmail />
        </Route>
      </Switch>
    </RootLayout>
  );
}
export const socket = openSocket("http://localhost:3000");
export default App;
