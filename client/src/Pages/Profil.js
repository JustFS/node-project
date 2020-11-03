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
    <div className="profil-page">
      {isConnected ? (
        <div className="profil-container">
            <UpdateProfil />
        </div>
      ) : (
        <div className="log-container">
          <Log signin={false} signup={true} />
          <div className="img-container">
            <img src="./img/log.svg" alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;
