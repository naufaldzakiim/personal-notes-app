import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ToggleTheme from "./ToggleTheme";
import ToggleLocale from "./ToggleLocale";
import LocaleContext from "../contexts/LocaleContext";
import { FiLogOut } from "react-icons/fi";

function Navigation({ isLogin, onLogout, name }){
  const { locale } = React.useContext(LocaleContext);
  return(
    <>
      <h1>
        <Link to="/">{locale === "id" ? "Catatan Aplikasi" : "Notes App"}</Link>
      </h1>
      <nav className="navigation">
        <ul>
          <li><Link to="/archives">{locale === "id" ? "Terarsip" : "Archived"}</Link></li>
        </ul>
      </nav>
      <ToggleLocale />
      <ToggleTheme />
      {isLogin && (
        <button className="button-logout" onClick={onLogout}><FiLogOut />{name}</button>
      )}
    </>
  );
}

Navigation.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navigation;