import "./Home.css";
import React from "react";

import { Link } from "react-router-dom";

import poke from "../../img/poke.gif";
import logo from "../../img/logo.png";

const Home = () => {
  return (
    <div className="div-principal-home">
      <div className="div-secundario1-home">
        <img className="logo-home" src={logo} alt="logo" />
        <h1 className="titulo-home">¡Bienvenido a tu Pokedex!</h1>
        <div className="div-textos">
          <div className="texto-home">Aqui encontrarás toda la información de tu pokemones preferidos!</div>
          <div className="texto-home">También puedes dejar fluir tu imaginación y crear al mejor pokemon que quieras :D</div>
        </div>
        <Link className="link-home" to="/pokemons"><button className="boton-home">Vamos!</button></Link>
      </div>
      <div className="div-secundario2-home">
        <img className="gif-home" src={poke} alt="pokemon" />
      </div>
    </div>
  )
};

export default Home;