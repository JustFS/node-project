import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../components/AppContext";
import Log from "../components/Log";
import PostsLiked from "../components/Profil/PostsLiked";
import PostsProfil from "../components/Profil/PostsProfil";
import UpdateProfil from "../components/Profil/UpdateProfil";

const Profil = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [update, setUpdate] = useState(true);
  const [posts, setPosts] = useState(false);
  const [liked, setLiked] = useState(false);

  const uid = useContext(UidContext);

  useEffect(() => {
    if (uid) setIsConnected(true);
  }, [uid]);

  const setSlider = (e) => {
    console.log();
    setUpdate(false);
    setPosts(false);
    setLiked(false);
    if (e.target.id === "update") setUpdate(true);
    if (e.target.id === "posts") setPosts(true);
    if (e.target.id === "liked") setLiked(true);
  };

  return (
    <>
      {isConnected ? (
        <div className="profil-container">
          <div className="menu">
            <h2
              onClick={setSlider}
              className={update ? "active-slider" : null}
              id="update"
            >
              Paramètres du profil
            </h2>
            <h2
              onClick={setSlider}
              className={posts ? "active-slider" : null}
              id="posts"
            >
              Mes postes
            </h2>
            <h2
              onClick={setSlider}
              className={liked ? "active-slider" : null}
              id="liked"
            >
              Mes postes aimés
            </h2>
          </div>
          <div className="content">
            {update && <UpdateProfil />}
            {posts && <PostsProfil />}
            {liked && <PostsLiked />}
          </div>
        </div>
      ) : (
        <Log />
      )}
    </>
  );
};

export default Profil;
