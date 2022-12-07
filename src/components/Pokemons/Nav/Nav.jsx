import "./Nav.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { cleanPokemons, getNamePokemons, getPokemons } from "../../../redux/actions";


import { Link } from "react-router-dom";

import logo from "../../../img/logo.png";
import reload from "../../../img/reload.png";
import sumar from "../../../img/plus.png";

const Nav = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getNamePokemons(name));
    props.setCurrentPage(1);
    const aux_const = document.getElementById("search");
    aux_const.value = "";
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(cleanPokemons());
    dispatch(getPokemons());
  }

  return (
    <div className="div-principal-nav">
      <Link to="/"><img className="logo-nav" src={logo} alt="logo" /></Link>
      <form className="nav-secundario1">
        <input type="text" className="search-input" id="search" placeholder="Buscar pokemones..." onChange={(e) => handleInputChange(e)} />
        <button onClick={(e) => handleSubmit(e)} type="submit" className="boton-buscar-nav">
          <ion-icon name="search-outline"></ion-icon>
        </button>
      </form>
      <div className="nav-secundario2">
        <button className="boton-navsecundario2">
          <Link className="link-home" to="/create">
            <img className="png-nav"src={sumar} alt="sumar" />
          </Link>
        </button>
        <button onClick={(e) => handleClick(e)} className="boton-navsecundario2" type="button">
            <img className="png-nav"src={reload} alt="reload" />
        </button>
      </div>
    </div>
  )
};

export default Nav;