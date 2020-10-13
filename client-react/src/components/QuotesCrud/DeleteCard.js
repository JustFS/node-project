import React from "react";
import axios from "axios";

const DeleteCard = (props) => {

  const deleteQuote = () => {

    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/post/` + props.id,
    })
      .then((res) => {
        console.log('deleted');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <button onClick={() => {
      if (window.confirm('Voulez-vous supprimer cet article')){deleteQuote()};}}
    >
      Supprimer
    </button>
  )
};

export default DeleteCard;
