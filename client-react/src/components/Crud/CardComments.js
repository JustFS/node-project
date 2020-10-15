import React, { useEffect, useState, useContext } from "react";
import { userData } from "../api/UserData";
import { UidContext } from "../AppContext";
import axios from "axios";
import EditDeleteComment from "./EditDeleteComment";

const CardComments = ({ card }) => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const [name, setName] = useState("");

  const uid = useContext(UidContext);

  const showComments = () => {
    setShow(!show);
  }

  const handleComment = (e) => {
    e.preventDefault();

    axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/comment-post/` + card._id,
      data: {
        commenterId: uid,
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
        .then((res) => setName(res.data.pseudo))
        .catch((err) => console.log(err));
    };
    if (uid) {
      getName();
    }
  });

  return (
    <div className="comments-container">
      <i onClick={showComments} className="far fa-comment-alt"></i>
      {show === false && (
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
      {show === false &&
        card.comments.map((comment) => {
          return (
            <div key={comment._id}>
              <h5>{comment.pseudo}</h5>
              <p>{comment.text}</p>
              <EditDeleteComment comment={comment} cardId={card._id} />
            </div>
          );
        })}
    </div>
  );
};

export default CardComments;
