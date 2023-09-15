import React from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import ArchivedPage from "./pages/ArchivedPage";
import AddNewPage from "./pages/AddNewPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LocaleProvider } from "./contexts/LocaleContext";
import { getUserLogged, putAccessToken } from "./utils/network-data";

function App() {
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);
  
  const [theme, setTheme] = React.useState(() => {
    return localStorage.getItem("theme") || "dark"
  });

  const [locale, setLocale] = React.useState(() => {
    return localStorage.getItem("locale") || "id"
  });

  const toggleTheme = () => {
    setTheme((theme) => {
      const newTheme = theme === "dark" ? "light" : "dark";
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleLocale = () => {
    setLocale((locale) => {
      const newLocale = locale === "id" ? "en" : "id";
      localStorage.setItem("locale", newLocale);
      return newLocale;
    });
  };

  React.useEffect(() => {
    document.documentElement.setAttribute('locale', locale);
  }, [locale]);

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken('');
  }

  const onLoginSuccess = async ({accessToken}) => {
    putAccessToken(accessToken);
    const {data} = await getUserLogged();
    setAuthedUser(data);
  }

  React.useEffect(() => {
    getUserLogged().then(({data}) => {
      setAuthedUser(data);
      setInitializing(false);
    }).catch(() => {
      setAuthedUser(null);
      setInitializing(false);
    });
  }, [authedUser]);

  if(initializing){
    return null;
  }

  if(authedUser === null) {
    return (
      <ThemeProvider value={{theme, toggleTheme}}>
      <LocaleProvider value={{locale, toggleLocale}}>
      <div className="app-container">
        <header>
          <Navigation isLogin={false} onLogout={onLogout} name="" />
        </header>
        <main>
          <Routes>
            <Route path="/*" element={<LoginPage loginSuccess={onLoginSuccess} />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </div>
      </LocaleProvider>
      </ThemeProvider>
    );
  }
  
  return (
    <ThemeProvider value={{theme, toggleTheme}}>
    <LocaleProvider value={{locale, toggleLocale}}>
    <div className="app-container">
      <header>
      <Navigation isLogin={true} onLogout={onLogout} name={authedUser.name} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/archives" element={<ArchivedPage />} />
          <Route path="/notes/:id" element={<DetailPage />} />
          <Route path="/notes/new" element={<AddNewPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
    </LocaleProvider>
    </ThemeProvider>
  );
}

export default App;
