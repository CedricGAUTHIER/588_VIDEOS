import React from 'react';
import Header from '../Header';
import Details from '../Thumbnails/Details'
import './CloseUp.scss';


const CloseUp=({pseudo, menuOpened, setMenuOpened, closeUpMovie})=> {
  
  
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
      
        <Details
          
          movie={closeUpMovie}
          
        />
        
        
        

      </div>
    </div>
    
    
    
  );
}

export default CloseUp;
