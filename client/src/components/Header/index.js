import React from 'react';
import Title from './Title';
import Nav from './Nav';


function Header({page, pseudo, burgerOpened, setBurgerOpened}) {
  
  return (
    <div className="header">
        <Title />
        <Nav
          page={page}
          pseudo={pseudo}
          burgerOpened={burgerOpened}
          setBurgerOpened={setBurgerOpened}
        />
    </div>
  );
}

export default Header;
