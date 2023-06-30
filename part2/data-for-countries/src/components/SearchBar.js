const SearchBar = ({ filter, handleFilterChange }) => {
  return (
    <div>
      <label htmlFor="searchbar">
        Find countries: 
      </label>
      <input
        id="searchbar"
        type="text"
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  )
}

export default SearchBar
