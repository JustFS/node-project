import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../components/AppContext";
import Log from "../components/Log";
import UpdateProfil from "../components/Profil/UpdateProfil";

const Profil = () => {
  const [isConnected, setIsConnected] = useState(false);
  const uid = useContext(UidContext);

  useEffect(() => {
    if (uid) setIsConnected(true);
  }, [uid]);

  return (
    <>
      {isConnected ? (
        <div className="profil-container">
          <div className="menu">
            <h2>Paramètres du profil</h2>
          </div>
          <div className="content">
            <UpdateProfil />
          </div>
        </div>
      ) : (
        <Log />
      )}
    </>
  );
};

export default Profil;
