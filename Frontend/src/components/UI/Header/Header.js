import React from 'react';
import {Navbar, Nav, Dropdown} from "react-bootstrap";
import {Link} from "react-router-dom";

const Header = (props) => {
    return (
          <Navbar
              className="custom-header">
              <Navbar.Brand href="#" className="me-auto">
                  IMDB Hub
              </Navbar.Brand>
              <Nav
                  defaultActiveKey="home"
                  className="justify-content-end"
              >
                  <Nav.Item>
                      <Nav.Link eventKey="home" as={Link} to="/">Home</Nav.Link>
                  </Nav.Item>

                  {
                      !props.isAuthenticated &&

                      <Nav.Item>
                          <Nav.Link eventKey="login" as={Link} to="/login">Sign In</Nav.Link>
                      </Nav.Item>
                  }

                  {
                      props.isAuthenticated &&
                         <>
                             <Nav.Item>
                                 <Nav.Link eventKey="wishList" as={Link} to="/wish-list">Wish List</Nav.Link>
                             </Nav.Item>
                             <Dropdown style={{marginLeft: '10px'}}>
                                 <Dropdown.Toggle className="main-button" id="dropdown-basic">
                                     {props.user.name}
                                 </Dropdown.Toggle>

                                 <Dropdown.Menu>
                                     <Dropdown.Item onClick={() => props.logout()}>LOGOUT</Dropdown.Item>
                                 </Dropdown.Menu>
                             </Dropdown>
                         </>
                  }
              </Nav>
          </Navbar>
    );
};

export default Header;
