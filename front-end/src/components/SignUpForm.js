import React, { useState } from "react";
import axios from 'axios';

const SignUpForm = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [controlPassword, setControlPassword] = useState(null);


  const handleRegister = (e) => {
    e.preventDefault();

    if (password === controlPassword) {
      axios({
        method: "post",
        url: "http://localhost:5500/api/user/register",
        data: {
          name,
          email,
          password
        },
      })

    } else {

    }

  }

  return (
    <form action="" onSubmit={handleRegister} id="sign-up-form">
      <label htmlFor="name">Nom</label><br/>
      <input 
        type="text" 
        name="name" 
        id="name" 
        onChange={e => setName(e.target.value)} 
      />
      <br/>
      <label htmlFor="email">Email</label><br/>
      <input 
        type="text" 
        name="email" 
        id="email"
        onChange={e => setEmail(e.target.value)} 
      />
      <br/>
      <label htmlFor="password">Mot de passe</label><br/>
      <input 
        type="password"  
        name="password" 
        id="password" 
        onChange={e => setPassword(e.target.value)} 
      />
      <br/>
      <label htmlFor="password-conf">Confirmer Mot de passe</label><br/>
      <input 
        type="password" 
        name="password" 
        id="password-conf"
        onChange={e => setControlPassword(e.target.value)} 
      />
      <br/>
      <input type="checkbox" id="cg" />
      <label htmlFor="cg">J'accepte les conditions générales</label>
      <br/>
      <input type="submit" value="Valider inscription" />
    </form>
  );
};

export default SignUpForm;
