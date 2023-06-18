import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import "./Relics.scss";
export default function ListLightCore() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://hsr-database.onrender.com/relic`, {
        withCredentials: true,
        headers: {
          Referrer: "https://fe-honkai-star-rail-react.vercel.app/",
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {" "}
      <div className="container">
        <div className="stat-container">
          <h3>Honkai: Star Rail Relics List</h3>
          <div className="d-flex col-12 content-relics">
            {data &&
              data.map((item, index) => {
                return (
                  <>
                    {/* <div key={item.id}> */}
                    <div
                      className="d-lg-flex col-lg-6 col-12  my-3  container-relics "
                      key={item.id}
                    >
                      {" "}
                      <div className="img-container col-lg-3 col-12">
                        <img src={`/img/relics/relics_${item.id}.png`}></img>
                      </div>
                      <div className="col-lg-8 col-12 relics-info">
                        <div className="relics-name">
                          <h4>{item.name}</h4>
                        </div>
                        <div className="relics-desc">
                          <div className="d-flex my-3">
                            <div className="desc-number  ">2</div>
                            <span className="px-2">{item.desctwo}</span>
                          </div>
                          <div className="d-flex my-3">
                            <div className="desc-number  ">4</div>
                            <span className="px-2">{item.descfour}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* </div> */}
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
