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
        
    }
})
export default emailDataSlice.reducer;
export const emailDataActions=emailDataSlice.actions;