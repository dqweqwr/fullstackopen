import { useEffect, useState } from "react"
import noteService from "../services/countries"

const Country = ({ name }) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    console.log("running effect")
    if (name) {
      console.log(`fetching data for country "${name}"`)
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
    </>
  )
}

export default Country
