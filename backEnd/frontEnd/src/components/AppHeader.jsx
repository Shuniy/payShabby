import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";

function AppHeader(props) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Navbar
      className="navbar"
      bg="light"
      variant="light"
      expand="lg"
      collapseOnSelect
      style={{ marginBottm: 10 }}
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>PayShabby</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <SearchBox />
            <LinkContainer className="custom-nav-items mx-3 my-auto" to="/cart">
              <Nav.Link>
                <i className="fas fa-shopping-cart"> </i> Cart
              </Nav.Link>
            </LinkContainer>

            {userInfo ? (
              <NavDropdown
                title={userInfo.name}
                className="custom-nav-items mx-3 my-auto"
                id="username"
              >
                <LinkContainer className="my-auto" to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item className="my-auto" onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer
                className="custom-nav-items mx-3 my-auto"
                to="/login"
              >
                <Nav.Link>
                  <i className="fas fa-user"></i> Login
                </Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown
                title={"Admin"}
                className="custom-nav-items mx-3 my-auto"
                id="adminMenu"
              >
                <LinkContainer
                  className="my-auto"
                  to="/admin/userlist"
                >
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer
                  className="my-auto"
                  to="/admin/productlist"
                >
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer
                  className="my-auto"
                  to="/admin/orderlist"
                >
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppHeader;
