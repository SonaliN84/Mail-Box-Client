import {Switch,Route} from 'react-router-dom';
import './App.css';
import RootLayout from './Pages/RootLayout';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Users from './Pages/Users';
import ComposeEmail from './Pages/ComposeEmail';
import ShowFullEmail from './Pages/ShowFullEmail';
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {emailDataActions} from './Store/emaildata-slice';
import SentEmails from './Pages/SentEmails';
import ShowFullSentEmail from './Pages/ShowFullSentEmail';
import axios from 'axios';
function App() {
 const authIsLoggedIn=useSelector(state=>state.auth.isLoggedIn);
  const dispatch=useDispatch();
  useEffect(()=>{
   if(authIsLoggedIn)
   {
    const email=localStorage.getItem('email');
    axios.get(`https://mail-box-client-18272-default-rtdb.firebaseio.com/received${email}.json`)
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
    axios.get(`https://mail-box-client-18272-default-rtdb.firebaseio.com/sent${email}.json`)
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
   }
  },[authIsLoggedIn])


  return (
    <RootLayout>
      <Switch>
        <Route path='/Signup'>
         <Signup/>
        </Route>
        <Route path='/Login'>
         <Login/>
        </Route>
        <Route path='/Users' exact>
         <Users/>
        </Route>
        <Route path='/Users/:emailId'>
         <ShowFullEmail/>
        </Route>
        <Route path='/ComposeEmail'>
         <ComposeEmail/>
        </Route>
        <Route path='/SentEmails' exact>
         <SentEmails/>
        </Route>
        <Route path='/SentEmails/:emailId'>
         <ShowFullSentEmail/>
        </Route>
      </Switch>
    </RootLayout>
  );
}

export default App;
