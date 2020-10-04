import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <NavLink exact to="/">
          <h3>Quote App</h3>
        </NavLink>
      </div>
      <ul>
        <li>
          <NavLink exact to="/liked">
            <span>Most Liked</span>
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/api">
            <span>API</span>
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/profil">
            <span>Profil</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
