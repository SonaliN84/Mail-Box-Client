import { useSelector } from "react-redux";
import "./SentEmail.css";
import ShowSentEmail from "./ShowSentEmail";
import { Fragment } from "react";
const SentEmail = () => {
  const sentEmailData = useSelector((state) => state.emailData.sentEmails);
  console.log("sentemails", sentEmailData);
  return (
    <div className="sentemail">
      {sentEmailData.length == 0 && (
        <div style={{ textAlign: "center", fontWeight: "bold" }}>
          No Email found !!
        </div>
      )}
      {sentEmailData.length > 0 &&
        sentEmailData.map((email) => (
          <ShowSentEmail
            id={email._id}
            to={email.to}
            subject={email.subject}
            emaildata={email.emaildata}
            date={email.date}
            read={email.read}
          />
        ))}
    </div>
  );
};
export default SentEmail;
