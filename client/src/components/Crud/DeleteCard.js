import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.actions";

const DeleteCard = (props) => {
  const dispatch = useDispatch();

  const deleteQuote = () => {
    dispatch(deletePost(props.id));
  };
  
  return (
    <button onClick={() => {
      if (window.confirm('Voulez-vous supprimer cet article ?')){deleteQuote()};}}
    >
      Supprimer
    </button>
  )
};

export default DeleteCard;
