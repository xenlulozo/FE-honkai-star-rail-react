import logo from "./logo.svg";
import "./App.scss";

// import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CharacterInfo from "./honkai-start-rail/character/CharacterInfo";
import CharacterTraces from "./honkai-start-rail/character/CharacterTraces";
import ListCharacter from "./honkai-start-rail/character/ListCharacter";
import CharacterSkills from "./honkai-start-rail/character/CharacterSkills";
import Menu from "../src/layout/Menu.js";
import Footer from "../src/layout/Footer.js";

import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";

import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

import FullCharacter from "./honkai-start-rail/character/FullCharacter";
import { CharacterIdProvider } from "./honkai-start-rail/character/CharacterIdContext";
import Background from "./honkai-start-rail/character/Background";
import ListLightCore from "./honkai-start-rail/light-core/list-light-core";
import Relics from "./honkai-start-rail/relics/Relics";
import CharacterStat from "./honkai-start-rail/characterstat/Stat";
function App() {
  const [isNavFixed, setIsNavFixed] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollY = window.scrollY;
  //     const navHeight = document.querySelector("nav").offsetHeight;

  //     if (scrollY > navHeight) {
  //       setIsNavFixed(true);
  //     } else {
  //       setIsNavFixed(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const handleNavClick = (target) => {
    scroll.scrollTo(target, {
      smooth: true,
      duration: 500,
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        {/* <div style={{ width: "80%" }}>
          <Menu style={{ "z-index": "20" }} />
        </div> */}

        <Router>
          <Menu />
          <Routes>
            <Route exact path="/character" element={<ListCharacter />} />
            <Route
              exact
              path="/character/:id"
              element={
                // <CharacterIdProvider id={id}>
                <>
                  <FullCharacter />
                </>
                // </CharacterIdProvider>
              }
            />
            <Route
              exact
              path="lightcore"
              element={
                <>
                  <ListLightCore />
                </>
              }
            />
            <Route
              exact
              path="relics"
              element={
                <>
                  <Relics />
                </>
              }
            />
            <Route
              exact
              path="stat"
              element={
                <>
                  <CharacterStat />
                </>
              }
            />
          </Routes>
        </Router>

        <Footer />
      </header>
    </div>
  );
}

export default App;
