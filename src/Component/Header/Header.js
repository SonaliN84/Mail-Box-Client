import { Navbar,Nav,Container } from "react-bootstrap";
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
<Container>
  <Navbar.Brand style={{color:"white"}} >Mail Box Client</Navbar.Brand>
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