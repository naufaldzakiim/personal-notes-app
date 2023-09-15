import React from "react";
import LocaleContext from "../contexts/LocaleContext";
import { MdGTranslate } from "react-icons/md";

function ToggleLocale() {
  const { toggleLocale } = React.useContext(LocaleContext);
  return (
    <button className="toggle-locale" onClick={toggleLocale}> <MdGTranslate /> </button>
  );
}

export default ToggleLocale;