import React, { useState, useContext, useEffect } from "react";
import { deleteComment, editComment } from "../../actions/post.actions";
import { UidContext } from "../AppContext";
import { useDispatch } from "react-redux";

const EditDeleteComment = ({ comment, postId }) => {
  const [text, setText] = useState("");
  const [edit, setEdit] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const isEditing = () => {
    setEdit(!edit);
  };

  const handleEdit = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(editComment(postId, comment._id, text))
      setText("");
      setEdit(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteComment(postId, comment._id))
  }

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
        <span onClick={isEditing}>
          <i className="fas fa-pen"></i>
        </span>
      )}
      {isAuthor && edit && (
        <form
          onSubmit={e => handleEdit(e)}
          className="comment-form"
        >
          <label onClick={isEditing} htmlFor="text">
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
            onClick={() => {
              if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {handleDelete()}
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
