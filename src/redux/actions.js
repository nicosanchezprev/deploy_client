import axios from "axios";

export const GET_TYPES = "GET_TYPES";
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_NAME_POKEMONS = "GET_NAME_POKEMONS";
export const GET_POKEMON_DETAIL = "GET_POKEMON_DETAIL";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const CLEAN_POKEMONS = "CLEAN_POKEMONS"; 
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const CLEAN_STYLES ="CLEAN_STYLES";
export const FILTER_POKEMONS_BY_TYPE = "FILTER_POKEMONS_BY_TYPE";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_BY_NAME_ATTACK = "ORDER_BY_NAME_ATTACK";
export const ERROR = "ERROR";
export const EDIT_POKEMON = "EDIT_POKEMON";


export const setError = (payload) => {
  return {
    type: ERROR,
    payload
  }; 
};


export const getTypes = () => {
  return async function(dispatch) {
    try {
      await axios.get("https://deployserver-production.up.railway.app/types", {headers: {
        "accept-encoding": "*",
      }})
    .then((info) => dispatch({ type: GET_TYPES, payload: info.data }));
    } catch (error){
      console.log(error);
    }
  };
};

export const getPokemons = () => {
  return async function(dispatch) {
    try {
      var json = await axios.get("https://deployserver-production.up.railway.app/pokemons", {headers: {
        "accept-encoding": "*",
      }});
      dispatch({ type: GET_POKEMONS, payload: json.data });
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
    }
  };
};

export const getNamePokemons = (name) => {
  return async function(dispatch) {
    try {
      var json = await axios.get("https://deployserver-production.up.railway.app/pokemons?name=" + name.toLowerCase(), {headers: {
        "accept-encoding": "*",
      }});
      return dispatch({ type: GET_NAME_POKEMONS, payload: json.data});
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
    }
  }
}

export const getPokemonDetail = (id) => {
  return async function (dispatch) {
    try {
      await axios.get(`https://deployserver-production.up.railway.app/pokemons/${id}`, {headers: {
        "accept-encoding": "*",
      }})
      .then((info) => dispatch({ type: GET_POKEMON_DETAIL, payload: info.data }));
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
    }
  };
};

export const createPokemon = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("https://deployserver-production.up.railway.app/pokemons", payload);
      return response;
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
    }
  }
};

export const cleanPokemons = () => {
  return { type: CLEAN_POKEMONS };
};

export const cleanDetail = () => {
  return { type: CLEAN_DETAIL };
};

export const cleanStyles = () => {
  return { type: CLEAN_STYLES };
}


export const deletePokemon = (pokemonId) => {
  return async function (dispatch) {
    try {
      await axios.delete(`https://deployserver-production.up.railway.app/pokemons/delete/${pokemonId}`);
      return dispatch({type: GET_POKEMON_DETAIL})
    } catch (error) {
      console.log("No puedo eliminar el pokemon", error);
    }
  }
}

export const updatePokemon = (pokemonId, payload) => {
  return async function (dispatch) {
    try {
      console.log(pokemonId);
      console.log(payload);
      await axios.put(`https://deployserver-production.up.railway.app/pokemons/edit/${pokemonId}`, payload);
      return dispatch({
        type: EDIT_POKEMON
      })
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
    }
  }
};

// Filtrados
export const filterPokemonsByType = (payload) => {
  return {
    type: FILTER_POKEMONS_BY_TYPE, payload
  }
};

export const filterCreated = (payload) => {
  return {
    type: FILTER_CREATED, payload
  }
}

export const orderByNameAttack = (payload) => {
  return{
    type: ORDER_BY_NAME_ATTACK, payload
  }
}