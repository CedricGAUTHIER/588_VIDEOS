import React from 'react';
import { NavLink } from 'react-router-dom';
import './BurgerMenu.scss';

function BurgerMenu({items, setBurgerOpened}) {
  
  return (
    <div className="burger">
       <ul >
          {items.map(item => (
            <li key={item.id}>
            <div className="icon">
              {item.icon}
            </div>
            <div >
              <NavLink
                className="text"
                exact to={item.route}
                onClick={()=>{
                  setBurgerOpened(false);
                }}
                >
                {item.text}
              </NavLink>
            </div>
          </li>
          ))}
          
          

         
         
       </ul>
    </div>
  );
}

export default BurgerMenu;
