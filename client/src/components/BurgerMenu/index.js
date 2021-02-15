import React from 'react';
import { NavLink } from 'react-router-dom';
import './BurgerMenu.scss';

function BurgerMenu({items, setMenuOpened}) {
  
  return (
    <div className="burger">
      <h2 className="burger-title">menu principal</h2>
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
                setMenuOpened({
                  ...setMenuOpened,
                  burgerOpened:false});
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
