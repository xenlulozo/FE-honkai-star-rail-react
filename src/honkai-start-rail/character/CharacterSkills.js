import React, { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

import "./CharacterInfo.scss";
import { useParams } from "react-router-dom";
import TextTruncate from "react-text-truncate";
// import CharacterInfo from "./CharacterInfo";
import Testcss from "./Testcss";
//import img
// var Diamond = require("../../../public/logo192.png");
// import bailu from "../../bailu.webp";
function CharacterSkills() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [selectedObject, setSelectedObject] = useState(null);
  const [isShow, setIsShow] = useState(null);
  const [indexSelected, setIndexSelected] = useState(null);

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
  const CharacterSkills = () => {
    const { id } = useParams();
    // Rest of the component code
  };
  const handleObjectClick = (index) => {
    setSelectedObject(index);
    setIsShow(!isShow);
    setIndexSelected(index - 1);
  };

  const getObjectClassName = (index) => {
    if (index === selectedObject) {
      return "selected";
    }
    return "";
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
            // console.log("itwem", skillCharacter);
            return (
              <>
                <div className="content-skill ">
                  <h3>Skills</h3>
                  {skillCharacter &&
                    skillCharacter.map((item, index) => {
                      return (
                        <>
                          <div
                            className={`skills ${getObjectClassName(
                              index + 1
                            )} my-3 `}
                            onClick={() => handleObjectClick(index + 1)}
                          >
                            <div key={item.skillId}>
                              <div className="name col-12 py-3">
                                <h4>{item.name}</h4>
                                <div className="d-flex ">
                                  <span>{item.type}</span>
                                  {item.tags && item.tags ? (
                                    <span className="mx-3">{item.tags}</span>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>
                              <div className="desc pb-3">
                                {isShow && indexSelected === index ? (
                                  <>{item.desc}</>
                                ) : (
                                  <>
                                    <div>
                                      <TextTruncate
                                        line={1}
                                        truncateText="…"
                                        text={item.desc}
                                      />
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>
              </>
            );
          })}

        {/* <CharacterTraces /> */}
      </div>
    </>
  );
}

export default CharacterSkills;
