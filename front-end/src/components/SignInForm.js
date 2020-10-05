import React, { useState } from 'react';
import axios from 'axios';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: "http://localhost:5500/api/user/login",
      contentType: "application/json; charset=utf-8",
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        window.location = '/';
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <br />
      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default SignInForm;