import { Link } from 'react-router-dom';
import './ShowEmail.css';
import { useDispatch,useSelector } from 'react-redux';
import {emailDataActions} from '../../../Store/emaildata-slice';
import axios from 'axios';
const ShowEmail=(props)=>{
    console.log("id",props.id)
    const data=props.emaildata;
    const dispatch=useDispatch();
    const newEmail=useSelector(state=>state.auth.userEmail)
console.log("read",props.read)
const readHandler=()=>{
    let emailDataReceived={
        
        from:props.from,
        subject:props.subject,
        emaildata:props.emaildata,
        read:true
       }
       
       const newEmaildata=JSON.stringify(emailDataReceived)
  axios.put(`https://mail-box-client-18272-default-rtdb.firebaseio.com/received${newEmail}/${props.id}.json`,newEmaildata)
  .then((res)=>{
    axios.get(`https://mail-box-client-18272-default-rtdb.firebaseio.com/received${newEmail}.json`)
            .then((response)=>{
              let array=[];
              Object.keys(response.data).forEach((key)=>{
                  let obj={
                      id:key,
                      read:response.data[key].read,
                      from:response.data[key].from,
                      subject:response.data[key].subject,
                      emaildata:response.data[key].emaildata
                  }
                  array.push(obj)

                })
              dispatch(emailDataActions.setReceivedEmails(array))
            })
  })  
}
return (

<div className="container">
<Link to={`/Users/${props.id}`} style={{textDecoration:"none",color:"black"}}>
  <div class="row showuser" onClick={readHandler} >
 
    <div class="col" style={{overflow:"hidden",fontWeight:"bold"}}>
    {props.read===false ? <div style={{width:"7px",height:"7px",background:"blue",border:"1px solid blue",borderRadius:"100px",float:"left"}} className='mx-2 my-2'></div>:""}
    {props.from}
    </div>
    <div class="col" style={{overflow:"hidden",fontStyle:"italic"}}>
    {props.subject}
    </div>
    <div class="col"
    dangerouslySetInnerHTML={{__html:data}} style={{overflow:"hidden"}}/>
   
  </div>
  </Link>
</div>
)
}
export default ShowEmail;