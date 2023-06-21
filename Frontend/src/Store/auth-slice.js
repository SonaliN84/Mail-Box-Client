import { createSlice } from "@reduxjs/toolkit";

const initialToken=localStorage.getItem('token')
const initialEmail=localStorage.getItem('email')
const initialEmailOriginal=localStorage.getItem('emailOriginal')
const userIsLoggedIn=!!initialToken;
const initialAuthState={
  token:initialToken,
  isLoggedIn:userIsLoggedIn,
  userEmail:initialEmail,
  userEmailOriginal:initialEmailOriginal
}

const authSlice=createSlice({
    name:'auth',
    initialState:initialAuthState,
    reducers:{
      login(state,action){
        state.token=action.payload.token;
        state.userEmail=action.payload.email;
        state.userEmailOriginal=action.payload.emailOriginal;


        console.log("email",action.payload.email) 
        console.log("token",state.token)
        console.log("payload",action.payload.emailOriginal)
        state.isLoggedIn=true;
        localStorage.setItem('token',action.payload.token)
        localStorage.setItem('email',action.payload.email)
        localStorage.setItem('emailOriginal',action.payload.emailOriginal)


      }, 
      logout(state){
       state.token=null;
       state.userEmail=null;
       state.isLoggedIn=false;
       state.userEmailOriginal=null;
       localStorage.removeItem('token')
       localStorage.removeItem('email')
       localStorage.removeItem('emailOriginal')
    
      },
    

    }
})
export const authActions=authSlice.actions;
export default authSlice.reducer;
