import React, { useState, useContext, useEffect } from "react";
import DeleteCard from "./DeleteCard";
import axios from "axios";
import { UidContext } from "../AppContext";
import LikeButton from "./LikeButton";
import CardComments from "./CardComments";

const Cards = ({ card }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [pseudo, setPseudo] = useState(null);
  const [userPic, setUserPic] = useState({});
  const [showComments, setShowComments] = useState(false);

  const uid = useContext(UidContext);

  const handleShowComments = () => setShowComments(!showComments);

  const updateItem = () => {
    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/post/` + card._id,
      data: {
        message: textUpdate ? textUpdate : card.message,
      },
    })
      .then((res) => {
        console.log("Modifié");
      })
      .catch((err) => {
        console.log(err);
      });

    setIsUpdated(false);
  };

  useEffect(() => {
    const getUserData = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/user/` + card.userId,
      })
        .then((res) => {
          setUserPic(res.data.picture);
          setPseudo(res.data.pseudo);
        })
        .catch((err) => console.log(err));
    };
    getUserData();


    console.log(Date.parse(card.createdAt));
  }, [card.userId]);

  const dateParser = (num) => {
    let timestamp = Date.parse(num);
    return new Date(timestamp * 1000).format('h:i:s');

    return timestamp
  }

  return (
    <li>
      <div className="card-container">
        <div className="card-left">
          <img src={userPic} alt="" />
        </div>
        {isUpdated === false && (
          <div className="card-right">
            <div className="card-header">
              <h3>{pseudo}</h3>
              <span>publié le {dateParser(card.createdAt)}</span>
            </div>
            <p>{card.message}</p>
            {uid === card.userId && (
              <div className="button-container">
                <button onClick={() => setIsUpdated(true)}>Modifier</button>
                <DeleteCard id={card._id} />
              </div>
            )}
            <div className="card-footer">
              <div className="comment-icon">
                <i
                  onClick={handleShowComments}
                  className="far fa-comment-alt"
                ></i>
                <span>{card.comments.length}</span>
              </div>
              <LikeButton card={card} />
              <i className="fas fa-share-alt"></i>
            </div>
            {showComments && <CardComments card={card} userPic={userPic} />}
          </div>
        )}

        {isUpdated && (
          <div className="update-post">
            <h3>{pseudo}</h3>
            <textarea
              defaultValue={card.message}
              onChange={(e) => setTextUpdate(e.target.value)}
            />
            <div className="button-container">
              <button onClick={updateItem}>Valider</button>
              <DeleteCard id={card._id} />
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

export default Cards;
