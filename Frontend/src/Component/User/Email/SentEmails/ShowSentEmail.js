import { Link } from "react-router-dom";
const ShowSentEmail=(props)=>{
 return (
    <div className="container">
    <Link
      to={`/SentEmails/${props.id}`}
      style={{ textDecoration: "none", color: "black" }}
      
    >
      {/* <div class="row showuser" >
        <div class="col" style={{ overflow: "hidden", fontWeight: "bold" }}>
          
          {props.to}
        </div>

        
        <div class="col" style={{ overflow: "hidden", fontStyle: "italic" }}>
          {props.subject}
        </div> */}
  


        {/* <div
          class="col"
          dangerouslySetInnerHTML={{ __html:props.emaildata}}
          style={{ overflow: "hidden" }}
        /> */}
        <div class="row showuser">
          <div class="col" style={{ overflow: "hidden", fontWeight: "bold"}}>
            {props.read === false ? (
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  background: "blue",
                  border: "1px solid blue",
                  borderRadius: "100px",
                  float: "left",
                }}
                className="me-2 my-2"
              ></div>
            ) : (
              ""
            )}

            {props.to}
          </div>
          <div class="col" style={{ overflow: "hidden", fontStyle: "italic",textAlign:"right"}}>
            {props.date}
          </div>
          <div class="row" style={{ overflow: "hidden",wordBreak:"break-word" }} className="mx-3 my-2">
            Subject : {props.subject}
          </div>
      </div>
    </Link>
    
  </div>
);
 
}
export default ShowSentEmail;