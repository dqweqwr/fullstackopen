import { useEffect, useState } from "react";
import axios from "axios"

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

const CountryView = ({ countries, filter }) => {
  if (filter !== "") {
    const filterRegex = new RegExp(filter, "i")
    countries = countries.filter(country => {
      return country.match(filterRegex)
    })
  }

  if (filter === "") {
    return <div></div>
  } else if (countries.length > 10) {
    return <div>Too many matches. Please specify another filter</div>
  } else if (countries.length === 1) {
    return <div>One match: {countries[0]}</div>
  } else if (countries.length === 0) {
    return <div>No matches found</div>
  }

  return (
    <div>
      {countries.sort().map((country, index) => {
        return <div key={index}>{country}</div>
      })}
    </div>
  )
}

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
        console.log(countryNames)
      })
  }, [])

  if (!countries) return null

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <SearchBar
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <CountryView countries={countries} filter={filter} />
    </div>
  );
}

export default App;
