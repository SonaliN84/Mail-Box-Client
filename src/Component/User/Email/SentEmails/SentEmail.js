import { useSelector } from 'react-redux';
import './SentEmail.css'
import ShowSentEmail from './ShowSentEmail';
const SentEmail=()=>{

    const sentEmailData=useSelector(state=>state.emailData.sentEmails)
    console.log("sentemails",sentEmailData)
    return (
   <div className='sentemail' >
     
    
     {sentEmailData.map((email)=>(
      <ShowSentEmail id={email.id} to={email.to} subject={email.subject} emaildata={email.emaildata} />
     ))}
    
    </div>
  
  
    )
 
}
export default SentEmail;