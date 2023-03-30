import {Row,Col} from 'react-bootstrap'
import './ShowEmail.css'
const ShowEmail=(props)=>{
    console.log("from",props.from)
    const data=props.emaildata;
{/* <div className='showuser'>
 <div style={{width:"300px"}} className="mx-4" >{props.from}</div>
 <div style={{width:"300px",overflow:"hidden"}}>{props.subject}</div>
 <div dangerouslySetInnerHTML={{__html:data}} style={{overflow:"hidden"}} className='flex-grow-1'></div>

</div> */}
return (

<div className="container">
  <div class="row showuser">
    <div class="col" style={{overflow:"hidden",fontWeight:"bold"}}>
    {props.from}
    </div>
    <div class="col" style={{overflow:"hidden",fontStyle:"italic"}}>
    {props.subject}
    </div>
    <div class="col"
    dangerouslySetInnerHTML={{__html:data}} style={{overflow:"hidden"}}/>
   
  </div>
</div>
)
}
export default ShowEmail;