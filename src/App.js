import './App.css';

// import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from './components/Home/Home';
import Pokemons from './components/Pokemons/Pokemons';
import Detail from './components/Detail/Detail';
import Create from './components/Create/Create';
import EditPokemon from './components/EditPokemon/EditPokemon';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/pokemons" component={Pokemons} /> 
        <Route exact path="/pokemons/:id" component={Detail} /> 
        <Route exact path="/pokemons/edit/:id" component={EditPokemon} /> 
        <Route exact path="/create" component={Create} /> 
      </Switch>
    </div>
  );
}
export default App;
