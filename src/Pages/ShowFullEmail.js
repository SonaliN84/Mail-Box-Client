import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ShowUserFullEmail from '../Component/User/Email/ShowUserFullEmail'
const ShowFullEmail=()=>{
    const emailData=useSelector(state=>state.emailData.receivedEmails)
    const params = useParams();
  console.log(params)
  const email=emailData.find((email)=>email.id===params.emailId)
  console.log("main",email)
 return(
   <ShowUserFullEmail from={email.from} subject={email.subject} emaildata={email.emaildata}/> 

 )
}
export default ShowFullEmail;