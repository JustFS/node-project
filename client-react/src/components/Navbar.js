import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import axios from 'axios';
import Logout from "./Log/Logout";

const Navbar = () => {
  const [name, setName] = useState('');

  const uid = useContext(UidContext);

  useEffect(() => {
    const getName = async() => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/user/` + uid,
      })
        .then(res => setName(res.data.pseudo))
        .catch(err => console.log(err))
    }
    getName();
  });


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
