import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import axios from 'axios';

const Navbar = () => {
  const [name, setName] = useState('');

  const uid = useContext(UidContext);

  const logout = async() => {
    await axios({
      method: "get",
      url: "http://localhost:5500/api/user/logout",
      withCredentials: true,
    })
      .then(window.location = '/')
      .catch(err => console.log(err))
  };

  useEffect(() => {
    const getName = async() => {
      await axios({
        method: "get",
        url: "http://localhost:5500/api/user/" + uid,
      })
        .then(res => setName(res.data.pseudo))
        .catch(err => console.log(err))
    }
    getName();
  }, [uid, name]);


  return (
    <nav>
      <div className="logo">
        <NavLink exact to="/">
          <h3>Quote App</h3>
        </NavLink>
      </div>
      {uid ? (
        <ul>
          <li></li>
          <li>
          <NavLink exact to="/profil">
            <h5>Bienvenue {name}</h5>
            </NavLink>
          </li>
          <li onClick={logout}>Logout</li>
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
