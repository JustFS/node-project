import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import axios from "axios";

const UpdateProfil = () => {
  const [userData, setUserData] = useState({});

  const uid = useContext(UidContext);

  const getName = async () => {
    await axios({
      method: "get",
      url: "http://localhost:5500/api/user/" + uid,
    })
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <div className="update-container">
      <div className="text">
        <h3>Inscrit depuis le : {userData.date} </h3>
        <h3>pseudo : {userData.pseudo}</h3>
        <h5>Changer Email</h5>
        <input type="text" />
        <div className="password">
          <h3>Changer mot de passe</h3>
          <h5>Mot de passe actuel : </h5>
          <input type="password" />
          <h5>Nouveau mot de passe</h5>
          <input type="password" />
          <h5>Confirmer mot de passe</h5>
          <input type="password" />
        </div>
      </div>
      <div className="pic">
        <h3>Photo de profil</h3>
        <img src={userData.picture} alt=""/>
      </div>
    </div>
  );
};

export default UpdateProfil;
