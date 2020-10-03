import React, { useState } from "react";
import axios from "axios";

const NewQuoteForm = () => {
  const [author, setAuthor] = useState('');
  const [quote, setQuote] = useState('');

  const handleForm = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: "http://localhost:5500/api/post",
      data: {
        author,
        message: quote,
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
    <form onSubmit={handleForm}>
      <label htmlFor="author">Author</label>
      <input 
        type="text" 
        name="author" 
        onChange={e => setAuthor(e.target.value)}
        value={author}
      />
      <label htmlFor="quote">Citation</label>
      <textarea 
        name="quote" 
        id="quote" 
        cols="25" 
        rows="2"
        onChange={e => setQuote(e.target.value)}
        value={quote}
      />
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default NewQuoteForm;
