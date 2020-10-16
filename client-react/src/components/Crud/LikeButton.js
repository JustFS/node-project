import React, { useState, useContext, useEffect } from "react";
import { UidContext } from "../AppContext";
import axios from "axios";

const LikeButton = ({ card }) => {
  const [liked, setLiked] = useState(false);

  const uid = useContext(UidContext);

  const fetchLike = (type, bool) => {
    axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/` + type + `-post/` + card._id,
      data: {
        id: uid,
      },
    })
      .catch((err) => {
        console.log(err);
      });
    setLiked(bool);
  };

  useEffect(() => {
    const isLiked = async () => {
      if (card.likers.includes(uid)) setLiked(true);
      else setLiked(false);
    };
    
    isLiked();
  }, [uid, card.likers, liked]);

  return (
    <div className="like-container">
      {liked === false && (
        <i onClick={() => fetchLike("like", true)} className="far fa-heart"></i>
      )}
      {liked && (
        <i onClick={() => fetchLike("unlike", false)} className="fas fa-heart"></i>
      )}
      <span>{card.likers.length}</span>
    </div>
  );
};

export default LikeButton;
