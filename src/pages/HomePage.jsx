import React from "react";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";
import AddButton from "../components/AddButton";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getActiveNotes } from "../utils/network-data";
import { showFormattedDate } from "../utils";
import LocaleContext from "../contexts/LocaleContext";

function HomePage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get('keyword') || ''
  });
  
  const navigate = useNavigate();
  const {locale} = React.useContext(LocaleContext);

  React.useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const { data } = await getActiveNotes();
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

  const onAddHandler = () => {
    navigate('/notes/new');
  };

  const onKeywordChangeHandler = (keyword) => {
    setKeyword(keyword);
    setSearchParams({ keyword });
  };

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  if (isLoading) {
    return (
      <section className="homepage">
        <h2>{locale === "id" ? "Catatan Aktif" : "Active Notes"}</h2>
        <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
        <p>Fetching notes ...</p>
        <div className="homepage__action">
          <AddButton onAdd={onAddHandler}/>
        </div>
      </section>
    )
  }

  return (
    <section className="homepage">
      <h2>{locale === "id" ? "Catatan Aktif" : "Active Notes"}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <NoteList notes={filteredNotes} />
      <div className="homepage__action">
        <AddButton onAdd={onAddHandler}/>
      </div>
    </section>
  );
}


export default HomePage;