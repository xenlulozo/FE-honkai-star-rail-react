import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";

import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import axios from "axios";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import "./FullCharacter.scss";
import { useParams } from "react-router-dom";

import CharacterInfo from "./CharacterInfo";
import CharacterSkills from "./CharacterSkills";
import CharacterTraces from "./CharacterTraces";
import Eidolon from "./Eidolon";

import { useCharacterId } from "./CharacterIdContext";
import Background from "./Background";
import Testcss from "./Testcss";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

import "./Backgrond.scss";
function FullCharacter() {
  const [isNavFixed, setIsNavFixed] = useState(false);
  const characterId = useCharacterId();
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "Active", value: "1" },
    { name: "Radio", value: "2" },
    { name: "Radio", value: "3" },
  ];
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const navHeight = document.querySelector("nav").offsetHeight;

      if (scrollY > navHeight) {
        setIsNavFixed(true);
      } else {
        setIsNavFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const { id } = useParams();

  const handleNavClick = (target) => {
    scroll.scrollTo(target, {
      smooth: true,
      duration: 500,
    });
  };

  return (
    <>
      {/* <Background /> */}
      <img className="test select-none" src={`/img/${id}_full.webp`}></img>

      <div className="container" style={{ zIndex: 100 }}>
        {/* <div
          className="test"
          style={{
            backgroundImage: `url(/img/${id}_full.webp)   `,
          }}
        ></div> */}
        {/* <img className="test" src="/img/2_full.webp"></img> */}

        <div>
          <div className="container-full">
            <div id="characterInfo">
              <CharacterInfo />
            </div>
            <div
              className="container "
              style={{
                color: "#ffffff8c",
                // padding: "6px 15px",
                margin: 0,
                fontWeight: 600,
                // "font-size": "20px",
              }}
            >
              <Navbar
                bg="dark"
                expand="lg"
                style={{
                  position: isNavFixed ? "fixed" : "relative",
                  top: 0,
                  left: 0,
                  width: "100%",
                  zIndex: 999,

                  border: "1px rgba(195, 195, 195, 0.2) solid",
                }}
              >
                <Container>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-center" fill>
                      <Nav.Item className="mx-3 ">
                        <ScrollLink
                          to="characterInfo"
                          smooth={true}
                          duration={100}
                          activeClass="active"
                          spy={true}
                        >
                          Info
                        </ScrollLink>
                      </Nav.Item>
                      <Nav.Item className="mx-3">
                        <ScrollLink
                          to="characterSkills"
                          smooth={true}
                          duration={100}
                          activeClass="active"
                          spy={true}
                        >
                          Skills
                        </ScrollLink>
                      </Nav.Item>
                      <Nav.Item className="mx-3">
                        <ScrollLink
                          to="characterTraces"
                          smooth={true}
                          duration={100}
                          activeClass="active"
                          spy={true}
                        >
                          Traces
                        </ScrollLink>
                      </Nav.Item>
                      <Nav.Item className="mx-3">
                        <ScrollLink
                          to="Eidolon"
                          smooth={true}
                          duration={100}
                          activeClass="active"
                          spy={true}
                        >
                          Eidolon
                        </ScrollLink>
                      </Nav.Item>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
            </div>

            <div id="characterSkills">
              <CharacterSkills />
            </div>
            <div id="characterTraces">
              <CharacterTraces />
            </div>
            <div id="Eidolon">
              <Eidolon />
            </div>
            {/* TextTruncate */}
          </div>
        </div>
      </div>
    </>
  );
}

export default FullCharacter;
