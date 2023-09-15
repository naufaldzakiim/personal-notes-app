import React from "react";
import Proptypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";

function SearchBar({ keyword, keywordChange }){
  const { locale } = React.useContext(LocaleContext);
  return(
    <section className="search-bar">
      <input
        type="text"
        className="search-bar"
        placeholder={locale === "id" ? "Cari berdasarkan judul ..." : "Search by title ..."}
        value={keyword}
        onChange={(event) => keywordChange(event.target.value)} />
    </section>
  );
}

SearchBar.propTypes = {
  keyword: Proptypes.string.isRequired,
  keywordChange: Proptypes.func.isRequired
}

export default SearchBar;