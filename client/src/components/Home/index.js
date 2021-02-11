import React from 'react';
import logo from '../../assets/images/logo.jpg';
import './Home.scss';
function Home({setPage}) {
  setPage('accueil');
  return (
    <div className="home">
       
       <img className="home-logo" src={logo} alt="logo of 588_videos"></img>
    </div>
  );
}

export default Home;
