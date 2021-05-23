import React from "react";
import "./item.css";
import { handleDragEnterLeave, handleOverDrop } from "../scripts/functions";
const Item = (props) => {
  return (
    <div
      id={props.id}
      onDrop={handleOverDrop}
      onDragOver={handleOverDrop}
      onDragEnter={handleDragEnterLeave}
      onDragLeave={handleDragEnterLeave}
      className={props.className}
      data-drop-target="true"
    >
      {props.children}
    </div>
  );
};

export default Item;
