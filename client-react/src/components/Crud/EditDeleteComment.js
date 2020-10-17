import React, { useState, useContext, useEffect } from "react";
import { UidContext } from "../AppContext";
import axios from "axios";

const EditDeleteComment = ({ comment, cardId }) => {
  const [text, setText] = useState("");
  const [edit, setEdit] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const uid = useContext(UidContext);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleEditDelete = (e, url) => {
    e.preventDefault();

    axios({
      method: "patch",
      url:
        `${process.env.REACT_APP_API_URL}api/post/` +
        url +
        `-comment-post/` +
        cardId,
      data: {
        commentId: comment._id,
        text: text ? text : comment.text,
      },
    })
      .then((res) => {
        setText("");
        setEdit(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterId) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, comment.commenterId]);

  return (
    <div className="edit-comment">
      {isAuthor && edit === false && (
        <span onClick={handleEdit}>
          <i className="fas fa-pen"></i>
        </span>
      )}
      {isAuthor && edit && (
        <form
          onSubmit={(e) => handleEditDelete(e, "edit")}
          className="comment-form"
        >
          <label onClick={handleEdit} htmlFor="text">
            Editer
          </label>
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.text}
          />
          <br />
          <input type="submit" value="Valider modification" />
          <button
            onClick={(e) => {
              if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                handleEditDelete(e, "delete");
              }
            }}
          >
            Supprimer commentaire
          </button>
        </form>
      )}
    </div>
  );
};

export default EditDeleteComment;
