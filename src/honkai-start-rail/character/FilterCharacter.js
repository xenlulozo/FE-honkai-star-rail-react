import React, { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
// import { createBrowserHistory } from "history";
// import ListCharacter from "./ListCharacter";
import { useNavigate } from "react-router-dom";
import "./ListCharacter.scss";

function ListCharacter() {
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    alert("re-render");
    axios
      .get("http://localhost:3333/list")
      .then((response) => {
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

  return (
    <>
      <div className="container">
        <h3>Filter</h3>
        {/* <ListCharacter /> */}
      </div>
    </>
  );
}

export default ListCharacter;
