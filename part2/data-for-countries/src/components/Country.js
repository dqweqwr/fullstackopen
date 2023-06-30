import { useEffect, useState } from "react"
import noteService from "../services/countries"
import Weather from "./Weather"

const Country = ({ name }) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      noteService
        .getOne(name)
        .then(countryInfo => {
          setCountry(countryInfo)
        })
        .catch(err => {
          console.log("not found")
        })
    }
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
      <img src={country.flags.png} alt={country.flags.alt} />
      <Weather city={country.capital}/>
    </>
  )
}

export default Country
