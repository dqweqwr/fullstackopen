import { useEffect, useState } from "react"
import noteService from "../services/countries"

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (city) {
      noteService
        .getWeather(city)
        .then(weatherInfo => {
          setWeather(weatherInfo)
        })
        .catch( err => {
          console.log(err)
        })
    }
  }, [city])

  if (!weather) return null

  const weatherIconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  const temperatureCelsius = (weather.main.temp - 273.15).toFixed(1)
  const windSpeed = weather.wind.speed.toFixed(2)

  return (
    <div>
      <h1>Weather in {city}</h1>
      <p>temperature {temperatureCelsius} celsius</p>
      <img src={weatherIconUrl} alt="weather" />
      <p>wind {windSpeed} m/s</p>
    </div>
  )
}

export default Weather
