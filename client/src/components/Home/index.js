import React from 'react';
import Header from '../Header';
import logo from '../../assets/images/logo.jpg';
import './Home.scss';
function Home({pseudo, menuOpened, setMenuOpened}) {
  
  return (
    <div >
      <div className="header">
        <Header
              page={'accueil'}
              pseudo={pseudo}
              menuOpened={menuOpened}
              setMenuOpened={setMenuOpened}
          />
      </div>
      <div className="home">
        <img className="home-logo" src={logo} alt="logo of 588_videos"></img>
      </div>
    </div>
  );
}

export default Home;
