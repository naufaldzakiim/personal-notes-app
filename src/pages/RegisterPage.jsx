import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LocaleContext from "../contexts/LocaleContext";
import RegisterInput from "../components/RegisterInput";
import { register } from "../utils/network-data";

function RegisterPage(){
  const {locale} = React.useContext(LocaleContext);
  const navigate = useNavigate();

  async function onRegister({ name, email, password}){
    const { error } = await register({ name, email, password });

    if (!error) {
      navigate("/");
    }
  }

  return (
    <section className="register-page">
      <h2>{locale === "id" ? "Isi form untuk mendaftar akun." : "Fill the form to register account."}</h2>
      <RegisterInput register={onRegister} />
      <p>
        {locale === "id" ? "Sudah punya akun? " : "Already have an account? "}
        <Link to={"/"}>{locale === "id" ? "Login di sini" : "Login here"}</Link>
      </p>
    </section>
  );
}

export default RegisterPage;