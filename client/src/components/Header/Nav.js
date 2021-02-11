import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.scss';
import {GiHamburgerMenu} from 'react-icons/gi';
import { FaUserCircle, FaHome } from 'react-icons/fa';
import { TiContacts } from "react-icons/ti";




const Nav = ({page, pseudo, burgerOpened, setBurgerOpened}) => {
  return(
    <div className="nav">
      <div className="nav-icon-menu">
        <div className="nav-icon">
          <NavLink exact to="/">
            <FaHome
              size={30}
              onClick= {()=>{
                setBurgerOpened(false)
              }}
            />
          </NavLink>
        </div>
        <div className="nav-icon">
          <GiHamburgerMenu
            size={30}
            onClick= {()=>{
              setBurgerOpened(!burgerOpened)
            }}
          />
        </div>
      </div>
      <div className="nav-page">
        {page}
      </div>
      <div className="nav-pseudo">
        {pseudo}
      </div>
      <div className="nav-icon-menu">
        <div className="nav-icon">
          <FaUserCircle
            size={30}
          />
        </div>
        <div className="nav-icon">
          <TiContacts
            size={30}
          />
        </div>
      </div>
     
    </div>
    
    
    
  );
}

export default Nav;
