import React from 'react';
import logo from '../../assets/images/logo.jpg';
import './Title.scss';


const Title = () => {
  return(
  <div className="title">
    <img className="title-logo" src={logo} alt="logo of 588_videos"></img>
    <h1 className="title-title"> 588_VIDEOS</h1>
  </div>
  );
}

export default Title;
