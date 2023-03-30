import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ShowUserFullSentEmail from "../Component/User/Email/SentEmails/ShowUserFullSentEmail";
const ShowFullSentEmail=()=>{

    const emailData=useSelector(state=>state.emailData.sentEmails)
    const params = useParams();
    const email=emailData.find((email)=>email.id===params.emailId)

    return(
  
            <ShowUserFullSentEmail to={email.to} subject={email.subject} emaildata={email.emaildata}/> 
         
          
    )
}
export default ShowFullSentEmail;

