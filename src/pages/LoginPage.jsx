import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";
import LoginInput from "../components/LoginInput";
import { login } from "../utils/network-data";

function LoginPage({ loginSuccess }) {
  const {locale} = React.useContext(LocaleContext);

  async function onLogin({email, password}) {
    const { error, data } = await login({email, password});

    if (!error) {
      loginSuccess(data);
    }
  }

  return(
    <section className="login-page">
      <h2>{locale === "id" ? "Yuk, login untuk menggunakan aplikasi." : "Login to use app, please."}</h2>
      <LoginInput login={onLogin} />
      <p>
        {locale === "id" ? "Belum punya akun? " : "Don't have an account? "}
        <Link to={"/register"}>{locale === "id" ? "Daftar di sini" : "Register here"}</Link>
      </p>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
}

export default LoginPage;