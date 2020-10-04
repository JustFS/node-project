import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (password === controlPassword) {
      axios({
        method: "post",
        url: "http://localhost:5500/api/user/register",
        contentType: "application/json; charset=utf-8",
        data: {
          name,
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res);
          setFormSubmit(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('les mdps !');
    }
  };

  return (
    <>
      {formSubmit ? (
        <SignInForm />
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="name">Nom</label>
          <br />
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <br />
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
          <label htmlFor="password-conf">Confirmer Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password-conf"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <br />
          <input type="checkbox" id="cg" />
          <label htmlFor="cg">J'accepte les conditions générales</label>
          <br />
          <input type="submit" value="Valider inscription" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
