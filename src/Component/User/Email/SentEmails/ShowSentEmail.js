import { Link } from "react-router-dom";
const ShowSentEmail=(props)=>{
 return (
    <div className="container">
    <Link
      to={`/SentEmails/${props.id}`}
      style={{ textDecoration: "none", color: "black" }}
      
    >
      <div class="row showuser" >
        <div class="col" style={{ overflow: "hidden", fontWeight: "bold" }}>
          
          {props.to}
        </div>

        <div class="col" style={{ overflow: "hidden", fontStyle: "italic" }}>
          {props.subject}
        </div>

        <div
          class="col"
          dangerouslySetInnerHTML={{ __html:props.emaildata}}
          style={{ overflow: "hidden" }}
        />
      </div>
    </Link>
    
  </div>
);
 
}
export default ShowSentEmail;