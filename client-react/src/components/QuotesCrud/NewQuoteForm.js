import React, { useState, useContext } from "react";
import axios from "axios";
import { UidContext } from "../AppContext";

const NewQuoteForm = () => {
  const [author, setAuthor] = useState('');
  const [quote, setQuote] = useState('');
  
  const uid = useContext(UidContext);

  const handleForm = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/post`,
      data: {
        author,
        message: quote,
        userId: uid
      },
    })
      .then(res => {
        console.log(res);
        setAuthor('');
        setQuote('');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleForm} className="quote-form">
      <label htmlFor="author">Author</label>
      <br/>
      <input 
        type="text" 
        name="author" 
        onChange={e => setAuthor(e.target.value)}
        value={author}
      />
      <br/>
      <label htmlFor="quote">Citation</label>
      <br/>
      <textarea 
        name="quote" 
        id="quote" 
        cols="25" 
        rows="2"
        onChange={e => setQuote(e.target.value)}
        value={quote}
      />
      <br/>
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default NewQuoteForm;