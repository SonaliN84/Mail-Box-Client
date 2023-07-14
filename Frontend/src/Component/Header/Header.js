import { Navbar, Nav, Container, Dropdown, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Header.css";
import { authActions } from "../../Store/auth-slice";
import {emailDataActions} from '../../Store/emaildata-slice';
import { socket } from "../../App";

const Header = () => {
  const dispatch = useDispatch();
  const authIsLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const receivedEmailData=useSelector(state=>state.emailData.receivedEmails)
  const userId=useSelector(state=>state.auth.userId)
  const logoutHandler = () => {
    socket.emit("leaveroom",userId)
    dispatch(authActions.logout());
    dispatch(emailDataActions.setReceivedEmails([]))
    dispatch(emailDataActions.setSentEmails([]))
    dispatch(emailDataActions.clearInterval())
    dispatch(emailDataActions.setInitialActivePage());
    dispatch(emailDataActions.setTotal(0))
    dispatch(emailDataActions.setInitialLimit())
  };

  const unreadCount=receivedEmailData.filter((email)=>email.read===false)
  const unreadEmailCount=unreadCount.length;
  return (
    <Navbar collapseOnSelect expand="lg" className="Header">
      {authIsLoggedIn && (
        <Nav>
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              style={{ background: "#9D3C72", border: "1px solid #9D3C72" }}
            >
              <img
                src="https://icons-for-free.com/iconfiles/png/512/menu+nav+navigation+icon-1320073183300645803.png"
                style={{
                  width: "30px",
                  height: "30px",
                  background: "white",
                  borderRadius: "7px",
                }}
                className="mx-2"
              />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Button
                  className="my-2 b"
                  style={{
                    background: "#C85C8E",
                    border: "1px solid #C85C8E",
                    textDecoration: "none",
                  }}
                >
                  <Link
                    to="/ComposeEmail"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Compose
                    <img
                      src="https://icons.veryicon.com/png/o/miscellaneous/iconfonts/edit-423.png"
                      style={{
                        width: "25px",
                        height: "25px",
                        background: "white",
                        borderRadius: "7px",
                      }}
                      className="mx-2"
                    />
                  </Link>
                </Button>
              </Dropdown.Item>
              <Dropdown.Item>
              <Link
                  to="/Users"
                  style={{ textDecoration: "none", color: "black" }}
                > <button
                  type="button"
                  class="position-relative"
                  style={{ background: "#C85C8E", border: "1px solid #C85C8E",color:"white",borderRadius:"5px",padding:"8px"}}
                >
                  Inbox
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info  text-dark">
                  {unreadEmailCount}
                    <span class="visually-hidden">unread messages</span>
                  </span>
                </button>
               
                  
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
              <Button
                  className="my-2"
                  style={{
                    background: "#C85C8E",
                    border: "1px solid #C85C8E",
                    textDecoration: "none",
                  }}
                >
                <Link to='/SentEmails'  style={{ textDecoration: "none", color: "white" }}>Sent</Link></Button></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      )}
      <Container>
        <Navbar.Brand style={{ color: "white" }}>Mail Box Client</Navbar.Brand>
        <Nav></Nav>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {!authIsLoggedIn && (
              <Nav.Link>
                <Link to="/Login" className="loginSignupTitles">
                  Login
                </Link>
              </Nav.Link>
            )}
            {!authIsLoggedIn && (
              <Nav.Link>
                <Link to="/Signup" className="loginSignupTitles">
                  Sign Up
                </Link>
              </Nav.Link>
            )}
            {authIsLoggedIn && (
              <Nav.Link>
                <Link
                  to="/Login"
                  className="loginSignupTitles"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
