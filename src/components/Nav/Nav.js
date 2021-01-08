import React from "react";
import Nav from "react-bootstrap/Nav";

function Navbar({ user, onRouteChange }) {
  return (
    <>
      <Nav className="justify-content-center">
        <Nav.Item>
          <Nav.Link onClick={() => onRouteChange("pending")}>Pending</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => onRouteChange("home")}>Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}

export default Navbar;
