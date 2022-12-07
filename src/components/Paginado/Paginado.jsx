import React from "react";

import "./Paginado.css";

const Paginado = ({pokemonsPerPage, allPokemons, paginado, currentPage}) => {
  const pageNumbers = [];

  for (let i=1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
    pageNumbers.push(i)
  };
  
  
  return (
    <nav>
      <ul className="paginado">
        {
          pageNumbers && pageNumbers.map(number => (
            <li className="paginado-number" key={number}>
              <a className={number === currentPage ? "selecPage paginado-a" : "paginado-a"} onClick={() => paginado(number)}>{number}</a>
            </li>
          ))
        }
      </ul>
    </nav>
  )
};

export default Paginado;