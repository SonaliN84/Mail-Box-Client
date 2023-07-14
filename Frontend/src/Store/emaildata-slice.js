import { createSlice } from "@reduxjs/toolkit";
const initialDataState={
  receivedEmails:[],
  sentEmails:[]
}
const emailDataSlice=createSlice({
    name:'emailData',
    initialState:initialDataState,
    reducers:{
        setReceivedEmails(state,action){
            state.receivedEmails=action.payload
        },
        setSentEmails(state,action){
            state.sentEmails=action.payload
        },
        setInterval(state,action){
           state.Interval=action.payload;
        },
        clearInterval(state){
          clearInterval(state.Interval)
          state.sentEmails=[];
          state.receivedEmails=[];
        },
        setReadEmails(state,action){
          let a=state.receivedEmails.find((e)=> e._id == action.payload)
          a.read=true;
          console.log("hi")
        },
        setSentReadEmail(state,action){
          let a=state.sentEmails.find((e)=> e._id == action.payload)
          a.read=true;
        }
        
        
    }
})
export default emailDataSlice.reducer;
export const emailDataActions=emailDataSlice.actions;