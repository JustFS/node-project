import React, { useState } from "react";
import SignUpForm from "./SignUpForm";

const Login = () => {
  const [signUpModal, setSignUpModal] = useState(false);

  return (
    <div>
      <h3>Postez vos propres citations</h3>
      <ul>
        <li onClick={() => setSignUpModal(!signUpModal)}>S'inscrire</li>
        <li>Se connecter</li>
      </ul>
      {
        signUpModal && <SignUpForm />
      }
    </div>
  );
};

export default Login;
