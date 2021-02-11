import {React, useState} from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.scss';
import Header from '../Header';
import Home from '../Home';
import BurgerMenu from '../BurgerMenu';
import Videos from '../Videos';
import Search from '../Search';
import CloseUp from '../CloseUp';
import UserMenu from '../UserMenu';
import SignUp from '../SignUp';
import { FaCompactDisc, FaSearch, FaLightbulb, FaUserPlus} from 'react-icons/fa';

function App() {
  //nom de page dans nav
  const [page,setPage]=useState('ACCUEIL');
  // nom du pseudo dans nav
  const [pseudo, setPseudo]=useState('PSEUDO est connecté');
  // gestion du menu burger
    // ouverture-fermeture du menu
  const [burgerOpened, setBurgerOpened]=useState(false);
    // les items du menu par défaut pour un visiteur
  const [burgerMenu, setBurgerMenu]=useState(
    [
      {id:0, icon:<FaCompactDisc />, text:"les vidéos", route:"/videos"},
      {id:1, icon:<FaSearch />, text:"recherche", route:"/search"},
      {id:2, icon:<FaLightbulb />, text:"la proposition du moment", route:"/close-up"},
    ]
  )
  // gestion du menu user
    // ouverture-fermeture du menu
  const [userOpened, setUserOpened]=useState(false);
    // les items du menu par défaut pour un visiteur
  const [userMenu, setUserMenu]=useState(
    [
      {id:0, icon:<FaUserPlus />, text:"inscription", route:"/sign-up"},
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
            userOpened={userOpened}
            setUserOpened={setUserOpened}
          />
        </div>
        
        <Switch>
          <Route 
            exact path="/"
            render={()=>
              <Home setPage={setPage}/>
            }
          />
          <Route 
            exact path="/videos"
            render={()=>
              <Videos setPage={setPage}/>
            }
          />
          <Route 
            exact path="/search"
            render={()=>
              <Search setPage={setPage}/>
            }
          />
          <Route 
            exact path="/close-up"
            render={()=>
              <CloseUp setPage={setPage}/>
            }
          />
          <Route 
            exact path="/sign-up"
            render={()=>
              <SignUp setPage={setPage}/>
            }
          />
        </Switch>
      </div>
      <div className="app-user">
        {userOpened && (<UserMenu items={userMenu} setUserOpened={setUserOpened} />)}
        </div>
    </div>
  );
}

export default App;
