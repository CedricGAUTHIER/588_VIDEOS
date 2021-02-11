import React from 'react';
import { NavLink } from 'react-router-dom';
import './UserMenu.scss';

function UserMenu({items, setUserOpened}) {
  
  return (
    <div className="user">
      <h2 className="user-title">menu utilisateur</h2>
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
                setUserOpened(false);
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

export default UserMenu;
