import React, { useState, useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.scss';
import Home from '../Home';
import BurgerMenu from '../BurgerMenu';
import Videos from '../Videos';
import Search from '../Search';
import CloseUp from '../CloseUp';
import UserMenu from '../UserMenu';
import SignUp from '../SignUp';
import Contact from '../Contact';
import Title from '../Header/Title'; 
import { FaCompactDisc, FaSearch, FaLightbulb, FaUserPlus} from 'react-icons/fa';
import axios from "axios";
const rootURL = "http://localhost:3001";

function App() {
    
  // nom du pseudo dans nav
  const [pseudo, setPseudo]=useState("Vous n'êtes pas connecté");
  // gestion du menu burger
    // ouverture-fermeture du menu
  
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
    const [menuOpened, setMenuOpened] = useState ({burgerOpened: false, userOpened:false})
  
    // les items du menu par défaut pour un visiteur
  const [userMenu, setUserMenu]=useState(
    [
      {id:0, icon:<FaUserPlus />, text:"inscription", route:"/sign-up"},
    ]);
    // user : pseudo et email
    const [user, setUser]=useState({pseudo: 'Le pseudo', email:'mail@xxx.yyy'});
    //Allvideos
    const [movies, setMovies] = useState([]);    
    
    const fetchVideos = async () => {
      try{
        const allVideos= await axios({
            method: "get",
            url: `${rootURL}/api/videos`,
        })
        
        setMovies(allVideos.data);
        
      }
      catch(error){
        console.error(error);
      }
    }
    useEffect(()=> {
      fetchVideos();
    } , []);
  return (
    <div className="app">
            
      <div className="app-burger">
        {menuOpened.burgerOpened && (<BurgerMenu items={burgerMenu} setMenuOpened={setMenuOpened} />)}
      </div>
      
      <div className="app-content">
        
        
        <Switch>
          <Route exact path="/" >
            <Home
              pseudo={pseudo}
              menuOpened={menuOpened}
              setMenuOpened={setMenuOpened}
            />
          </Route>
          <Route exact path="/videos" >
          
            <Videos
              pseudo={pseudo}
              menuOpened={menuOpened}
              setMenuOpened={setMenuOpened}
              movies={movies}
            />
          </Route>
          <Route exact path="/search" >
            <Search
              pseudo={pseudo}
              menuOpened={menuOpened}
              setMenuOpened={setMenuOpened}
              
            />
          </Route>
          <Route exact path="/close-up" >
            <CloseUp
                pseudo={pseudo}
                menuOpened={menuOpened}
                setMenuOpened={setMenuOpened}
                
              />
            
          </Route>
          <Route exact path="/sign-up" >
            <SignUp
                pseudo={pseudo}
                menuOpened={menuOpened}
                setMenuOpened={setMenuOpened}
                
              />
            
          </Route>
          <Route exact path="/contact" >
            <Contact
                pseudo={pseudo}
                menuOpened={menuOpened}
                setMenuOpened={setMenuOpened}
                user={user}
              />
          </Route>
          
        </Switch>
      </div>
      <div className="app-user">
        {menuOpened.userOpened && (<UserMenu items={userMenu} setMenuOpened={setMenuOpened} />)}
        </div>
    </div>
  );
}

export default App;
