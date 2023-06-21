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
        }
        
        
    }
})
export default emailDataSlice.reducer;
export const emailDataActions=emailDataSlice.actions;