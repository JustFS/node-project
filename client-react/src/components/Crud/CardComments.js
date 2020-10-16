import React, { useEffect, useState, useContext } from "react";
import { UidContext } from "../AppContext";
import axios from "axios";
import EditDeleteComment from "./EditDeleteComment";

const CardComments = ({ card }) => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState("");

  const uid = useContext(UidContext);

  const showComments = () => {
    setShow(!show);
  };

  const handleComment = (e) => {
    e.preventDefault();

    axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/comment-post/` + card._id,
      data: {
        commenterId: uid,
        commenterPic: pic,
        pseudo: name,
        text,
      },
    })
      .then((res) => setText(""))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const getName = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/user/` + uid,
      })
        .then((res) => {
          setName(res.data.pseudo)
          setPic(res.data.picture)
        })
        .catch((err) => console.log(err));
    };
    if (uid) getName();
  }, [uid]);

  return (
    <div className="comments-container">
      <div className="comment-icon">
        <i onClick={showComments} className="far fa-comment-alt"></i>
        <span>{card.comments.length}</span>
      </div>
      {show && (
        <form onSubmit={handleComment} className="comment-form">
          <label htmlFor="text">Laissez un commentaire</label>
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <br />
          <input type="submit" value="Envoyer" />
        </form>
      )}
      {show &&
        card.comments.map((comment) => {
          return (
            <div className="comment-container" key={comment._id}>
              <div className="left-part">
                <img src={comment.commenterPic} alt=""/>
              </div>
              <div className="right-part">
                <div className="comment-header">
                  <h3>{comment.pseudo}</h3>
                  <span>{comment.timestamp}</span>
                </div>
                <p>{comment.text}</p>
                <EditDeleteComment comment={comment} cardId={card._id} />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CardComments;
