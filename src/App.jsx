import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import FavoriteList from "./Components/FavoriteList";
import Home from "./Components/Home";

function App() {
  const [submittedFavorites, setSubmittedFavorites] = useState([]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Home setSubmittedFavorites={setSubmittedFavorites} />}
        />
        <Route
          path="/submitted-favorites"
          element={<FavoriteList favoriteMovies={submittedFavorites} />}
        />
      </Routes>
    </div>
  );
}

export default App;
