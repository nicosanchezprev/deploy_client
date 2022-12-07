import React from "react";
import { Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { 
  getPokemons, 
  getTypes,
  setError
} from '../../redux/actions'


import "./Error.css";

import logoError from "../../img/psyduck.png"

function Error({error}) {
  const dispatch = useDispatch();

  const handleHome = () => {
    dispatch(setError(""));
    dispatch(getPokemons());
    dispatch(getTypes());

  };

  return (
    <div className="div-principal-error">
      <img src={logoError} alt="psyduck" className="img-error" />
      <div className="div-sec-error">
        <div className="texto-error1">Oh no! Ocurrio un error!</div>
        <div className="texto-error"> El error es: {error}</div>
        <Link to="/">
          <button onClick={(e) => handleHome(e)} className="boton-error">
            Volver
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Error;