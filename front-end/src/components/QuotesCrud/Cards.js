import React, { useState, useContext } from "react";
import DeleteCard from "./DeleteCard";
import axios from "axios";
import { UidContext } from "../AppContext";

const Cards = ({ card }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [authorUpdate, setAuthorUpdate] = useState(null);
  const [textUpdate, setTextUpdate] = useState(null);

  const uid = useContext(UidContext);

  const updateItem = () => {
    axios({
      method: "put",
      url: "http://localhost:5500/api/post/" + card._id,
      data: {
        author: authorUpdate ? authorUpdate : card.author,
        message: textUpdate ? textUpdate : card.message,
      },
    })
      .then((res) => {
        console.log('Modifié');
      })
      .catch((err) => {
        console.log(err);
      });

    setIsUpdated(false);
  };

  return (
    <li>
      {isUpdated === false && (
        <div className="card-container">
          <h3>{card.author}</h3>
          <p>"{card.message}"</p>

          {uid === card.userId && (
            <div className="button-container">
              <button onClick={() => setIsUpdated(true)}>Mettre à jour</button>
              <DeleteCard id={card._id} />
            </div>
          )}
        </div>
      )}

      {isUpdated && (
        <div className="card-container">
          <input
            defaultValue={card.author}
            onChange={(e) => setAuthorUpdate(e.target.value)}
          />
          <br />
          <textarea
            defaultValue={card.message}
            onChange={(e) => setTextUpdate(e.target.value)}
          />
          <br />
          <button onClick={updateItem}>Valider</button>
          <DeleteCard id={card._id} />
        </div>
      )}
    </li>
  );
};

export default Cards;
