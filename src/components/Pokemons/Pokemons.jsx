import './Pokemons.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { 
  getPokemons, 
  cleanPokemons, 
  filterPokemonsByType, 
  filterCreated, 
  orderByNameAttack,
} from '../../redux/actions'

import { Link } from "react-router-dom";

import loader from "../../img/loader.gif";
import loaderDots from "../../img/loaderDots.gif";

import Card from './Card/Card';
import Nav from './Nav/Nav';
import Paginado from '../Paginado/Paginado';
import Error from '../Error/Error';


const Pokemons = (props) => {
  const allPokes = useSelector((state) => state.pokemons);
  const error = useSelector((state) => state.error); 
  const dispatch = useDispatch();
  
  // Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonsPerPage; 
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons =  allPokes.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const [orden, setOrden] = useState("");


  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Fin Paginado
  
  useEffect(() => {
    dispatch(getPokemons());
    return dispatch(cleanPokemons());
  }, [dispatch]);

  // Filtros
  const handleFilterStatus = (e) => {
    dispatch(filterPokemonsByType(e.target.value));
  };

  const handleFilterCreated = (e) => {
    dispatch(filterCreated(e.target.value));
  };

  const handleSort = (e) => {
    e.preventDefault();
    dispatch(orderByNameAttack(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  };

  if(error){
    return(
      <>
        <Error error={error}/>
      </>
    )
  } else if(allPokes.length) {
    return(
      <div className="div-principal-pokemons">
        <Nav setCurrentPage={setCurrentPage} />
        <div className="div-secundario-filter">
          <div className="div-children-filter">
            <div className="title-filter">Ordenar</div>
            <select className="boton-filter" onChange={e => handleSort(e)}>
              <option value="default">Ordenar</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
              <option value="pod">Poderosos</option>
              <option value="deb">Debiles</option>
            </select>
          </div>
            <div className="div-children-filter"> 
              <div className="title-filter">Procedencia</div>
              <select className="boton-filter" onChange={e => handleFilterCreated(e)}>
                <option value="all">Todos</option>
                <option value="existentes">Existentes</option>
                <option value="created">Creados</option>
              </select>
            </div>
            <div className="div-children-filter">
              <div className="title-filter">Tipos</div>
              <select className="boton-filter" onChange={e => handleFilterStatus(e)}>
                <option value="all">Todos</option>
                <option value="normal">Normal</option>
                <option value="fighting">Peleador</option>
                <option value="flying">Volador</option>
                <option value="poison">Veneno</option>
                <option value="ground">Tierra</option>
                <option value="rock">Piedra</option>
                <option value="bug">Bicho</option>
                <option value="ghost">Fanstama</option>
                <option value="steel">Acero</option>
                <option value="fire">Fuego</option>
                <option value="water">Agua</option>
                <option value="grass">Planta</option>
                <option value="electric">Electrico</option>
                <option value="psychic">Psiquico</option>
                <option value="ice">Hielo</option>
                <option value="dragon">Dragon</option>
                <option value="dark">Siniestro</option>
                <option value="fairy">Hada</option>
                <option value="unknown">???</option>
                <option value="shadow">Oscuro</option>
              </select>
            </div>
          </div>
        <div className="div-secundario-cards">
          {
            currentPokemons?.map((p) => {
              return (
                <div>
                  <Link className="link-card" to={"/pokemons/" + p.id} >
                    <Card 
                    key={p.id}
                    name={p.name}
                    img={p.img}
                    types={p.types} />
                  </Link>
                </div>
              );
            })
          }
        </div>
        <Paginado 
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokes.length}
          paginado={paginado}
          currentPage={currentPage}
        />
      </div>
    )
  } else {
    return (
      <div className="div-principal-pokemons">
        <Nav setCurrentPage={setCurrentPage} />
        <div className="div-secundario-filter">
          <div className="div-children-filter">
            <div className="title-filter">Ordenar</div>
            <select className="boton-filter" onChange={e => handleSort(e)}>
              <option value="default">Ordenar</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
              <option value="pod">Poderosos</option>
              <option value="deb">Debiles</option>
            </select>
          </div>
            <div className="div-children-filter"> 
              <div className="title-filter">Procedencia</div>
              <select className="boton-filter" onChange={e => handleFilterCreated(e)}>
                <option value="all">Todos</option>
                <option value="existentes">Existentes</option>
                <option value="created">Creados</option>
              </select>
            </div>
            <div className="div-children-filter">
              <div className="title-filter">Tipos</div>
              <select className="boton-filter" onChange={e => handleFilterStatus(e)}>
                <option value="all">Todos</option>
                <option value="normal">Normal</option>
                <option value="fighting">Peleador</option>
                <option value="flying">Volador</option>
                <option value="poison">Veneno</option>
                <option value="ground">Tierra</option>
                <option value="rock">Piedra</option>
                <option value="bug">Bicho</option>
                <option value="ghost">Fanstama</option>
                <option value="steel">Acero</option>
                <option value="fire">Fuego</option>
                <option value="water">Agua</option>
                <option value="grass">Planta</option>
                <option value="electric">Electrico</option>
                <option value="psychic">Psiquico</option>
                <option value="ice">Hielo</option>
                <option value="dragon">Dragon</option>
                <option value="dark">Siniestro</option>
                <option value="fairy">Hada</option>
                <option value="unknown">???</option>
                <option value="shadow">Oscuro</option>
              </select>
            </div>
          </div>
        <div className="div-loader-gif-pokemons">
          <img className="loader-gif-pokemons1" src={loader} alt="loader" />
          <img className="loader-gif-pokemons2" src={loaderDots} alt="loader" />
        </div>
        <Paginado 
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokes.length}
          paginado={paginado}
          currentPage={currentPage}
        />
      </div>
    )
  }
};

export default Pokemons;