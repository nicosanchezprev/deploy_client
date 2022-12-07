import "./Card.css";
import React from "react";

const Card = ({name, img, types}) => {
  return (
      <div className="div-card">
        <h2 className="titulo-card">{name[0].toUpperCase() + name.substring(1)}</h2>
        <img className="img-card" src={img} alt="img-pokemon"/>
        <div className="div-tipos">{types.map((t) => {
          return(
            <div className={t + " nombre-tipo"}>{t[0].toUpperCase() + t.substring(1)}</div>
          )
        })}</div>
      </div>
  )
};

export default Card;