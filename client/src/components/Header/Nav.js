import React from 'react';
import './Nav.scss';
import {GiHamburgerMenu} from 'react-icons/gi';
import { FaUserCircle, FaHome } from 'react-icons/fa';
import { TiContacts } from "react-icons/ti";



const Nav = () => {
  return(
    <div className="nav">
      <div className="nav-icon-menu">
        <div className="nav-icon">
          <FaHome
            size={30}
          />
        </div>
        <div className="nav-icon">
          <GiHamburgerMenu
            size={30}
          />
        </div>
      </div>
      <div className="nav-page">
        
      </div>
      <div className="nav-pseudo">
        
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
