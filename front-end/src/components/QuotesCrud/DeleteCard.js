import React from "react";
import axios from "axios";

const DeleteCard = (props) => {

  const deleteQuote = () => {

    axios({
      method: "delete",
      url: "http://localhost:5500/api/post/" + props.id,
    })
      .then((res) => {
        console.log(res);
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
