import { useSelector } from 'react-redux';
import './ReceivedEmails.css';
import ShowEmail from './ShowEmail';
const ReceivedEmails=()=>{
  const receivedEmailData=useSelector(state=>state.emailData.receivedEmails)
  return (
 <div className='receivedemail' >
   {console.log("recived",receivedEmailData)}
  
   {receivedEmailData.map((email)=>(
    <ShowEmail from={email.from} subject={email.subject} emaildata={email.emaildata}/>
   ))}
  
  </div>


  );
}
export default ReceivedEmails;