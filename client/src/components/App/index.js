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
import AddMovie from '../Test/AddMovie';
import { FaCompactDisc, FaSearch, FaLightbulb, FaUserPlus} from 'react-icons/fa';
import axios from "axios";

const rootURL = "http://localhost:3001";

const App=()=> {
  
  // nom du pseudo dans nav
  const [pseudo, setPseudo]=useState("");
  const [previousMovies,setPreviousMovies]=useState([]);
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
    const [user, setUser]=useState({pseudo: '', email:'mail@xxx.yyy'});
    //Allvideos
    
    const [movies, setMovies] = useState([]);    
    const [collections, setCollections]=useState([]);

    const[tmdbId,setTmdbId]=useState("");
    const [closeUpMovie, setCloseUpMovie]=useState({})
    const [searchCriteria,setSearchCriteria]=useState([
      {value:"",text:"Choisir un critère de recherche"},
      {value:"title",text:"Recherche par titre"},
      {value:"year",text:"Recherche par année"},
      {value:"collection",text:"Recherche par collection"},
      {value:"runtime",text:"Recherche par durée"},
      {value:"profitability-ratio",text:"Recherche par coefficient de profitabilité"},
      {value:"genre",text:"Recherche par genre"},
      {value:"for_adult",text:"Pour adulte/tout public"},
      {value:"actor",text:"Recherche par acteur"},
      {value:"director",text:"Recherche par réalisateur"},
      {value:"country",text:"Recherche par pays d'origine"},
      {value:"company",text:"Recherche par société de production"},
    ])




    const fetchVideos = async () => {
      try{
        const randomInArray=(array)=> (Math.floor(Math.random()*(array.length)))
        
        const allVideos= await axios({
            method: "get",
            url: `${rootURL}/api/videos`,
        })
        const movies= allVideos.data;
        setMovies(movies);

        const ids=[];
        const collectionIds=[];
        movies.forEach(movie => {
          ids.push(movie.tmdb_id)
          collectionIds.push(movie.collection_id)
        });
        
        const collectionIdsWithoutDuplicates=[];
        for (const id of collectionIds){
          let found=collectionIdsWithoutDuplicates.filter(element=> element===id);
          if (found.length===0 && id){
            collectionIdsWithoutDuplicates.push(id)
          }
        }

        const collectionsObject=[];
        for (const id of collectionIdsWithoutDuplicates){
          const name=await axios({
            method:'get',
            url:`${rootURL}/api/collection/${id}`
          })
          collectionsObject.push({id:id, name:name.data});
        }
        setCollections(collectionsObject);

        const randomMovieTmdbId=ids[randomInArray(ids)];
                
        const randomMovie= await axios({
            method: "get",
            url: `${rootURL}/api/video/${randomMovieTmdbId}`,
        })
        const movieDetails= randomMovie.data;
        

        setCloseUpMovie(movieDetails);








        
      }
      catch(error){
        console.error(error);
      }
    };
    
    useEffect(()=> {
      console.log("useEffect");
      fetchVideos();
      //test();
      
      
    },[]);
    
    
  return (
    <div className="app">
            
      <div className="app-burger">
        {menuOpened.burgerOpened && (<BurgerMenu items={burgerMenu} setMenuOpened={setMenuOpened} />)}
      </div>
      
      <div className="app-content">
        
        <Switch>
          <Route exact path="/" >
            <Home
              pseudo={user.pseudo}
              menuOpened={menuOpened}
              setMenuOpened={setMenuOpened}
            />
          </Route>
          <Route exact path="/videos" >
          {console.log("videos dans App",movies)}
            <Videos
              pseudo={user.pseudo}
              menuOpened={menuOpened}
              setMenuOpened={setMenuOpened}
              movies={movies}
            />
          </Route>
          <Route exact path="/search" >
            <Search
              pseudo={user.pseudo}
              menuOpened={menuOpened}
              setMenuOpened={setMenuOpened}
              searchCriteria={searchCriteria}
              movies={movies}
              rootURL={rootURL}
              previousMovies={previousMovies}
              setPreviousMovies={setPreviousMovies}
              collections={collections}

            />
          </Route>
          <Route exact path="/close-up" >
            
          
            <CloseUp
                pseudo={user.pseudo}
                menuOpened={menuOpened}
                setMenuOpened={setMenuOpened}
                closeUpMovie={closeUpMovie}
                
                               
              />
            
          </Route>
          <Route exact path="/sign-up" >
            <SignUp
                menuOpened={menuOpened}
                setMenuOpened={setMenuOpened}
                user={user}
                setUser={setUser}
                rootURL={rootURL}
                
                
              />
            
          </Route>
          <Route exact path="/contact" >
            <Contact
                menuOpened={menuOpened}
                setMenuOpened={setMenuOpened}
                user={user}
              />
          </Route>
          <Route exact path="/test/update_movie/support_id" >
            <div>
              Mise à jour de "movie" - "support_ID"
            </div>
            
          </Route>
          <Route exact path="/test/update_movie/support_id" >
            <div>
              Mise à jour de "movie" - "support_ID"
            </div>
            
          </Route>
          <Route exact path="/test/update_movie/add_movie" >
            <AddMovie
              tmdbId={tmdbId}
              setTmdbId={setTmdbId}
              rootURL={rootURL}
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
