import './Detail.css';
import React, { useEffect } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { 
  getPokemonDetail, 
  cleanDetail,
  deletePokemon
} from '../../redux/actions';

import loader from "../../img/loader.gif";
import loaderDots from "../../img/loaderDots.gif";
import { Link, useHistory } from 'react-router-dom';

const Detail = (props) => {
  const pokemonId = props.match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();
  const pokemonDetail = useSelector((state) => state.pokemonDetail);


  useEffect(() => {
    dispatch(getPokemonDetail(pokemonId));
    
    return function(){
      dispatch(cleanDetail());
    };
  }, [dispatch, pokemonId]);

  const func_height = () => {
    if(pokemonDetail.height.toString().length === 1){
      return "0." + pokemonDetail.height.toString() + " m";
    } else if(pokemonDetail.height.toString().length >= 2){
      if(pokemonDetail.height.toString()[1] === 0){
        return pokemonDetail.height.toString().substring(0, 1) + " m";
      } else {
        return pokemonDetail.height.toString()[0] + "." + pokemonDetail.height.toString()[1] + " m"; 
      }
    }
  };
  const func_weight = () => {
    if(pokemonDetail.weight.toString().length === 3){
      return pokemonDetail.weight.toString()[0] + pokemonDetail.weight.toString()[1] + "." + pokemonDetail.weight.toString()[2] + " kg";
    } else if(pokemonDetail.weight.toString().length === 2){
      if(pokemonDetail.weight.toString()[1] === "0") {return pokemonDetail.weight.toString()[0] + " kg";}
      else {return pokemonDetail.weight.toString()[0] + "." + pokemonDetail.weight.toString()[1] + " kg";}
    } else if (pokemonDetail.weight.toString().length >= 3){
      return pokemonDetail.weight.toString()[0] + pokemonDetail.weight.toString()[1] + pokemonDetail.weight.toString()[2] + "." + pokemonDetail.weight.toString()[3] + " kg";
    }
  };


  const handlerDelete = () => {
    dispatch(deletePokemon(pokemonId));
    alert("Pokemon eliminado");
    history.push("/pokemons");
  };



  let aux = 0;
  return (
    <div key={pokemonDetail.id} className="pokemon-detail">
      <div className="nav-detail">
        <div className='nav-detail-texto'>
        <Link className="link-detail" to="/pokemons">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <polyline points="15 6 9 12 15 18"></polyline>
          </svg>
          <p>Volver</p>
        </Link>
        </div>
      </div>
    { pokemonDetail["name"] ?
      <div className="cont-padre-cards">
        <div className="div-card-detail">
          <div className="div-card-detail-sec1">
            <img className="img-card-detail" src={pokemonDetail.img} alt="img-detail"/>
            <p className="nombre-card-detail">{pokemonDetail.name[0].toUpperCase() + pokemonDetail.name.substring(1)}</p>
            <div className="tipos-poke">{pokemonDetail.types.map((t) => {
                return(
                  <div key={pokemonDetail.id + aux++} className={t + " nombre-tipo"}>{t[0].toUpperCase() + t.substring(1)}</div>
                )
              })}
            </div>
            <p className="id-card-detail">ID #{pokemonDetail.id}</p>
          </div>
          <div className="div-card-detail-sec2">
            <div className="alt-pes-card-padre">  
            
              <div className="alt-pes-card-detail">
                <div className="alt-pes-card-title">Altura</div>
                <div className="alt-pes-card-num">{func_height()}</div>
              </div>
              <div className="alt-pes-card-detail">
                <div className="alt-pes-card-title">Peso</div> 
                <div className="alt-pes-card-num">{func_weight()}</div>
              </div>
            </div>
            <div className="card-stats-padre"> 
              <div className="card-stats-hijo">
                <div>Hp</div>
                <div className="num-card-detail">{pokemonDetail.hp}</div>
                <div className="barra-card-detail"><div className="barra-vida" style={{width: `${pokemonDetail.hp / 1.5}%`}}></div></div>
              </div>
              <div className="card-stats-hijo">
                <div>Ataque</div>
                <div className="num-card-detail">{pokemonDetail.attack}</div>
                <div className="barra-card-detail"><div className="barra-ataque" style={{width: `${pokemonDetail.attack / 1.5}%`}}></div></div>
              </div>
              <div className="card-stats-hijo">
                <div>Defensa</div>
                <div className="num-card-detail">{pokemonDetail.defense}</div>
                <div className="barra-card-detail"><div className="barra-defensa" style={{width: `${pokemonDetail.defense / 1.5}%`}}></div></div>
              </div>
              <div className="card-stats-hijo">
                <div>Velocidad</div>
                <div className="num-card-detail">{pokemonDetail.speed}</div>
                <div className="barra-card-detail"><div className="barra-velocidad" style={{width: `${pokemonDetail.speed / 1.5}%`}}></div></div>
              </div>
              {pokemonDetail.createdInDb && 
              <div className="div-edit-del">
                <Link to={`/pokemons/edit/${pokemonDetail.id}`}>
                  <button
                    className="edit-pokemon-detail" >
                      Edit Pokemon
                  </button>
                </Link>
                <button
                  onClick={(e) => handlerDelete(e)}
                  className="delete-pokemon-detail" >
                    Delete Pokemon
                </button>
              </div>
              }
            </div>
          </div>
        </div> 
      </div>: <div className="div-loader-gif-pokemons">
        <img className="loader-gif-pokemons1" src={loader} alt="loader" />
        <img className="loader-gif-pokemons2" src={loaderDots} alt="loader" />
      </div>
    }
    </div>
  )
};

export default Detail;