import React, { useState, useContext } from "react";
import axios from "axios";
import { UidContext } from "../AppContext";

const NewQuoteForm = () => {
  const [message, setMessage] = useState('');
  
  const uid = useContext(UidContext);

  const handleForm = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/post`,
      data: {
        userId: uid,
        message
      },
    })
      .then(res => {
        setMessage('');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleForm} className="quote-form">
      <label htmlFor="message">Citation</label>
      <br/>
      <textarea 
        name="message" 
        id="message" 
        cols="25" 
        rows="2"
        onChange={e => setMessage(e.target.value)}
        value={message}
      />
      <br/>
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default NewQuoteForm;