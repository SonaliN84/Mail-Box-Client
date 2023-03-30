import {Form,Button} from 'react-bootstrap';
import './AuthForm.css';
import { useRef} from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../Store/auth-slice';
import axios from 'axios';
import {emailDataActions} from '../../Store/emaildata-slice'
const LoginForm=()=>{
    const dispatch=useDispatch();
    const history=useHistory();
    const emailInputRef=useRef();
    const passwordInputRef=useRef();
    //  const authCtx=useContext(AuthContext)

    const submitHandler=(event)=>{
      event.preventDefault();

      const enteredEmail=emailInputRef.current.value;
      const enteredPassword=passwordInputRef.current.value;
     
      
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAVbpTtBs1KE9wlXJoOhNny0ZNdGYBwIEY';
        fetch(url,{
            method:'POST',
            body:JSON.stringify({
                email:enteredEmail,
                password:enteredPassword,
                returnSecureToken:true
              }),
              headers:{
                'Content-Type':'application/json'
              }
        })
        .then((response)=>{
            if(response.ok)
            {
                return response.json()
                
            }
            else{
                return response.json().then((data)=>{
                let errorMessage=data.error.message;

                throw new Error(errorMessage)
                })
            }
        })
        .then((data)=>{
          console.log("data login",data)
          console.log("login",data.idToken)
            // authCtx.login(data.idToken);
            const email=data.email;
            const newEmail=email.replace(/[^a-zA-z0-9 ]/g,'');

            // dispatch(authActions.login(data.idToken));

            dispatch(authActions.login({
              token:data.idToken,
              email:newEmail,
              "emailOriginal":email
            }));
            history.replace('/Users')

            console.log("user has been logged in")
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
            axios.get(`https://mail-box-client-18272-default-rtdb.firebaseio.com/sent${newEmail}.json`)
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
        .catch((err)=>{
            alert(err.message)
        })
      }
     
    


  return(
    <Form className='Auth-form border d-grid' onSubmit={submitHandler}>
    <h3 style={{textAlign:"center"}}>Login</h3>
     <Form.Group className="mb-2" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" required ref={emailInputRef}/>
    
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" required ref={passwordInputRef}/>
      </Form.Group>
      {/* <NavLink to='/Forgot_Password' className="mb-3" style={{textAlign:"center",textDecoration:"none",color:"#C85C8E"}}>Forgot password</NavLink> */}
      <Button style={{background:"#C85C8E",border:"1px solid #C85C8E"}} type="submit" >
        Submit
      </Button>
    
    

   
  </Form> 
  );
}
export default LoginForm;