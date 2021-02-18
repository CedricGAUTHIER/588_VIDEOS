import React from 'react';
import Header from '../Header';
import Main from '../Thumbnails/Main'
import './Videos.scss';



function Videos({pseudo, movies, menuOpened, setMenuOpened})  {
  
  
  return (
    <div >
      <div className="header">
      <Header
            page={'les vidéos'}
            pseudo={pseudo}
            menuOpened={menuOpened}
            setMenuOpened={setMenuOpened}
          />
      </div>
    

    <div className="videos">
      {movies.map((movie)=>{
        return <Main 
          key={movie.id}
          movie={movie}
        />
      })}
      
    </div>
  </div>
  );
}

export default Videos;
