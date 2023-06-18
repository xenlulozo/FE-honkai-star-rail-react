import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import React from "react";
import { NavLink } from "react-router-dom";

import Menu from "./Menu.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function JustifiedExample() {
  const [active, setActive] = useState("default");

  return (
    // <NavLink to="/lightcore">lightcore</NavLink>
    <div style={{ zIndex: "100", width: "100%" }}>
      <div className="container">
        {" "}
        <Nav
          // justify
          // variant="tabs"
          // defaultActiveKey="/home"
          className="sub-nav"
          activeKey={active}
          onSelect={(selectedKey) => setActive(selectedKey)}
        >
          <Nav.Item>
            <NavLink
              to="/character"
              className="nav-link"
              activeClassName="active"
            >
              Character
            </NavLink>
            {/* <Nav.Link href="/" eventKey="default">
              Character
            </Nav.Link> */}
          </Nav.Item>
          <Nav.Item>
            {/* <Nav.Link eventKey="lightcore" href="/lightcore">
              Light Core
            </Nav.Link> */}
            <NavLink
              to="/lightcore"
              className="nav-link"
              activeClassName="active"
            >
              Light Core
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/stat" className="nav-link" activeClassName="active">
              Stat
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/Relics" className="nav-link" activeClassName="active">
              Relics
            </NavLink>
          </Nav.Item>
        </Nav>
      </div>
    </div>
  );
}

export default JustifiedExample;
