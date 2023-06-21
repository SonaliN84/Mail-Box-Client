import './CreateEmail.css'
import JoditEditor from 'jodit-react';
import {useState,useRef} from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { emailDataActions } from '../../../../Store/emaildata-slice';

const CreateEmail=()=>{
    const dispatch=useDispatch();
    const editor=useRef(null)
    const inputToRef=useRef('')
    const inputSubjectRef=useRef('')
    const authUserEmailOriginal=useSelector(state=>state.auth.userEmailOriginal)
    const authUserEmail=useSelector(state=>state.auth.userEmail)
    
    console.log(authUserEmail)
    const [content,setContent]=useState('')
    const changeDataHandler=()=>{
 
     setContent(editor.current.value)
    }
   const formSubmitHandler=(event)=>{
   event.preventDefault();
   const enteredTo=inputToRef.current.value;
   const enteredSubject=inputSubjectRef.current.value;
   const enteredEmailData=editor.current.value;
  console.log(enteredTo)
  console.log(enteredSubject)
  console.log(enteredEmailData)

  let emailDataSent={
   to:enteredTo,
   subject:enteredSubject,
   emaildata:enteredEmailData
  }
  let emailDataReceived={
  
   from:authUserEmailOriginal,
   subject:enteredSubject,
   emaildata:enteredEmailData,
   read:false
  }
  
  let receiverEmail=enteredTo.replace(/[^a-zA-z0-9 ]/g,'');
  let newEmailDataSent=JSON.stringify(emailDataSent)
  let newEmailDataReceived=JSON.stringify(emailDataReceived)

  axios.post(`https://mail-box-client-18272-default-rtdb.firebaseio.com/sent${authUserEmail}.json`,newEmailDataSent)
  .then((res)=>{
   console.log(res)
   axios.get(`https://mail-box-client-18272-default-rtdb.firebaseio.com/sent${authUserEmail}.json`)
            .then((response)=>{
              let array=[];
              Object.keys(response.data).forEach((key)=>{
                  let obj={
                      id:key,
                      to:response.data[key].to,
                      subject:response.data[key].subject,
                      emaildata:response.data[key].emaildata
                  }
                  array.push(obj)
                })
              dispatch(emailDataActions.setSentEmails(array))
            })
  })
  axios.post(`https://mail-box-client-18272-default-rtdb.firebaseio.com/received${receiverEmail}.json`,newEmailDataReceived)
  .then((res)=>{
    alert("Email sent successfully")
   console.log("received email",res.data)
   inputToRef.current.value='';
   inputSubjectRef.current.value='';
   editor.current.value='';
  })

   }
    return(
 <div className="emailInput">
 <form onSubmit={formSubmitHandler} >
  <input type="text" className="input" placeholder='To' ref={inputToRef}/> 
  <input type="text" className="input" placeholder='Subject' ref={inputSubjectRef}/> 
  <JoditEditor 
           className='editor'
            ref={editor}
            value={content}
            // onChange={changeDataHandler}
            onChange={newContent=>setContent(newContent)}
    
      />
      
       <div style={{display:"flex",justifyContent:"center"}}>  
   <Button style={{backgroundColor:"#C85C8E",border:"1px solid #C85C8E"}}className='my-2 mx-2' type="submit">Send</Button>
   <Link to='/Users'><Button style={{backgroundColor:"#C85C8E",border:"1px solid #C85C8E"}}className='my-2'>Cancel</Button></Link>
 </div>
 </form>
 </div> )
}
export default CreateEmail;