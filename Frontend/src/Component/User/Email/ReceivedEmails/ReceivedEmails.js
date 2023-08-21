import { useSelector, useDispatch } from "react-redux";
import "./ReceivedEmails.css";
import ShowEmail from "./ShowEmail";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { emailDataActions } from "../../../../Store/emaildata-slice";
import axios from "axios";
const ReceivedEmails = () => {
  const dispatch = useDispatch();
  let limit = useSelector((state) => state.emailData.limit);
  const receivedEmailData = useSelector(
    (state) => state.emailData.receivedEmails
  );
  const authIsLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const authToken = useSelector((state) => state.auth.token);
  let activePage = useSelector((state) => state.emailData.activePage);
  let total = useSelector((state) => state.emailData.total);

  useEffect(() => {
    if (
      (receivedEmailData.length < total || activePage == 1) &&
      authIsLoggedIn == true
    ) {
      fetchReceivedEmails();
    }
  }, []);
  const fetchReceivedEmails = () => {
    axios
      .get("http://localhost:3000/email/received-emails", {
        headers: { Authorization: authToken },
        params: {
          page: activePage,
          size: limit,
        },
      })
      .then((response) => {
        dispatch(emailDataActions.setActivePage(activePage));
        console.log(response.data.total);
        dispatch(emailDataActions.setTotal(response.data.total));
        console.log("RECEIVED", response.data.receivedEmails);
        let emailData = response.data.receivedEmails.reverse();
        let newReceivedEmailData = [...receivedEmailData, ...emailData];
        dispatch(emailDataActions.setReceivedEmails(newReceivedEmailData));
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  };

  return (
    <InfiniteScroll
      dataLength={receivedEmailData.length}
      next={fetchReceivedEmails}
      hasMore={receivedEmailData.length < total}
      loader={<p style={{ textAlign: "center" }}>Loading...</p>}
    >
      <div className="receivedemail">
        {console.log("received", receivedEmailData)}
        {receivedEmailData.length == 0 && (
          <div style={{ textAlign: "center", fontWeight: "bold" }}>
            No Email found !!
          </div>
        )}
        {receivedEmailData.length > 0 &&
          receivedEmailData.map((email) => (
            <ShowEmail
              id={email._id}
              from={email.from}
              subject={email.subject}
              emaildata={email.emaildata}
              read={email.read}
              date={email.date}
            />
          ))}
      </div>
    </InfiniteScroll>
  );
};
export default ReceivedEmails;
