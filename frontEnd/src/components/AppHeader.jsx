import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function AppHeader(props) {
  return (
    <Navbar
      className="navbar"
      bg="#3459E6"
      variant="dark"
      expand="lg"
      collapseOnSelect
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>PayShabby</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <LinkContainer to="/action">
                <NavDropdown.Item>Action</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="action2">
                <NavDropdown.Item>Another action</NavDropdown.Item>
              </LinkContainer>

              <LinkContainer to="something">
                <NavDropdown.Item>Something</NavDropdown.Item>
              </LinkContainer>

              <NavDropdown.Divider />
              <LinkContainer to="seperatedlink">
                <NavDropdown.Item>Separated link</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <LinkContainer to="/cart">
              <Nav.Link>
                <i className="fas fa-shopping-cart"></i> Cart
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>
                <i className="fas fa-user"></i> Login
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppHeader;
