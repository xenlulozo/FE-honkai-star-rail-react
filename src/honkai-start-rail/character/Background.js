import React from "react";
import "./Backgrond.scss";
import { useParams } from "react-router-dom";

export default function Background() {
  const { id } = useParams();
  //   console.log(id);
  return (
    <>
      {" "}
      <div
        className="test"
        style={{
          backgroundImage: `url(/img/${id}_full.webp)   `,
        }}
      ></div>
    </>
  );
}
