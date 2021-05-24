import React from "react";
import LoginForm from "../components/LoginForm";
import "../styles/Pages.less";

function Login() {
  return (
    <main>
      <div className="container-registration">
        <h1>Please log in to continue</h1>
        <LoginForm />
      </div>
    </main>
  );
}

export default Login;
