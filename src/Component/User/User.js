import { Fragment } from "react";
import CreateEmail from "./Email/CreateEmail";


const User =()=>{
 
    return (
        <Fragment>
        <div style={{margin:"20px auto",textAlign:"center"}}>
        
            <h3>Welcome to your mail box</h3>
         </div>
       <CreateEmail/>
       </Fragment>
    )
}
export default User;