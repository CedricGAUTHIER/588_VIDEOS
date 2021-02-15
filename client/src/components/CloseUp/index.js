import React from 'react';
import Header from '../Header';
import './CloseUp.scss';

function CloseUp({pseudo, menuOpened, setMenuOpened}) {
  
  return (
    <div >
      <div className="header">
        <Header
              page={'la proposition du moment'}
              pseudo={pseudo}
              menuOpened={menuOpened}
              setMenuOpened={setMenuOpened}
            />
      </div>
      <div className="CloseUp">
        Page CloseUp
      </div>
    </div>
    
    
    
  );
}

export default CloseUp;
