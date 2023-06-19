import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import "./Stat.scss";
export default function CharacterStat() {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState([]);
  const [sortOrders, setSortOrders] = useState({});

  const [filter, setFilter] = useState([]);
  const [elementSelected, setElementSelected] = useState("all");
  const [pathSelected, setPathSelected] = useState("all");
  const [element, setElement] = useState("");
  const [path, setPath] = useState("");
  const [selectedPath, setSelectedPath] = useState([]);
  const [selectedElement, setSelectedElement] = useState([]);
  const [selectedObject, setSelectedObject] = useState(null);
  const [selectedObject1, setSelectedObject1] = useState(null);
  const [selectedObject2, setSelectedObject2] = useState(null);
  const [selectedObject3, setSelectedObject3] = useState(null);
  const [isShow, setIsShow] = useState(null);
  const [indexSelected, setIndexSelected] = useState(null);
  useEffect(() => {
    axios
      .get("https://hsr-database.onrender.com/path")
      .then((response) => {
        setPath(
          response.data &&
            response.data[0].json_array &&
            JSON.parse(response.data[0].json_array)
        );
        // console.log(response.data);
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
      .get(`https://hsr-database.onrender.com/characterstat`)
      .then((response) => {
        setData(response.data);
        setFilter(response.data);
        setSort(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handelSort = (key) => {
    let sortedData = [...filter];

    let currentSortOrder = sortOrders[key] || "asc";
    console.log(sortOrders);
    for (let sortKey in sortOrders) {
      if (sortKey !== key) {
        delete sortOrders[sortKey];
      }
    }
    if (currentSortOrder === "asc") {
      sortedData.sort((a, b) => {
        if (key === "name") {
          return a.name.localeCompare(b.name);
        } else {
          return a[key] - b[key];
        }
      });

      setSortOrders({ ...sortOrders, [key]: "desc" });
    } else {
      sortedData.sort((a, b) => {
        if (key === "name") {
          return b.name.localeCompare(a.name);
        } else {
          return b[key] - a[key];
        }
      });

      setSortOrders({ ...sortOrders, [key]: "asc" });
    }

    setFilter(sortedData);
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
    // console.log(path);
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
  return (
    <>
      <div className="container">
        <div className="stat-container">
          <h3 className="my-4"> Honkai: Star Rail Character Stat</h3>
          <div className="filter-container mt-5 my-4">
            <div className="filter-content col-12 d-flex ">
              <div className="row-items col-lg-5 col-12 d-flex my-1">
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

              <div className="row-items col-lg-5 col-12 d-flex my-1">
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
          <div className="d-flex col-12 d-flex table-stat">
            <div className="col-12 d-flex table-header ">
              <div
                className={`col-4 px-4 py-2  ${
                  sortOrders["name"] === "desc"
                    ? "border-bottom  border-warning"
                    : sortOrders["name"] === "asc"
                    ? "border-top border-primary"
                    : ""
                }`}
                onClick={() => handelSort("name")}
              >
                <span className="d-lg-inline d-none"> Max LV.</span>Character
              </div>
              <div
                className={`col-2 py-2  ${
                  sortOrders["HP"] === "desc"
                    ? "border-bottom  border-warning"
                    : sortOrders["HP"] === "asc"
                    ? "border-top border-primary"
                    : ""
                }`}
                onClick={() => handelSort("HP")}
              >
                {" "}
                HP
              </div>
              <div
                className={`col-2 py-2  ${
                  sortOrders["ATK"] === "desc"
                    ? "border-bottom  border-warning"
                    : sortOrders["ATK"] === "asc"
                    ? "border-top border-primary"
                    : ""
                }`}
                onClick={() => handelSort("ATK")}
              >
                ATK
              </div>

              <div
                className={`col-2 py-2  ${
                  sortOrders["DEF"] === "desc"
                    ? "border-bottom  border-warning"
                    : sortOrders["DEF"] === "asc"
                    ? "border-top border-primary"
                    : ""
                }`}
                onClick={() => handelSort("DEF")}
              >
                DEF
              </div>
              <div
                className={`col-2 py-2  ${
                  sortOrders["Speed"] === "desc"
                    ? "border-bottom  border-warning"
                    : sortOrders["Speed"] === "asc"
                    ? "border-top border-primary"
                    : ""
                }`}
                onClick={() => handelSort("Speed")}
              >
                Speed
              </div>
            </div>
            {filter &&
              filter.map((item, index) => {
                let imagePath = `/img/${item.id}_sm.webp`;
                return (
                  <>
                    {" "}
                    <div className="col-12 d-flex row-data">
                      <div className="col-4 px-lg-4 px-2 d-flex">
                        <div className="avt-character-in-stat my-3">
                          <div className="line col-4">
                            <div className="icon">
                              {" "}
                              <img
                                src={`/img/element/views/${item.element.toLowerCase()}_sm.png`}
                              />
                            </div>
                            <div className="img">
                              <img src={imagePath} />
                            </div>
                          </div>
                        </div>
                        <div className="px-3 name-cha d-lg-flex d-none">
                          <span>{item.name}</span>
                        </div>
                      </div>
                      <div className="col-2 name-cha"> {item.HP}</div>
                      <div className="col-2 name-cha">{item.ATK}</div>

                      <div className="col-2 name-cha">{item.DEF}</div>
                      <div className="col-2 name-cha">{item.Speed}</div>
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
