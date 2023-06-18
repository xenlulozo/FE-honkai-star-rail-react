import React, { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

import "./CharacterInfo.scss";
import { useParams } from "react-router-dom";
import CharacterTraces from "./CharacterTraces";

//import img
// var Diamond = require("../../../public/logo192.png");

import id_1 from "../img/1_sm.webp";
import id_2 from "../img/2_sm.webp";
import id_3 from "../img/3_sm.webp";
import id_4 from "../img/4_sm.webp";
import id_5 from "../img/5_sm.webp";
import id_6 from "../img/6_sm.webp";
import id_7 from "../img/7_sm.webp";
import id_8 from "../img/8_sm.webp";

function CharacterInfo() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3333/info/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const CharacterInfo = () => {
    const { id } = useParams();

    // Rest of the component code
  };
  return (
    <>
      <div className="container">
        {data &&
          data.map((item, index) => {
            let infoCharacter = item.json_data && item.json_data;

            let skillCharacter = infoCharacter.skills;
            let imagePath = `/img/${infoCharacter.id}_sm.webp`;
            // console.log(imagePath);

            // console.log("itwem", skillCharacter);
            return (
              <>
                <div className="col-12 info d-lg-flex">
                  <div className="avt-character col-12 col-lg-2">
                    <img src={imagePath}></img>
                  </div>
                  <div className="default-info mx-lg-5 col-12  col-lg-10 ">
                    {" "}
                    <h1> {infoCharacter.name} </h1>
                    <div className="desc">
                      <div className="element d-inline-flex me-3 px-2 my-2   border-bottom border-warning">
                        <span className="star"> {infoCharacter.rarity}★ </span>
                      </div>
                      <div className="element d-inline-flex me-3 px-2 my-2  border-bottom border-warning">
                        <div className="img-element ">
                          <img
                            src={`/img/element/${infoCharacter.element}.png`}
                          ></img>{" "}
                        </div>
                        <span> {infoCharacter.element}</span>
                      </div>
                      <div className="element d-inline-flex me-3 px-2 my-2 border-bottom border-warning">
                        <div className="img-element ">
                          <img
                            src={`/img/path/path_the_${infoCharacter.path}.png`}
                          ></img>{" "}
                        </div>
                        <span> {infoCharacter.path}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-skill"></div>
              </>
            );
          })}
        {/* <CharacterTraces /> */}
      </div>
    </>
  );
}

export default CharacterInfo;
