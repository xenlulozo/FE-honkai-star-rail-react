import React, { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Eidolon.scss";
import TextTruncate from "react-text-truncate";
import { useParams } from "react-router-dom";

export default function Eidolon() {
  const [data, setData] = useState([]);
  const [selectedObject, setSelectedObject] = useState(null);
  const [isShow, setIsShow] = useState(null);
  const [indexSelected, setIndexSelected] = useState(null);
  useEffect(() => {
    axios
      .get(`https://hsr-database.onrender.com/eidolon/${id}`)
      .then((response) => {
        // setData(JSON.parse(response.data[0].eidolon));
        // console.log(
        //   Object.entries(JSON.parse(response.data[0].eidolon)).map(
        //     ([key, value]) => ({ [key]: value })
        //   )
        // );
        // console.log(response.data[0].eidolon);
        const arr = [];

        for (let i = 1; i <= 6; i++) {
          const upgradeName = response.data[0].eidolon[`upgrade${i}Name`];
          const upgradeDesc = response.data[0].eidolon[`upgrade${i}Desc`];
          const obj = { upgradeName, upgradeDesc };
          arr.push(obj);
        }
        console.log(arr);
        setData(arr);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const { id } = useParams();
  //   console.log(id);
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
      <div className="container my-5">
        <h2 className="my-4">Eidolon</h2>
        <div className="eidolon-content">
          {data &&
            data.map((item, index) => {
              return (
                <>
                  <div
                    key={index}
                    className={`eidolon d-lg-flex col-12  ${getObjectClassName(
                      index + 1
                    )} my-4 `}
                    onClick={() => handleObjectClick(index + 1)}
                  >
                    <div className="img-eidolon col-12  col-lg-2 mx-2 my-2 ">
                      <div className="back-img-skills d-flex align-content-center justify-content-center">
                        <img
                          src={`/img/eidolon/id_${id}_eidolon_${index + 1}.png`}
                        ></img>
                      </div>
                    </div>
                    <div className="col-lg-10  col-12">
                      <div className="name col-12 py-lg-3">
                        <h4>{item && item.upgradeName}</h4>
                      </div>
                      <div className="desc pb-3 pe-2  ">
                        <span>
                          {isShow && indexSelected === index ? (
                            <>
                              {" "}
                              <div>
                                <span>
                                  {" "}
                                  {item &&
                                    item.upgradeDesc &&
                                    item.upgradeDesc.raw}
                                </span>
                              </div>
                            </>
                          ) : (
                            <>
                              <TextTruncate
                                line={1}
                                truncateText="…"
                                text={
                                  item &&
                                  item.upgradeDesc &&
                                  item.upgradeDesc.raw
                                }
                              />
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          {/* <div className="col-12">abc</div> */}
        </div>
      </div>
    </>
  );
}
