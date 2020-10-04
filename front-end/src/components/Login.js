import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const Login = () => {
  const [signUpModal, setSignUpModal] = useState(false);
  const [signInModal, setSignInModal] = useState(false);

  const handleModals = (e) => {
    if (e.target.id === 'register') {
      setSignInModal(false);
      setSignUpModal(!signUpModal);
    } else if (e.target.id === 'login') {
      setSignUpModal(false);
      setSignInModal(!signInModal);
    }
  }

  return (
    <div>
      <h3>Postez vos propres citations</h3>
      <ul>
        <li onClick={handleModals} className={signUpModal ? 'active-btn': null} id="register">S'inscrire</li>
        <li onClick={handleModals} className={signInModal ? 'active-btn':null} id="login">Se connecter</li>
      </ul>
      {signUpModal && <SignUpForm />}
      {signInModal && <SignInForm />}
    </div>
  );
};

export default Login;
