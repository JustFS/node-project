import React, { useEffect, useState, useContext } from "react";
import { UidContext } from "../AppContext";
import axios from "axios";
import EditDeleteComment from "./EditDeleteComment";
import { timestampParser } from "../Utils";

const CardComments = ({ card }) => {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState("");

  const uid = useContext(UidContext);

  const handleComment = (e) => {
    e.preventDefault();

    if (text) {
      axios({
        method: "patch",
        url:
          `${process.env.REACT_APP_API_URL}api/post/comment-post/` + card._id,
        data: {
          commenterId: uid,
          commenterPic: pic,
          pseudo: name,
          text,
        },
      })
        .then((res) => setText(""))
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    const getName = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/user/` + uid,
      })
        .then((res) => {
          setName(res.data.pseudo);
          setPic(res.data.picture);
        })
        .catch((err) => console.log(err));
    };
    if (uid) getName();
  }, [uid]);

  return (
    <div className="comments-container">
      {card.comments.map((comment) => {
        return (
          <div className="comment-container" key={comment._id}>
            <div className="left-part">
              <img src={comment.commenterPic} alt="" />
            </div>
            <div className="right-part">
              <div className="comment-header">
                <h3>{comment.pseudo}</h3>
                <span>{timestampParser(comment.timestamp)}</span>
              </div>
              <p>{comment.text}</p>
              <EditDeleteComment comment={comment} cardId={card._id} />
            </div>
          </div>
        );
      })}
      <form onSubmit={handleComment} className="comment-form">
        <input
          type="text"
          name="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Laissez un commentaire"
        />
        <br />
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
};

export default CardComments;
