import { Navbar,Nav,Container,Dropdown,Button} from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import {Link} from 'react-router-dom';
import './Header.css';
import { authActions } from "../../Store/auth-slice";

const Header=()=>{
    const dispatch=useDispatch();
    const authIsLoggedIn=useSelector(state=>state.auth.isLoggedIn)

    const logoutHandler=()=>{
      dispatch(authActions.logout())
    }
return (   
<Navbar collapseOnSelect expand="lg" className="Header">
{authIsLoggedIn && (<Nav>

<Dropdown>
      <Dropdown.Toggle  id="dropdown-basic"style={{background:"#9D3C72",border:"1px solid #9D3C72"}}>
      <img src='https://icons-for-free.com/iconfiles/png/512/menu+nav+navigation+icon-1320073183300645803.png' style={{width:"30px",height:"30px",background:"white",borderRadius:"7px"}} className="mx-2"/>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item><Button className='my-2 b' style={{background:"#C85C8E",border:"1px solid #C85C8E",textDecoration:"none"}}><Link to='/ComposeEmail' style={{textDecoration:"none",color:"white"}}>Compose
        <img src="https://icons.veryicon.com/png/o/miscellaneous/iconfonts/edit-423.png" style={{width:"25px",height:"25px",background:"white",borderRadius:"7px"}} className="mx-2"/></Link></Button></Dropdown.Item>
        <Dropdown.Item ><Button className='my-2 b' style={{background:"#C85C8E",border:"1px solid #C85C8E",textDecoration:"none"}}><Link to='/Users' style={{textDecoration:"none",color:"white"}}>Inbox
        <img src="https://thenounproject.com/api/private/icons/1686808/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0&token=gAAAAABkJQ7kiQ_BufexBYnoXeZ-9cFOFLyyhxdcHc0M4O_hH_BWMcrCdekoTcxWpUmN3B64V0sG96xNO4_gwYFRvSdyTNulXA%3D%3D" style={{width:"25px",height:"25px",background:"white",borderRadius:"7px"}} className="mx-2"/></Link></Button></Dropdown.Item>
        <Dropdown.Item href="#/action-3">Sent</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  
</Nav>)}
<Container>
  <Navbar.Brand style={{color:"white"}} >Mail Box Client</Navbar.Brand>
  <Nav>
 
</Nav>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
   </Nav>
    <Nav>
      {!authIsLoggedIn && (<Nav.Link><Link to='/Login' className="loginSignupTitles">Login</Link></Nav.Link>)}
      {!authIsLoggedIn && (<Nav.Link><Link to='/Signup' className="loginSignupTitles">Sign Up</Link></Nav.Link>)}
      {authIsLoggedIn && (<Nav.Link><Link to='/Login' className="loginSignupTitles" onClick={logoutHandler}>Logout</Link></Nav.Link>)}
    
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>)

}
export default Header;