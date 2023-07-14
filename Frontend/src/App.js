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
import openSocket from "socket.io-client";
function App() {
 const authIsLoggedIn=useSelector(state=>state.auth.isLoggedIn);
 const authToken=useSelector(state=>state.auth.token)
 const userId=useSelector(state=>state.auth.userId)
 let sentEmails=useSelector(state=>state.emailData.sentEmails)
 let receivedEmails=useSelector(state=>state.emailData.receivedEmails)
  const dispatch=useDispatch();
  console.log(userId)
  socket.on('read-email',(data)=>{
    console.log(">>>>>>>>>emailId",data.emailId)
    dispatch(emailDataActions.setSentReadEmail(data.emailId))
  })
  socket.on('new-received-email',(data)=>{
    receivedEmails=[...receivedEmails,data.email]
    dispatch(emailDataActions.setReceivedEmails(receivedEmails))
  })
  socket.on('new-sent-email',(data)=>{
    console.log("sent new email data>>>",data)
    sentEmails=[...sentEmails,data.email]
    dispatch(emailDataActions.setSentEmails(sentEmails))
  })

  useEffect(()=>{
   if(authIsLoggedIn)
   {
    socket.emit("joinroom",userId);
    axios.get('http://localhost:3000/email/received-emails',{
      headers: { Authorization: authToken },
    })
    .then((response)=>{
      console.log("RECEIVED",response.data.receivedEmails)
      dispatch(emailDataActions.setReceivedEmails(response.data.receivedEmails))
    })
    .catch(err=>{
      console.log(err);
      alert("Something went wrong")
    }
    )

    axios.get('http://localhost:3000/email/sent-emails',{
      headers: { Authorization: authToken },
    })
    .then((response)=>{
      console.log("SENT",response.data.sentEmails)
      dispatch(emailDataActions.setSentEmails(response.data.sentEmails))
    })
    .catch(err=>{
      console.log(err);
      alert("Something went wrong")
    }
    )
    // const email=localStorage.getItem('email');
    // axios.get(`https://mail-box-client-18272-default-rtdb.firebaseio.com/received${email}.json`)
    // .then((response)=>{
    //   let array=[];
    //   Object.keys(response.data).forEach((key)=>{
    //       let obj={
    //           id:key,
    //           read:response.data[key].read,
    //           from:response.data[key].from,
    //           subject:response.data[key].subject,
    //           emaildata:response.data[key].emaildata
    //       }
    //       array.push(obj)
    //     })
    //   dispatch(emailDataActions.setReceivedEmails(array))
    // }) 
    // axios.get(`https://mail-box-client-18272-default-rtdb.firebaseio.com/sent${email}.json`)
    // .then((response)=>{
    //   let array=[];
    //   Object.keys(response.data).forEach((key)=>{
    //       let obj={
    //           id:key,
    //           to:response.data[key].to,
    //           subject:response.data[key].subject,
    //           emaildata:response.data[key].emaildata
    //       }
    //       array.push(obj)
    //     })
    //   dispatch(emailDataActions.setSentEmails(array))
    // }) 
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
export const socket = openSocket("http://localhost:3000");
export default App;
