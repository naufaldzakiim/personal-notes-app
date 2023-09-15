import React from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import LocaleContext from "../contexts/LocaleContext";

function RegisterInput({ register }){
  const [name, onNameChangeHandler] = useInput();
  const [email, onEmailChangeHandler] = useInput();
  const [password, onPasswordChangeHandler] = useInput();
  const [confirmPassword, onConfirmPasswordChangeHandler] = useInput();
  const {locale} = React.useContext(LocaleContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if(password !== confirmPassword) {
      alert(locale === "id" ? "Kata sandi tidak sama." : "Password doesn't match.");
      return;
    }
    else {
      register({name, email, password});
    }
  };

  return (
    <div className="input-register">
      <label htmlFor="name">{locale === "id" ? "Nama" : "Name"}</label>
      <input type="text" value={name} onChange={onNameChangeHandler}/>
      <label htmlFor="email">{locale === "id" ? "Surel" : "Email"}</label>
      <input type="text" value={email} onChange={onEmailChangeHandler} />
      <label htmlFor="password">{locale === "id" ? "Kata Sandi" : "Password"}</label>
      <input type="password" value={password} onChange={onPasswordChangeHandler} />
      <label htmlFor="confirmPassword">{locale === "id" ? "Konfirmasi Kata Sandi" : "Confirm Password"}</label>
      <input type="password" value={confirmPassword} onChange={onConfirmPasswordChangeHandler} />
      <button onClick={onSubmitHandler}>{locale === "id" ? "Daftar" : "Register"}</button>
    </div>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;