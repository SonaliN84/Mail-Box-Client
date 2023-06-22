import { useSelector } from 'react-redux';
import './ReceivedEmails.css';
import ShowEmail from './ShowEmail';
const ReceivedEmails=()=>{
  const receivedEmailData=useSelector(state=>state.emailData.receivedEmails)
  return (
 <div className='receivedemail' >
   {console.log("received",receivedEmailData)}
  
   {receivedEmailData.map((email)=>(
    <ShowEmail id={email._id} from={email.from} subject={email.subject} emaildata={email.emaildata} read={email.read} date={email.date}/>
   ))}
  
  </div>


  );
}
export default ReceivedEmails;