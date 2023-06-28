const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      <label htmlFor="filter">filter shown with: </label>
      <input id="filter"
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  )
}

export default Filter;
