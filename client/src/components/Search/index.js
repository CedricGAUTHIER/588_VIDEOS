import React from 'react';
import Header from '../Header';
import './Search.scss';

function Search({pseudo, menuOpened, setMenuOpened}) {
  
  return (
    <div >
      <div className="header">
        <Header
              page={'recherche'}
              pseudo={pseudo}
              menuOpened={menuOpened}
              setMenuOpened={setMenuOpened}
            />
      </div>
      <div className="search">
        SEARCH
      </div>
    </div>
  );
}

export default Search;
