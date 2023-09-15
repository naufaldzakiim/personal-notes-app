import React from "react";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";
import { useSearchParams } from "react-router-dom";
import { getArchivedNotes } from "../utils/network-data";
import { showFormattedDate } from "../utils";
import LocaleContext from "../contexts/LocaleContext";

function ArchivedPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get('keyword') || ''
  });

  const {locale} = React.useContext(LocaleContext);

  React.useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const { data } = await getArchivedNotes();
        const formattedNotes = data.map((note) => ({
          ...note,
          createdAt: showFormattedDate(note.createdAt),
        }));
        setNotes(formattedNotes);
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const onKeywordChangeHandler = (keyword) => {
    setKeyword(keyword);
    setSearchParams({ keyword });
  };

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  if(isLoading) {
    return(
      <section className="archives-page">
      <h2>{locale === "id" ? "Catatan Arsip" : "Archived Note"}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <p>Fetching notes ...</p>
    </section>
    );
  }
  
  return (
    <section className="archives-page">
      <h2>{locale === "id" ? "Catatan Arsip" : "Archived Note"}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <NoteList notes={filteredNotes} />
    </section>
  );
}

export default ArchivedPage;