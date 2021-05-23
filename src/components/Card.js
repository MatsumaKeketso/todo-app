import React from "react";
import "./item.css";
import { handleDragStart } from "../scripts/functions";
const Card = (props) => {
  const dragStart = (e) => {
    const target = e.target;
    e.dataTransfer.setData("card_id", target.id);
    setTimeout(() => {
      // target.style.display = 'none';
    }, 0);
  };
  const dragOver = (e) => {
  };

  return (
    <div
      id={props.id}
      className={props.className}
      draggable={props.draggable}
      onDragStart={handleDragStart}
    >
      {props.children}
    </div>
  );
};

export default Card;
