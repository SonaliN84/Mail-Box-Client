import { Navbar,Nav,Container } from "react-bootstrap";
import {Link} from 'react-router-dom';
import './Header.css'
const Header=()=>{
return (   
<Navbar collapseOnSelect expand="lg" className="Header">
<Container>
  <Navbar.Brand style={{color:"white"}} >Mail Box Client</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
   </Nav>
    <Nav>
      <Nav.Link><Link to='/Signup' className="loginSignupTitles">Sign Up</Link></Nav.Link>
    
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>)

}
export default Header;