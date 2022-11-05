import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import ThemeContext from "./ThemeContext";
import SearchParams from "./SearchParams";
import Details from "./Details";

const App = () => {
  const theme = useState("darkblue");
  return (
    <ThemeContext.Provider value={theme}>
      <BrowserRouter>
        <header>
          <Link to="/adopt-me">Adopt Me!</Link>
        </header>
        <Routes>
          <Route path="/adopt-me/details/:id" element={<Details />} />
          <Route path="/adopt-me" element={<SearchParams />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
};

export default App;
