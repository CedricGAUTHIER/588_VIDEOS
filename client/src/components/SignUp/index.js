import React from 'react';
import Header from '../Header';
import './SignUp.scss';

function SignUp({pseudo, menuOpened, setMenuOpened}) {
  
  return (
    <div >
      <div className="header">
        <Header
              page={'formulaire d\'inscription'}
              pseudo={pseudo}
              menuOpened={menuOpened}
              setMenuOpened={setMenuOpened}
            />
      </div>
      <div className="sign-up">
       inscription
      </div>
    </div>
    
  );
}

export default SignUp;
