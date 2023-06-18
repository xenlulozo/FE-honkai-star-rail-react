import React, { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
// import { createBrowserHistory } from "history";
import { useNavigate } from "react-router-dom";
import "./ListCharacter.scss";

function ListCharacter() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [elementSelected, setElementSelected] = useState("");
  const [pathSelected, setPathSelected] = useState("");
  const [element, setElement] = useState("");
  const [path, setPath] = useState("");

  const [selectedObject, setSelectedObject] = useState(null);
  const [selectedObject1, setSelectedObject1] = useState(null);
  const [selectedObject2, setSelectedObject2] = useState(null);
  const [selectedObject3, setSelectedObject3] = useState(null);
  const [isShow, setIsShow] = useState(null);
  const [indexSelected, setIndexSelected] = useState(null);

  const [selectedElement, setSelectedElement] = useState([]);
  const [selectedPath, setSelectedPath] = useState([]);

  const navigate = useNavigate();
  //   const history = createBrowserHistory();

  //   const location = history.location;
  useEffect(() => {
    axios
      .get("https://hsr-database.onrender.com/path")
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
      .get("https://hsr-database.onrender.com/element")
      .then((response) => {
        setElement(
          response.data &&
            response.data[0].json_array &&
            JSON.parse(response.data[0].json_array)
        );
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://hsr-database.onrender.com/list")
      .then((response) => {
        setData(
          response.data &&
            response.data[0].json_array &&
            JSON.parse(response.data[0].json_array)
        );
        setFilter(
          response.data &&
            response.data[0].json_array &&
            JSON.parse(response.data[0].json_array)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleClick = (id, src) => {
    // history.push("/home", { id: id });

    navigate(`/character/${id}`);
    // console.log("Clicked id:", id);
  };
  const selectElement = (element) => {
    for (let pathKey in selectedElement) {
      if (element !== "all") {
        // console.log("bf", pathKey);
        // console.log(path);
        if (pathKey !== element) {
          // console.log(pathKey);
          delete selectedPath[pathKey];
        } else {
          element = "all";
        }
        // console.log("af", pathKey);
      }
    }
    setElementSelected(element);
    if (elementSelected === "") {
      if (element === "all") {
        setFilter(data);
      } else {
        const result = data.filter((word) => word.element === element);
        setFilter(result);
      }
      setSelectedElement({ [element]: element });
    } else {
      if (element === "all") {
        if (pathSelected === "all") {
          setFilter(data);
        } else {
          const result = data.filter((word) => word.path === pathSelected);
          setFilter(result);
        }
      } else {
        if (pathSelected === "all") {
          const result = data.filter((word) => word.element === element);
          setFilter(result);
        } else {
          const result = data.filter(
            (word) => word.element === element && word.path === pathSelected
          );
          setFilter(result);
        }
      }
      setSelectedElement({ [element]: element });
    }
  };
  const selectPath = (path) => {
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
    setPathSelected(path);
    if (elementSelected === "") {
      if (path === "all") {
        setFilter(data);
      } else {
        const result = data.filter((word) => word.path === path);
        setFilter(result);
      }
      setSelectedPath({ [path]: path });
    } else {
      if (path === "all") {
        if (elementSelected === "all") {
          setFilter(data);
        } else {
          const result = data.filter(
            (word) => word.element === elementSelected
          );
          setFilter(result);
        }
      } else {
        if (elementSelected === "all") {
          const result = data.filter((word) => word.path === path);
          setFilter(result);
        } else {
          const result = data.filter(
            (word) => word.path === path && word.element === elementSelected
          );
          setFilter(result);
        }
      }
      setSelectedPath({ [path]: path });
    }
  };
  const handleObjectClick = (index) => {
    setSelectedObject(index);
    setIndexSelected(index);
  };
  const getObjectClassName = (index, element) => {
    if (Object.values(selectedElement).indexOf(element) > -1) {
      if (index === selectedObject) {
        return "selected";
      }
    }
    return "";
  };
  const handleObjectClick1 = (index) => {
    setSelectedObject1(index);
  };
  const getObjectClassName1 = (index, path) => {
    if (Object.values(selectedPath).indexOf(path) > -1) {
      if (index === selectedObject1) {
        return "selected1";
      }
    }
    return "";
  };
  const handleObjectClick2 = (index) => {
    setSelectedObject2(index);
  };
  const getObjectClassName2 = (index) => {
    if (index === selectedObject2) {
      return "sub";
    }
    return "";
  };
  const handleObjectClick3 = (index) => {
    setSelectedObject3(index);
  };
  const getObjectClassName3 = (index) => {
    if (index === selectedObject3) {
      return "sub";
    }
    return "";
  };
  // const handelSubItems = () => {
  //   alert("hover");
  // };
  return (
    <>
      {/* {console.log(filter)} */}
      <div className="container">
        <div className="stat-container">
          <h3>Honkai: Star Rail Characters List</h3>

          <div className="filter-container mt-5">
            <div className="filter-content col-12 d-flex ">
              <div className="row-items col-lg-5 col-12 d-flex my-3">
                <div
                  className={`items all ${getObjectClassName(0, "all")}`}
                  onClick={() => {
                    selectElement("all");
                    handleObjectClick(0);
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
                {element &&
                  element.map((item, index) => {
                    return (
                      <>
                        <div
                          className={`items ${getObjectClassName(
                            index + 1,
                            item.element
                          )}`}
                          onMouseOut={() => handleObjectClick3(index + 1)}
                          onClick={() => {
                            selectElement(item.element);
                            handleObjectClick(index + 1);
                          }}
                        >
                          <div
                            className={` sub-hover py-2 px-2 ${getObjectClassName3(
                              index + 1
                            )}`}
                          >
                            <span>{item.element}</span>
                          </div>
                          <div className="img">
                            <img
                              src={` /img/element/${item.element.toLowerCase()}.png`}
                            ></img>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>

              {/* <div className="filters-divider "></div> */}

              <div className="row-items col-lg-5 col-12 d-flex my-3">
                <div
                  className={`items all-path ${getObjectClassName1(0, "all")}`}
                  onClick={() => {
                    selectPath("all");
                    handleObjectClick1(0);
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
                          onMouseOut={() => handleObjectClick2(index + 1)}
                          onClick={() => {
                            selectPath(item.path);
                            handleObjectClick1(index + 1);
                          }}
                        >
                          <div
                            className={` sub-hover py-2 px-2 ${getObjectClassName2(
                              index + 1
                            )}`}
                          >
                            <span>{item.path}</span>
                          </div>
                          <div className="img">
                            <img
                              src={` /img/path/path_the_${item.path.toLowerCase()}.png`}
                            ></img>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="content-list-character col-12 ">
            {filter &&
              filter.map((item, index) => {
                let imagePath = `/img/${item.id}_sm.webp`;

                return (
                  <>
                    {" "}
                    <div
                      className="items-list-character my-5 col-lg-2  mx-1"
                      key={item.id}
                      onClick={() => handleClick(item.id, imagePath)}
                    >
                      <div className="fix-img">
                        <div className="avt-character">
                          <div className="line">
                            <div className="hiden"></div>
                            <div className="icon">
                              {" "}
                              <img
                                src={`/img/element/views/${item.element.toLowerCase()}_sm.png`}
                              />
                            </div>
                            <div className="img-rotate">
                              {/* <div className="img-container"> */}
                              <img src={imagePath} />
                              {/* </div> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <span className="my-3"> {item.name}</span>
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

export default ListCharacter;
