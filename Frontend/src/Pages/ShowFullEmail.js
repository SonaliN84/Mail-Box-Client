import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ShowUserFullEmail from "../Component/User/Email/ReceivedEmails/ShowUserFullEmail";
const ShowFullEmail = () => {
  const emailData = useSelector((state) => state.emailData.receivedEmails);
  const params = useParams();
  console.log(params);
  const email = emailData.find((email) => email._id === params.emailId);
  console.log("main", email);
  return (
    <ShowUserFullEmail
      from={email.from}
      subject={email.subject}
      emaildata={email.emaildata}
      date={email.date}
    />
  );
};
export default ShowFullEmail;
