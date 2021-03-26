import React, { useState } from 'react';
import Header from '../Header';
import Title from './Title';
import Year from './Year';
import './Search.scss';


function Search({pseudo, menuOpened, setMenuOpened, searchCriteria, movies, rootURL, previousMovies, setPreviousMovies}) {
  const [criteria, setCriteria]=useState("");
  return (
    <div className="main">
      <div className="header">
        <Header
              page={'recherche'}
              pseudo={pseudo}
              menuOpened={menuOpened}
              setMenuOpened={setMenuOpened}
            />
      </div>
      <div className="search">
        <div className="search-criteria">
          <div className="search-criteria-label">
            <label htmlFor="search-criteria">
              Critère de recherche
            </label> 
          </div>
          <div className="search-criteria-select">  
            <select
              className="search-criteria-select-select"
              name="search-criteria"
              onChange={(evt)=>{
                setCriteria(evt.target.value);
                
              }}  
            >
              {searchCriteria.map(criteria=>(
                <option
                  key={`${criteria.value}`}
                  value={`${criteria.value}`}
                >
                  {criteria.text}
                </option>
              ))
              }
            </select>
          </div>
        </div>
          
        {
        (criteria==="title")&&(
          <Title
            movies={movies}
            rootURL={rootURL}
            previousMovies={previousMovies}
            setPreviousMovies={setPreviousMovies}
          />
          
        )
      }
      {(criteria==="year")&&(
          <Year
            movies={movies}
            rootURL={rootURL}
            previousMovies={previousMovies}
            setPreviousMovies={setPreviousMovies}
          />
          
        ) }
      </div>
      
        
    </div>
  );
}

export default Search;
