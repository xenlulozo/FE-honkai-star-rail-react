import React from "react";
import { Nav } from "react-bootstrap";

const MyComponent = () => {
  return (
    <Nav className="justify-content-center" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link eventKey="/home">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/about">About</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/contact">Contact</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default MyComponent;
