import './ShowUserFullSentEmail.css';
import { CloseButton } from 'react-bootstrap';
import {Link} from 'react-router-dom';

const ShowUserFullSentEmail=(props)=>{
    return (
        <div className="showuserfullsentemail">
        <Link to='/SentEmails'><CloseButton style={{float:"right"}} className='mx-2 my-2'/></Link>
         <div style={{float:"right"}} className='my-2 mx-2'>{props.date}</div>
         <div className='my-2 mx-4 border-bottom p-2'>
            <h6>To:</h6>{props.to}
         </div>
         <div className='my-2 mx-4 border-bottom p-2'>
         <h6>Subject:</h6>{props.subject}
         </div>
         <div className='my-2 mx-4 p-2' style={{wordBreak:"break-word"}} dangerouslySetInnerHTML={{__html:props.emaildata}}/>
         </div>
    );
}
export default ShowUserFullSentEmail;