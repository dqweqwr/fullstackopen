import { useState } from "react"
import Country from "./Country"

const Countries = ({ countries, filter }) => {
  const [selectedCountry, setSelectedCountry] = useState(null)
  if (filter !== "") {
    const filterRegex = new RegExp(filter, "i")
    countries = countries.filter(country => {
      return country.match(filterRegex)
    })
  }

  const handleClick = (country) => {
    setSelectedCountry(country)
  }

  if (filter === "") {
    return <div></div>
  } else if (countries.length > 10) {
    return <div>Too many matches. Please specify another filter</div>
  } else if (countries.length === 1) {
    return (
      <div>
        <Country name={countries[0]}/>
      </div>
    )
  } else if (countries.length === 0) {
    return <div>No matches found</div>
  } else return (
    <div>
      {countries.sort().map(country => {
        return (
          <div key={country}>
            {country}
            <button onClick={() => handleClick(country)}>
              show
            </button>
          </div>
        )
      })}
      <Country name={selectedCountry} />
    </div>
  )
}

export default Countries
