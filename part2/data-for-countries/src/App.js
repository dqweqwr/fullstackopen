import { useEffect, useState } from "react";
import axios from "axios"
import SearchBar from "./components/SearchBar";
import Countries from "./components/Countries";

const App = () => {
  const [filter, setFilter] = useState("")
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => response.data)
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
