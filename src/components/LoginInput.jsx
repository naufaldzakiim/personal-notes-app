import React from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import LocaleContext from "../contexts/LocaleContext";

function LoginInput({ login }){
  const [email, onEmailChangeHandler] = useInput();
  const [password, onPasswordChangeHandler] = useInput();
  const {locale} = React.useContext(LocaleContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    login({email, password});
  };

  return (
    <div className="input-login">
      <label htmlFor="email">{locale === "id" ? "Surel" : "Email"}</label>
      <input type="text" value={email} onChange={onEmailChangeHandler} />
      <label htmlFor="password">{locale === "id" ? "Kata Sandi" : "Password"}</label>
      <input type="password" value={password} onChange={onPasswordChangeHandler} />
      <button onClick={onSubmitHandler}>Login</button>
    </div>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;