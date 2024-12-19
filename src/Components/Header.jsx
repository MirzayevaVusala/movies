import { useState } from "react";
import PropTypes from "prop-types";

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm.trim()); // Pass search query to parent App
  };

  return (
    <header
      style={{ marginTop: "1rem", marginLeft: 40, alignSelf: "self-start" }}
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for movies"
        style={{ padding: 5, marginRight: 10, outline: "none" }}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </header>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Header;
