import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Home({ setSubmittedFavorites }) {
  const [moviesData, setMoviesData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const navigate = useNavigate();

  const topMovies = [
    "Guardians of the Galaxy",
    "The Dark Knight",
    "Inception",
    "The Matrix",
    "The Shawshank Redemption",
    "The Godfather",
    "Pulp Fiction",
    "Forrest Gump",
    "The Lion King",
    "The Avengers",
  ];

  const handleDataFetch = (fetchedData) => {
    setMoviesData((prevData) => {
      if (!prevData.find((movie) => movie.imdbID === fetchedData.imdbID)) {
        return [...prevData, fetchedData];
      }
      return prevData;
    });
  };

  const handleAddToFavorites = (movie) => {
    if (!favoriteMovies.find((favMovie) => favMovie.imdbID === movie.imdbID)) {
      setFavoriteMovies((prevFavorites) => [...prevFavorites, movie]);
    }
  };

  const handleRemoveFromFavorites = (movie) => {
    setFavoriteMovies((prevFavorites) =>
      prevFavorites.filter((favMovie) => favMovie.imdbID !== movie.imdbID)
    );
  };

  const fetchMoviesBySearch = (searchTerm) => {
    setLoading(true);
    setMoviesData([]);

    const apiKey = "b5c352a6";
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}&type=movie`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          const movies = data.Search.slice(0, 10);
          movies.forEach((movie) => {
            fetchSingleMovieData(movie);
          });
        } else {
          setError(data.Error || "No results found");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const fetchSingleMovieData = (movie) => {
    const apiKey = "b5c352a6";
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          handleDataFetch(data);
        } else {
          setError(data.Error || "Unknown error");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  useEffect(() => {
    if (searchQuery) {
      fetchMoviesBySearch(searchQuery);
    } else {
      setMoviesData([]);

      topMovies.slice(0, 10).forEach((movieTitle) => {
        fetchMovieData(movieTitle);
      });

      setError(null);
    }
  }, [searchQuery]);

  useEffect(() => {
    setLoading(true);
    topMovies.slice(0, 10).forEach((movieTitle) => {
      fetchMovieData(movieTitle);
    });
  }, []);

  const fetchMovieData = (movieTitle) => {
    const apiKey = "b5c352a6";
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${movieTitle}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          handleDataFetch(data);
        } else {
          setError(data.Error || "Unknown error");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const handleSubmitFavorites = () => {
    setSubmittedFavorites((prevSubmitted) => [
      ...prevSubmitted,
      favoriteMovies,
    ]);
    setFavoriteMovies([]);
    navigate("/submitted-favorites");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        width: "100%",
      }}
    >
      <Header onSearch={setSearchQuery} />

      {/* <div> */}
      <div style={{ width: "calc(100vw - 400px)" }}>
        <h1>Top Movies</h1>

        {loading && <div>Loading...</div>}

        <div
          className="movie-list"
          style={{ display: "flex", gap: 20, width: "100&", flexWrap: "wrap" }}
        >
          {moviesData.map((movie, index) => (
            <div key={index} className="movie-card">
              <h2>{movie.Title}</h2>
              <img
                src={movie.Poster}
                alt={movie.Title}
                style={{ width: "200px" }}
              />
              <p>
                <strong>IMDB Rating:</strong> {movie.imdbRating}
              </p>
              {favoriteMovies.find(
                (favMovie) => favMovie.imdbID === movie.imdbID
              ) ? (
                <button disabled>Added to Favorites</button>
              ) : (
                <button onClick={() => handleAddToFavorites(movie)}>
                  Add to Favorite List
                </button>
              )}
            </div>
          ))}
        </div>

        {error && <div>{error}</div>}
      </div>

      <div className="favorite-panel">
        <h2>Your Favorite Movies</h2>
        <div className="favorite-movies">
          {favoriteMovies.map((movie, index) => (
            <div key={index} className="favorite-movie">
              <img src={movie.Poster} alt={movie.Title} />
              <h3>{movie.Title}</h3>
              <button
                className="remove-btn"
                onClick={() => handleRemoveFromFavorites(movie)}
              >
                X
              </button>
              <div
                onDoubleClick={() =>
                  window.open(
                    `https://www.imdb.com/title/${movie.imdbID}/`,
                    "_blank"
                  )
                }
                style={{ cursor: "pointer" }} // Indicate interactivity with pointer cursor
              >
                <p>Double-click to view IMDb</p>
              </div>
            </div>
          ))}
        </div>

        <div className="favorite-buttons">
          <button onClick={handleSubmitFavorites}>Submit Favorite List</button>
          <button onClick={() => navigate("/submitted-favorites")}>
            View Submitted Favorite Lists
          </button>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

Home.propTypes = {
  setSubmittedFavorites: PropTypes.func.isRequired,
};

export default Home;
