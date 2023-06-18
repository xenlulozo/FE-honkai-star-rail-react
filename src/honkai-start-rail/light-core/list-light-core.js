import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import "./list-light-core.scss";
export default function ListLightCore() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [selectedObject1, setSelectedObject1] = useState(null);
  const [selectedObject3, setSelectedObject3] = useState(null);
  const [elementSelected, setElementSelected] = useState("");
  const [pathSelected, setPathSelected] = useState("");
  const [element, setElement] = useState("");
  const [path, setPath] = useState("");

  const [selectedPath, setSelectedPath] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3333/path")
      .then((response) => {
        setPath(
          response.data &&
            response.data[0].json_array &&
            JSON.parse(response.data[0].json_array)
        );
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:3333/lightcore`)
      .then((response) => {
        setData(response.data);
        setFilter(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleObjectClick1 = (index, path) => {
    setSelectedObject1(index);
  };
  const getObjectClassName1 = (index, path) => {
    // console.log(selectedPath);
    if (Object.values(selectedPath).indexOf(path) > -1) {
      if (index === selectedObject1) {
        return "selected1";
      }
    }
    return "";
  };
  const handleObjectClick3 = (index, path) => {
    setSelectedObject3(index);
  };
  const getObjectClassName3 = (index, path) => {
    // if (Object.values(selectedPath).indexOf(path) > -1) {
    if (index === selectedObject3) {
      return "selected1";
    }
    // }
    return "";
  };
  const selectPath = (path) => {
    // let currentSortOrder = selectedPath[path] || "all";
    // setSelectedPath({ ...selectedPath, [path]: path });
    for (let pathKey in selectedPath) {
      if (path !== "all") {
        // console.log("bf", pathKey);
        // console.log(path);
        if (pathKey !== path) {
          // console.log(pathKey);
          delete selectedPath[pathKey];
        } else {
          path = "all";
        }
        // console.log("af", pathKey);
      }
    }

    if (path === "all") {
      setFilter(data);
      setSelectedPath({ [path]: path });
    } else {
      const coppyData = data.filter((p) => p.element === path);
      setFilter(coppyData);
      setSelectedPath({ [path]: path });
    }
  };
  return (
    <>
      {" "}
      <div className="container">
        <div className="stat-container">
          <h3>Honkai: Star Rail Light Cones List</h3>
          <div className="filter-container mt-5">
            <div className="filter-content col-12 d-flex ">
              <div className="row-items col-lg-5 col-12 d-flex my-3">
                <div
                  className={`items all-path ${getObjectClassName1(0, "all")}`}
                  onClick={() => {
                    selectPath("all");
                    handleObjectClick1(0, "all");
                  }}
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="asterisk"
                    class="svg-inline--fa fa-asterisk "
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width="18"
                  >
                    <path
                      fill="currentColor"
                      d="M417.1 368c-5.937 10.27-16.69 16-27.75 16c-5.422 0-10.92-1.375-15.97-4.281L256 311.4V448c0 17.67-14.33 32-31.1 32S192 465.7 192 448V311.4l-118.3 68.29C68.67 382.6 63.17 384 57.75 384c-11.06 0-21.81-5.734-27.75-16c-8.828-15.31-3.594-34.88 11.72-43.72L159.1 256L41.72 187.7C26.41 178.9 21.17 159.3 29.1 144C36.63 132.5 49.26 126.7 61.65 128.2C65.78 128.7 69.88 130.1 73.72 132.3L192 200.6V64c0-17.67 14.33-32 32-32S256 46.33 256 64v136.6l118.3-68.29c3.838-2.213 7.939-3.539 12.07-4.051C398.7 126.7 411.4 132.5 417.1 144c8.828 15.31 3.594 34.88-11.72 43.72L288 256l118.3 68.28C421.6 333.1 426.8 352.7 417.1 368z"
                    ></path>
                  </svg>
                </div>
                {path &&
                  path.map((item, index) => {
                    return (
                      <>
                        <div
                          className={`items ${getObjectClassName1(
                            index + 1,
                            item.path
                          )}`}
                          onMouseOut={() => handleObjectClick3(index + 1)}
                          onClick={() => {
                            selectPath(item.path);

                            handleObjectClick1(index + 1, item.path);
                          }}
                          key={index}
                        >
                          <div
                            className={` sub-hover py-2 px-2 ${getObjectClassName3(
                              index + 1
                            )}`}
                          >
                            <span>{item.path}</span>
                          </div>
                          <div className="img">
                            <img
                              src={` /img/path/path_the_${item.path}.png`}
                            ></img>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="col-12 d-lg-flex content-light-core">
            {filter &&
              filter.map((item, index) => {
                return (
                  <>
                    <div className=" col-12 fill-container my-4" key={item.id}>
                      <div className="light-core-info col-12 d-flex my-3">
                        <div className="img-container col-lg-3 col-5 ">
                          <img src={`/img/light-core/${item.id}_sm.png`}></img>
                        </div>
                        <div className="detail-content">
                          <div className="text-detail ">
                            <h4> {item.name}</h4>
                            <span className="content-path d-flex">
                              {" "}
                              <img
                                src={`/img/path/path_the_${item.element}.png`}
                                className="d-inline my-1"
                              ></img>
                              <div>
                                {" "}
                                <span className="px-2 py-1">
                                  {" "}
                                  {item.element}
                                </span>
                              </div>
                            </span>
                          </div>
                        </div>
                      </div>{" "}
                      <div className="light-core-content col-12">
                        <Accordion defaultActiveKey="0">
                          <Accordion.Item eventKey="0">
                            <Accordion.Header className="description-header">
                              Description
                            </Accordion.Header>
                            <Accordion.Body>
                              <div className="description-content">
                                {item.description}
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="1">
                            <Accordion.Header className="stat-header">
                              Stat
                            </Accordion.Header>
                            <Accordion.Body>
                              <div className="stat-content d-flex py-2">
                                <div className="my-2">
                                  <span className="items-stat mx-2 my-2 px-2 py-1">
                                    HP + {item.HP}
                                  </span>
                                </div>
                                <div className="my-2">
                                  <span className="items-stat mx-2 my-2 px-2 py-1">
                                    ATK + {item.ATK}
                                  </span>
                                </div>
                                <div className="my-2">
                                  <span className="items-stat mx-2 my-2 py-1 px-2 ">
                                    DEF + {item.DEF}
                                  </span>
                                </div>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
