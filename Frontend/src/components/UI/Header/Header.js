import React from 'react';
import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

const Header = () => {
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
                      <Nav.Link exact eventKey="home" as={Link} to="/">Home</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link eventKey="wishList" as={Link} to="/wish-list">Wish List</Nav.Link>
                  </Nav.Item>
              </Nav>
          </Navbar>
    );
};

export default Header;
