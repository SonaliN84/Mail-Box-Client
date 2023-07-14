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
            {props.read === true ? (
              <div
                style={{
                  width: "18px",
                  height: "18px",
                  float: "left",
                }}
                className="me-2 my-2"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Eo_circle_green_checkmark.svg"/>
              </div>
            ) : (
              <div style={{ width: "18px",
                  height: "18px",
                  float: "left"}}></div>
            )}

            {props.to}
          </div>
          <div class="col" style={{ overflow: "hidden", fontStyle: "italic",textAlign:"right"}}>
            {props.date}
          </div>
          <div class="row" style={{ overflow: "hidden",wordBreak:"break-word" }} className="mx-4 my-2">
            Subject : {props.subject}
          </div>
      </div>
    </Link>
    
  </div>
);
 
}
export default ShowSentEmail;