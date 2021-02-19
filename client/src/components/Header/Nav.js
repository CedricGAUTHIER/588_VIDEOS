import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.scss';
import {GiHamburgerMenu} from 'react-icons/gi';
import { FaUserCircle, FaHome } from 'react-icons/fa';
import { TiContacts } from "react-icons/ti";




const Nav = ({page, pseudo, menuOpened, setMenuOpened}) => {
  let messageSign="";  
  (pseudo==="")? (messageSign="NON connecté"):(messageSign=`${pseudo} est connecté`)
  
  return(
    <div className="nav">
      <div className="nav-icon-menu">
        <div className="nav-icon">
          <NavLink exact to="/">
            <FaHome
              color= 'white'
              size={30}
              onClick= {()=>{
                setMenuOpened({
                  burgerOpened:false,
                  userOpened:false});
              }}
            />
          </NavLink>
        </div>
        <div className="nav-icon">
          <GiHamburgerMenu
            color= 'white'
            className="link"
            size={30}
            onClick= {()=>{
              setMenuOpened({
                  burgerOpened:!menuOpened.burgerOpened,
                  userOpened:false
                  });
              
              
            }}
          />
        </div>
      </div>
      <div className="nav-page">
        {page}
      </div>
      <div className="nav-pseudo">
        {messageSign}
      </div>
      <div className="nav-icon-menu">
        <div className="nav-icon">
          <FaUserCircle
            className="link"
            color= 'white'
            size={30}
            onClick= {()=>{
              setMenuOpened({
                  burgerOpened:false,
                  userOpened:!menuOpened.userOpened
                  });
              
            }}
          />
        </div>
        <div className="nav-icon">
          <NavLink exact to="/contact">
            <TiContacts
              className="link"
              color= 'white'
              size={30}
              onClick= {()=>{
                setMenuOpened({
                  burgerOpened:false,
                  userOpened:false
                  });
              }}
            />
          </NavLink>
          
        </div>
      </div>
     
    </div>
    
    
    
  );
}

export default Nav;
