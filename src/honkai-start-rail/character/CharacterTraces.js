import React, { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

import "./CharacterTraces.scss";
import { useParams } from "react-router-dom";
function CharacterTraces() {
  const [data, setData] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3333/traces/${id}`)
      .then((response) => {
        setData(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleShowOrHideSubtraces = () => {
    setIsShow(!isShow);
  };
  let traces;
  const isSmallScreen = window.innerWidth < 768;
  return (
    <>
      <div className="container">
        <h3> Traces</h3>
        <div
          className="fake col-12 d-lg-flex"
          // className={
          //   isSmallScreen ? "fake sm-d-block col-12" : "fake d-flex col-12 "
          // }
          // style={{ flexdirection: "column" }}
        >
          {data &&
            data.map((item, index) => {
              // console.log(item && item.traces);
              traces = item && item.traces && JSON.parse(item.traces);

              return (
                <>
                  <div
                    className="traces-items col-12 col-lg-4 my-2"
                    // className={
                    //   isSmallScreen
                    //     ? "traces-items sm-col-12 my-3 "
                    //     : "traces-items lg-col-4 my-3"
                    // }
                    style={isSmallScreen ? { width: "100%" } : { width: "32%" }}
                  >
                    <div className="info-traces my-4">
                      <h2>{traces[0].name}</h2>
                      <div>
                        <span>Major trace</span>
                        <span className="mx-3">Unlocks at {traces[0].req}</span>
                      </div>
                    </div>
                    <div className="desc-traces my-4">
                      <div>{traces[0].desc}</div>
                    </div>
                    <div className="container-sub-traces col-12 my-2">
                      <span
                        className="show-hide-sub-traces mb-3"
                        onClick={() => handleShowOrHideSubtraces()}
                      >
                        {" "}
                        Show minor traces
                      </span>
                      {isShow ? (
                        <>
                          {" "}
                          {traces[0] &&
                            JSON.parse(traces[0].sub_nodes).map(
                              (sub, index) => {
                                return (
                                  <>
                                    <div className="sub-traces my-3">
                                      <div>
                                        {" "}
                                        {sub.stat} + {sub.value} %
                                      </div>
                                      <p>
                                        Unlocks at <strong>{sub.req}</strong>
                                      </p>
                                    </div>
                                  </>
                                );
                              }
                            )}
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default CharacterTraces;
