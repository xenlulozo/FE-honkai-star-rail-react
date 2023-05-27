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
            let infoCharacter =
              item.json_data && item.json_data && JSON.parse(item.json_data);

            let skillCharacter =
              infoCharacter.skills && JSON.parse(infoCharacter.skills);
            let imagePath = `/img/${infoCharacter.id}_sm.webp`;
            console.log(imagePath);

            // console.log("itwem", skillCharacter);
            return (
              <>
                <div className="col-12 info d-flex">
                  <div className="avt-character">
                    <img src={imagePath}></img>
                  </div>
                  <div className="default-info mx-3">
                    {" "}
                    <h1>
                      {" "}
                      {infoCharacter.name} ( {infoCharacter.rarity}★ )
                    </h1>
                    <span> {infoCharacter.element}</span>
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
