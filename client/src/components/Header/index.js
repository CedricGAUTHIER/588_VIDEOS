import React from 'react';
import Title from './Title';
import Nav from './Nav';


function Header({page, pseudo, burgerOpened, setBurgerOpened, userOpened, setUserOpened}) {
  
  return (
    <div className="header">
        <Title />
        <Nav
          page={page}
          pseudo={pseudo}
          burgerOpened={burgerOpened}
          setBurgerOpened={setBurgerOpened}
          userOpened={userOpened}
          setUserOpened={setUserOpened}
        />
    </div>
  );
}

export default Header;
