import React, { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
// import { createBrowserHistory } from "history";
import { useNavigate } from "react-router-dom";
import "./ListCharacter.scss";
import CharacterInfo from "./CharacterInfo";
import CharacterTraces from "./CharacterTraces";

import id_1 from "../img/1_sm.webp";
import id_2 from "../img/2_sm.webp";
import id_3 from "../img/3_sm.webp";
import id_4 from "../img/4_sm.webp";
import id_5 from "../img/5_sm.webp";
import id_6 from "../img/6_sm.webp";
import id_7 from "../img/7_sm.webp";
import id_8 from "../img/8_sm.webp";
// import bailu from "../../../public/img/bailu.webp";
function ListCharacter() {
  const [data, setData] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const navigate = useNavigate();
  //   const history = createBrowserHistory();

  //   const location = history.location;
  useEffect(() => {
    axios
      .get("http://localhost:3333/list")
      .then((response) => {
        setData(
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
  return (
    <>
      <div className="container">
        <h3> List Character</h3>
        <div className="content-list-character my-5">
          {data &&
            data.map((item, index) => {
              let imagePath = `/img/${item.id}_sm.webp`;
              // console.log(imagePath);
              return (
                <>
                  {" "}
                  <div
                    className="items-list-character mx-4 my-5"
                    key={item.id}
                    onClick={() => handleClick(item.id, imagePath)}
                  >
                    <div className="avt-character">
                      <img src={imagePath} />
                    </div>

                    <span> {item.name}</span>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default ListCharacter;
