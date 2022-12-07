import "./EditPokemon.css";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, getPokemonDetail, updatePokemon, cleanDetail } from '../../redux/actions';
import { Link, useHistory, useParams } from 'react-router-dom';


function validate(input) {
  let errors = {};
  if (!input.name || input.name.length < 3) {
    errors.name = "Debe tener un nombre de mas de tres letras";
  }

  if (!input.hp || input.hp < 1 || input.hp > 150) {
    errors.hp = "Debe tener hp entre 1 - 150";
  }

  if (!input.attack || input.attack < 1 || input.attack > 150) {
    errors.attack = "Debe tener ataque entre 1 - 150";
  }

  if (!input.defense || input.defense < 1 || input.defense > 150) {
    errors.defense = "Debe tener defensa entre 1 - 150";
  }

  if (!input.speed || input.speed < 1 || input.speed > 150) {
    errors.speed = "Debe tener velocidad entre 1 - 150";
  }

  if(!input.height || input.height <= 0  ||input.height.length < 2) {
    errors.height = "Ej: 20 = 2.0m | 17 = 1.7m | 7 = 0.7m"
  }

  if(!input.weight || input.weight <= 0 || input.weight.length < 2) {
    errors.weight = "Ej: 800 = 80kg | 870 = 87.0kg | 80 = 8kg | 87 = 8.7kg"
  }

  if (input.types.length === 0) {
    errors.types = "Debe tener por lo menos un tipo";
  }
  return errors;
};



const EditPokemon = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const types = useSelector((state) => state.types);
  const allPokes = useSelector((state) => state.pokemons);
  const pokemonDetail = useSelector((state) => state.pokemonDetail);
  pokemonDetail.types = [];

  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name:"",
    hp:"",
    attack:"",
    defense:"",
    speed:"",
    height:"",
    weight:"",
    img:"",
    types:[],
  })

  // VALIDACIONES 

  let btnDisabled =
    !(
      input.name.length &&
      input.types.length &&
      input.hp &&
      input.attack &&
      input.defense &&
      input.speed 
    ) ||
    input.hp > 150 ||
    input.attack > 150 ||
    input.defense > 150 ||
    input.speed > 150;
  

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemonDetail(id));
    return dispatch(cleanDetail());
  },[dispatch, id]);

  useEffect(() => {
    if(pokemonDetail.name) {
      setInput(pokemonDetail);
    }
  }, [pokemonDetail]);

  useEffect(() => {
    setErrors(
      validate({
        ...input,
      })
    );
  }, [input]);



  const handlerSubmit = (event) => {
    dispatch(updatePokemon(id, input));
    alert("¡Tu pokemon fue editado con exito!");
    setInput({
      name:"",
      hp:"",
      attack:"",
      defense:"",
      speed:"",
      height:"",
      weight:"",
      img:"",
      types:[],
    });
    history.replace(`/pokemons/${id}`);
  };


  const changeHandler = (event) => {
    let property = event.target.name;
    let value = event.target.value;
    if(property === "name") {
      value = value.toLowerCase().trim();
    }
    setInput({
      ...input,
      [property]: value
    })

    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const selectHandler = (event) => {
    if(!input.types.includes(event.target.value)) {
      setInput({
        ...input,
        types: [...input.types, event.target.value]
      });
    }
  };

  const deleteHandler = (event) => {
    setInput({
      ...input,
      types: input.types.filter((t) => t !== event),
    })
  };

  return (
    <div className="div-principal-create">
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
     <div className="div-padre-form">
      <form className="form-create" onSubmit={(e) => handlerSubmit(e)}>
      <div className="titulo-form">
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pokeball" width={24} height={24} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <circle cx={12} cy={12} r={9}></circle>
          <circle cx={12} cy={12} r={3}></circle>
          <path d="M3 12h6"></path>
          <path d="M15 12h6"></path>
        </svg>
        <h4>¡Edita tu pokemon!</h4>
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pokeball" width={24} height={24} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <circle cx={12} cy={12} r={9}></circle>
          <circle cx={12} cy={12} r={3}></circle>
          <path d="M3 12h6"></path>
          <path d="M15 12h6"></path>
        </svg>
      </div>
      <div className="div-hijo-form">
        <div className="form-mitad1">
          <div className="div-column-ind">
            <label htmlFor="name">Name</label>
            <input className="input-style-text" type="text" name="name" value={input.name} onChange={(e) =>changeHandler(e)} ></input>
            {errors.name && (
              <p className="error">{errors.name}</p>
            )}
          </div>
          <div className="div-column-ind">
            <label htmlFor="hp">Hp</label>
            <input className="input-style-number" type="number" name="hp" value={input.hp} onChange={(e) => changeHandler(e)} ></input>
            {errors.hp && (
              <p className="error">{errors.hp}</p>
            )}
          </div>
          <div className="div-column-ind">
            <label htmlFor="attack">Attack</label>
            <input className="input-style-number" type="number" name="attack" value={input.attack} onChange={(e) => changeHandler(e)} ></input>
            {errors.attack && (
              <p className="error">{errors.attack}</p>
            )}
          </div>
          <div className="div-column-ind">
            <label htmlFor="defense">Defense</label>
            <input className="input-style-number" type="number" name="defense" value={input.defense} onChange={(e) => changeHandler(e)} ></input>
            {errors.defense && (
              <p className="error">{errors.defense}</p>
            )}
          </div>
          <div className="div-column-ind">
            <label htmlFor="speed">Speed</label>
            <input className="input-style-number" type="number" name="speed" value={input.speed} onChange={(e) => changeHandler(e)} ></input>
            {errors.speed && (
              <p className="error">{errors.speed}</p>
            )}
          </div>
          </div>
        <div className="form-mitad2">
          <div className="div-column-ind">
            <label htmlFor="height">Height</label>
            <input className="input-style-number" type="number" name="height" value={input.height} onChange={(e) => changeHandler(e)} ></input>
            {errors.height && (
              <p className="error">{errors.height}</p>
            )}
          </div>
          <div className="div-column-ind">
            <label htmlFor="weight">Weight</label>
            <input className="input-style-number" type="number" name="weight" value={input.weight} onChange={(e) => changeHandler(e)} ></input>
            {errors.weight && (
              <p className="error">{errors.weight}</p>
            )}
          </div>
          <div className="div-column-ind">
            <label htmlFor="img">Img</label>
            <input className="input-style-text" type="text" name="img" value={input.img} placeholder="URL" onChange={(e) => changeHandler(e)} ></input>
          </div>
          <div className="div-column-ind">
          <p>Tipos</p>
            <select className="select-types" onChange={(e) => selectHandler(e)}>
            <option value="title" disabled name="types">Types</option>
            {types.map((t) => (
              <option value={t.id} key={t.id}>{t.name}</option>
            ))}
            </select>
            <ul className="lista-types-elegidos">
            {input.types.map((t) => {
              let aux = types.find((type) => type.id === parseInt(t));
              return (
              <li key={t} onClick={() => deleteHandler(t)} className="lista-types-li">
                {[aux.name + " "]}
                </li>
              );
            })}
            </ul>
            {errors.types && (
              <p className="error">{errors.types}</p>
            )}
          </div>
          <div className="form-mitad3">
            <button className="boton-submit-create" type="submit" disabled={btnDisabled}>EDITAR</button>
          </div>
        </div>
      </div>
      </form>
      <div>
      </div>
      </div>
    </div>
  )
};

export default EditPokemon;