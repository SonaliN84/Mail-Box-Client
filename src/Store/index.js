import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice';
import emailDataReducer from './emaildata-slice'
const store=configureStore({
    reducer:{
        auth:authReducer,
        emailData:emailDataReducer
    }
})
export default store;