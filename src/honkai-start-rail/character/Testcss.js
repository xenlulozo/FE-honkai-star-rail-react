import React, { useState } from "react";
import "./testcss.scss";

const Testcss = () => {
  const [selectedObject, setSelectedObject] = useState(null);

  const handleObjectClick = (index) => {
    setSelectedObject(index);
  };

  const getObjectClassName = (index) => {
    if (index === selectedObject) {
      return "selected";
    }
    return "";
  };

  return (
    <div>
      <div
        className={`myObject ${getObjectClassName(1)}`}
        onClick={() => handleObjectClick(1)}
      >
        Object 1
      </div>
      <div
        className={`myObject ${getObjectClassName(2)}`}
        onClick={() => handleObjectClick(2)}
      >
        Object 2
      </div>
      <div
        className={`myObject ${getObjectClassName(3)}`}
        onClick={() => handleObjectClick(3)}
      >
        Object 3
      </div>
    </div>
  );
};

export default Testcss;
