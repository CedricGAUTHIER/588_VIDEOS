import React from 'react';
import Header from '../Header';
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
        return <div key={movie.id}>{movie.title}</div>
      })}
      
    </div>
  </div>
  );
}

export default Videos;
