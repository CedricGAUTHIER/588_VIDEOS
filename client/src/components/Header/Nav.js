import {React} from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.scss';
import {GiHamburgerMenu} from 'react-icons/gi';
import { FaUserCircle, FaHome } from 'react-icons/fa';
import { TiContacts } from "react-icons/ti";




const Nav = ({page, pseudo, burgerOpened, setBurgerOpened, userOpened, setUserOpened}) => {
  
  return(
    <div className="nav">
      <div className="nav-icon-menu">
        <div className="nav-icon">
          <NavLink exact to="/">
            <FaHome
              color= 'white'
              size={30}
              onClick= {()=>{
                setBurgerOpened(false);
                setUserOpened(false);
                
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
              setBurgerOpened(!burgerOpened)
              setUserOpened(false);
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
            className="link"
            color= 'white'
            size={30}
            onClick= {()=>{
              setBurgerOpened(false);
              setUserOpened(!userOpened)
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
                setBurgerOpened(false);
                setUserOpened(false);
              }}
            />
          </NavLink>
          
        </div>
      </div>
     
    </div>
    
    
    
  );
}

export default Nav;
