import { 
  CLEAN_DETAIL, 
  CLEAN_POKEMONS, 
  CLEAN_STYLES, 
  CREATE_POKEMON, 
  GET_POKEMONS, 
  GET_NAME_POKEMONS, 
  GET_POKEMON_DETAIL, 
  FILTER_POKEMONS_BY_TYPE,
  FILTER_CREATED,
  ORDER_BY_NAME_ATTACK,
  GET_TYPES,
  ERROR,
  EDIT_POKEMON
} from "./actions";

const initialState = {
  types: [],
  pokemons: [],
  allPokemons: [],
  pokemonDetail: {},
  error: ""
};

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case ERROR:
      return{
        ...state,
        error: action.payload
      }

    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      }

    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload
      };
    
    case GET_NAME_POKEMONS:
      return {
        ...state,
        pokemons: [action.payload],
      }

    case GET_POKEMON_DETAIL:
      return {
        ...state,
        pokemonDetail: action.payload,
      };
    
    case CREATE_POKEMON:
      return{
        ...state,
      }
    
    case CLEAN_POKEMONS:
      return{
        ...state,
        pokemons: [],
        allPokemons: []
      }

    case CLEAN_DETAIL:
      return{
        ...state,
        pokemonDetail: {},
      }

    case CLEAN_STYLES:
      return{
        ...state,
        styles: []
      }  

    case EDIT_POKEMON:
      return{
        ...state,
      }

    case FILTER_POKEMONS_BY_TYPE:
      const allPokemons = state.allPokemons;
      const statusFiltered = action.payload === "all" ? allPokemons : allPokemons.filter( p => p.types.find(t => t === action.payload))
      return{
        ...state,
        pokemons: statusFiltered
      }

    case FILTER_CREATED:
      const createdFilter = action.payload === "created" ? state.allPokemons.filter(e => e.createdInDb) : state.allPokemons.filter(e => !e.createdInDb)
      return {
        ...state,
        pokemons: action.payload === "all" ? state.allPokemons : createdFilter
      }

    case ORDER_BY_NAME_ATTACK:
      const allPokeCopy = [...state.pokemons];
      let orderArr;
        if(action.payload === "asc") {
          let auxArr = allPokeCopy.sort((a, b) => {
            if(a.name > b.name) {
              return 1;
            }
            if(b.name > a.name) {
              return -1;
            }
            return 0;
          })
          orderArr = auxArr;
        } else if (action.payload === "desc") {
          let auxArr = allPokeCopy.sort((a, b) => {
            if(a.name > b.name) {
              return -1;
            }
            if(b.name > a.name) {
              return 1;
            }
            return 0;
          })
          orderArr = auxArr;
        } else if (action.payload === "pod") {
          let auxArr = allPokeCopy.sort((a, b) => {
            if(a.attack > b.attack) {
              return -1;
            }
            if(b.attack > a.attack) {
              return 1;
            }
            return 0;
          })
          orderArr = auxArr;
        } else if(action.payload === "deb") {
          let auxArr = allPokeCopy.sort((a, b) => {
            if(a.attack > b.attack) {
              return 1;
            }
            if(b.attack > a.attack) {
              return -1;
            }
            return 0;
          })
          orderArr = auxArr;
        }
      return {
        ...state,
        pokemons: action.payload === "default" ? state.allPokemons : orderArr
      }
    default:
      return { ...state };
  }
};

export default rootReducer;