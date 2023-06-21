import Header from "../Component/Header/Header";
import { Fragment } from "react";
const RootLayout =(props)=>{
 return (
    <Fragment>
        <Header/>
        {props.children}
    </Fragment>
    
 )

}
export default RootLayout;