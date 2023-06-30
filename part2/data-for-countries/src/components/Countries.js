import axios from "axios"
import { useEffect, useState } from "react"

const Country = ({ name }) => {
  const [country, setCountry] = useState(null)
  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(response => {
        setCountry(response.data)
      })
  }, [name])

  if (!country) return null
    
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>{country.capital}</p>
      <p>area {country.area}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map(language => {
          return (
            <li key={language}>{language}</li>
          )
        })}
      </ul>
      <p>insert country flag here</p>
      <img src={country.flags.png} alt="flag of country" />
    </>
  )
}

const Countries = ({ countries, filter }) => {
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
    return (
      <div>
        <Country name={countries[0]}/>
      </div>
    )
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

export default Countries
