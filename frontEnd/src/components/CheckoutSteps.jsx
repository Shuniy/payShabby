import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function CheckoutSteps(props) {
  const { step1, step2, step3, step4 } = props;
  return (
    <Nav className="justify-content-center mb-4 my-3">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
        ) : (
          <LinkContainer to="/login">
            <Nav.Link disabled>Login</Nav.Link>
          </LinkContainer>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <LinkContainer to="/Shipping">
            <Nav.Link disabled>Shipping</Nav.Link>
          </LinkContainer>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <LinkContainer to="/payment">
            <Nav.Link disabled>Payment</Nav.Link>
          </LinkContainer>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placerder">
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <LinkContainer to="/placeorder">
            <Nav.Link disabled>Place Order</Nav.Link>
          </LinkContainer>
        )}
      </Nav.Item>
    </Nav>
  );
}

export default CheckoutSteps;
