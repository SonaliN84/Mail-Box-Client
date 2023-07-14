import { createSlice } from "@reduxjs/toolkit";
const initialDataState={
  receivedEmails:[],
  sentEmails:[],
  activePage:1,
  total:0,
  limit:10
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
        },
        setActivePage(state,action){
          state.activePage=action.payload+1
        },
        setTotal(state,action){
          state.total=action.payload
        },
        setInitialActivePage(state){
          state.activePage=1;
        },
        setLimit(state,action){
          state.limit=action.payload+1;
        },
        setInitialLimit(state,action){
          state.limit=10;
        }
        
        
    }
})
export default emailDataSlice.reducer;
export const emailDataActions=emailDataSlice.actions;