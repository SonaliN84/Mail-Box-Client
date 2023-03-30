import { Fragment } from "react";
import './User.css'
import ReceivedEmails from "./Email/ReceivedEmails";
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const User =()=>{
 
    return (
        <Fragment>
         <ReceivedEmails/>
      
       </Fragment>
    )
}
export default User;