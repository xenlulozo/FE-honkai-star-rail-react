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
    // axios
    //   .get(`http://localhost:3333/info/${id}`)
    //   .then((response) => {
    //     setData(response.data);
    //     console.log(response.data[0].json_data.skills);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    axios
      .get(`http://localhost:3333/skills/${id}`)
      .then((response) => {
        setData(response.data);
        // console.log(response.data);
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
        {/* {console.log(data)} */}
        {/* {data &&
          data.map((item, index) => {
            let infoCharacter = item.json_data && item.json_data;

            console.log(item);
            let skillCharacter = "null";
            // try {
            //   skillCharacter =
            //     infoCharacter?.skills && JSON.parse(infoCharacter.skills);
            // } catch (error) {
            //   console.error("Error parsing JSON:", error);
            // }

            // console.log("itwem", skillCharacter);
            return (
              <>
             
              </>
            );
          })} */}
        <div className="content-skill my-5">
          <h2 className="my-4">Skills</h2>
          {data &&
            data.map((item, index) => {
              console.log(item);
              return (
                <>
                  <div
                    className={`skills d-lg-flex col-12  ${getObjectClassName(
                      index + 1
                    )} my-4 `}
                    onClick={() => handleObjectClick(index + 1)}
                  >
                    <div className="img-skills col-12  col-lg-2 mx-2 my-2 ">
                      <div className="back-img-skills d-flex align-content-center justify-content-center">
                        <img
                          src={`/img/skills/id_${id}_skill${index + 1}.png`}
                        ></img>
                      </div>
                    </div>
                    <div key={item.skillId} className="col-lg-10  col-12">
                      <div className="name col-12 py-lg-3">
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
                      <div className="desc pb-3 px-2 pt-2 pt-lg-0">
                        {isShow && indexSelected === index ? (
                          <>{item.description}</>
                        ) : (
                          <>
                            <div>
                              <TextTruncate
                                line={1}
                                truncateText="…"
                                text={item.description}
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
        {/* <CharacterTraces /> */}
      </div>
    </>
  );
}

export default CharacterSkills;
