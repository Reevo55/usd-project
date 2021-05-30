import React from "react";
import RegistrationForm from "../components/RegistrationForm";
import "../styles/Pages.less";

function Register() {
  return (
    <main>
      <div className="container-registration">
        <h1>Please register to continue</h1>
        <RegistrationForm />
      </div>
    </main>
  );
}

export default Register;
