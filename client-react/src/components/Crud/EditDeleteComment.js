import React, { useState, useContext, useEffect } from "react";
import { UidContext } from "../AppContext";
import axios from "axios";
import LikeButton from "./LikeButton";

const EditDeleteComment = ({ comment, cardId }) => {
  const [text, setText] = useState("");
  const [edit, setEdit] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const uid = useContext(UidContext);

  const handleEdit = () => {
    setEdit(!edit);
  }

  const handleEditDelete = (e, url) => {
    e.preventDefault();

    axios({
      method: "patch",
      url:
        `${process.env.REACT_APP_API_URL}api/post/` + url + `-comment-post/` + cardId,
      data: {
        commentId: comment._id,
        text: text ? text : comment.text,
      },
    })
      .then((res) => setText(""))
      .catch((err) => console.log(err));
  };

  const checkAuthor = () => {
    if (uid === comment.commenterId){
      setIsAuthor(true);
    }
  }

  useEffect(() => {
    checkAuthor();
  }, [uid]);

  return (
    <div>
      {isAuthor && edit === false &&
      <span onClick={handleEdit}>Editer</span>}
      {isAuthor 
      && edit && (
        <form onSubmit={(e) => handleEditDelete(e, 'edit')} className="comment-form">
          <label onClick={handleEdit} htmlFor="text">Editer</label>
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
      {isAuthor &&
        <div className="delete-btn">
          <i onClick={(e) => handleEditDelete(e, 'delete')} className="fas fa-trash-alt"></i>
        </div> }
    </div>
  );
};

export default EditDeleteComment;
