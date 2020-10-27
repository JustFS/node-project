import React from "react";
import { useDispatch } from "react-redux";
import { deletePost, getPosts } from "../../actions/postActions";

const DeleteCard = (props) => {
  const dispatch = useDispatch();

  const deleteQuote = async () => {
    await dispatch(deletePost(props.id));
    dispatch(getPosts());
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
