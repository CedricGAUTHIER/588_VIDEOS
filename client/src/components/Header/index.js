import React from 'react';
import Title from './Title';
import Nav from './Nav';
import './Header.scss';

function Header({page, pseudo, menuOpened, setMenuOpened}) {
  
  return (
    <div className="header">
        <Title />
        <Nav
          page={page}
          pseudo={pseudo}
          menuOpened={menuOpened}
          setMenuOpened={setMenuOpened}
        />
    </div>
  );
}

export default Header;
