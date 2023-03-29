import {Form,Button} from 'react-bootstrap';
import './AuthForm.css';
import { useRef} from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { authActions } from '../../Store/auth-slice';

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