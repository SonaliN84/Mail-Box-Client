import './ShowUserFullEmail.css';
import { CloseButton } from 'react-bootstrap';
import {Link} from 'react-router-dom';
const ShowUserFullEmail=(props)=>{
return (
    <div className="showuserfullemail">
    <Link to='/Users'><CloseButton style={{float:"right"}} className='mx-2 my-2'/></Link>
     <div className='my-2 mx-4 border-bottom p-2'>
        <h6>From:</h6>{props.from}
     </div>
     <div className='my-2 mx-4 border-bottom p-2'>
     <h6>Subject:</h6>{props.subject}
     </div>
     <div className='my-2 mx-4 p-2' dangerouslySetInnerHTML={{__html:props.emaildata}}/>
     </div>
);
}
export default ShowUserFullEmail;