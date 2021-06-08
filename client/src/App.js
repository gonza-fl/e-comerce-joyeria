import React from 'react'
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Home } from './Components/Home';
import Nav from './Components/Nav/Nav';
import{Catalogo} from "./Components/Catalogo/Catalogo"

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route path='/' component={Catalogo}/>
      </Switch>
    </div>
  );
}

export default App;
