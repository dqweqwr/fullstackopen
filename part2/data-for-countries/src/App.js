import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import Countries from "./components/Countries";
import noteService from "./services/countries";

const App = () => {
  const [filter, setFilter] = useState("")
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(responseData => {
        const countryNames = responseData.map(country => {
          return country.name.common
        })
        setCountries(countryNames)
      })
  }, [])

  if (!countries) return null

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <>
      <SearchBar
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <Countries countries={countries} filter={filter} />
    </>
  );
}

export default App;
