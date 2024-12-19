import PropTypes from "prop-types";

function FavoriteList({ favoriteMovies }) {
  console.log(favoriteMovies);

  return (
    <div>
      <h1>Submitted Favorite Lists</h1>
      {favoriteMovies.length === 0 ? (
        <p>No favorite lists have been submitted yet.</p>
      ) : (
        favoriteMovies.map((list, index) => (
          <div key={index} style={{ marginBottom: 40 }}>
            <h2 style={{ marginBottom: 20 }}>Favorite List {index + 1}</h2>
            <ul style={{ display: "flex", gap: 20, listStyle: "none" }}>
              {list.map((movie, movieIndex) => (
                <li
                  key={movieIndex}
                  onDoubleClick={() =>
                    window.open(
                      `https://imdb.com/title/${movie.imdbID}/`,
                      "_blank"
                    )
                  }
                  style={{ cursor: "pointer" }} // Adding pointer cursor to indicate interactivity
                >
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    style={{ width: "100px" }}
                  />
                  <h3>{movie.Title}</h3>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

FavoriteList.propTypes = {
  favoriteMovies: PropTypes.array.isRequired,
};

export default FavoriteList;
