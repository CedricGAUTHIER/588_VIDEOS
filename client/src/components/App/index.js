import {React, useState} from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.scss';
import Header from '../Header';
import Home from '../Home';
import BurgerMenu from '../BurgerMenu';
import Videos from '../Videos';
import Search from '../Search';
import CloseUp from '../CloseUp';
import { FaCompactDisc, FaSearch, FaLightbulb } from 'react-icons/fa';

function App() {
  const [page,setPage]=useState('ACCUEIL');
  const [pseudo, setPseudo]=useState('PSEUDO est connecté');
  const [burgerOpened, setBurgerOpened]=useState(false);
  const [burgerMenu, setBurgerMenu]=useState(
    [
      {id:0, icon:<FaCompactDisc />, text:"les vidéos", route:"/videos"},
      {id:1, icon:<FaSearch />, text:"recherche", route:"/search"},
      {id:2, icon:<FaLightbulb />, text:"la proposition du moment", route:"/close-up"},
  ]
  )
  return (
    <div className="app">
      <div className="app-burger">
        {burgerOpened && (<BurgerMenu items={burgerMenu} setBurgerOpened={setBurgerOpened} />)}
      </div>
      <div className="app-content">
        <div className="app-header">
          <Header
            page={page}
            pseudo={pseudo}
            burgerOpened={burgerOpened}
            setBurgerOpened={setBurgerOpened}
          />
        </div>
        
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/videos" component={Videos}/>
          <Route exact path="/search" component={Search}/>
          <Route exact path="/close-up" component={CloseUp}/>
        </Switch>
      </div>
    </div>
  );
}

export default App;
