import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../actions/actionsRoot";

const Navbar = () => {
  const uid = useContext(UidContext);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (uid) {
      dispatch(getUser(uid));
    }
  }, [uid]);
  
  return (
    <nav>
      <div className="logo">
        <NavLink exact to="/">
          <div className="icon">
            <img src="./img/icon.png" alt="icon" />
            <h3>Racoont</h3>
          </div>
        </NavLink>
      </div>
      {uid ? (
        <ul>
          <li></li>
          <li>
            <NavLink exact to="/profil">
              <h5>Bienvenue {userData.pseudo}</h5>
            </NavLink>
          </li>
          <Logout />
        </ul>
      ) : (
        <ul>
          <li>
            <NavLink exact to="/liked">
              <i className="fab fa-hotjar"></i>
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/profil">
              <i className="fas fa-sign-in-alt"></i>
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
