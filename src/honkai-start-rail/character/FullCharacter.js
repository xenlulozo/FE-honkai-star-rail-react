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

import id_1 from "../img/1_sm.webp";
import id_2 from "../img/2_sm.webp";
import id_3 from "../img/3_sm.webp";
import id_4 from "../img/4_sm.webp";
import id_5 from "../img/5_sm.webp";
import id_6 from "../img/6_sm.webp";
import id_7 from "../img/7_sm.webp";
import id_8 from "../img/8_sm.webp";

import { useCharacterId } from "./CharacterIdContext";
import Background from "./Background";
import Testcss from "./Testcss";
import "./Backgrond.scss";
function FullCharacter() {
  const [isNavFixed, setIsNavFixed] = useState(false);
  const characterId = useCharacterId();

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
      <img className="test" src={`/img/${id}_full.webp`}></img>

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
                  right: 80,
                  width: "100%",
                  zIndex: 999,

                  border: "1px rgba(195, 195, 195, 0.2) solid",
                }}
              >
                <Container>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-center" fill>
                      <Nav.Item className="mx-3">
                        <ScrollLink
                          to="characterInfo"
                          smooth={true}
                          duration={100}
                        >
                          Info
                        </ScrollLink>
                      </Nav.Item>
                      <Nav.Item className="mx-3">
                        <ScrollLink
                          to="characterSkills"
                          smooth={true}
                          duration={100}
                        >
                          Skills
                        </ScrollLink>
                      </Nav.Item>
                      <Nav.Item className="mx-3">
                        <ScrollLink
                          to="characterTraces"
                          smooth={true}
                          duration={100}
                        >
                          Traces
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

            {/* TextTruncate */}
          </div>
        </div>
      </div>
    </>
  );
}

export default FullCharacter;
