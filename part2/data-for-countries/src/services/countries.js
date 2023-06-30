import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api"
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather"

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`)
  return request.then(response => response.data)
}

const getOne = country => {
  const request = axios.get(`${baseUrl}/name/${country}`)
  return request.then(response => response.data)
}

const getWeather = city => {
  const request = axios.get(`${weatherUrl}?q=${city}&appid=${process.env.REACT_APP_API_KEY}`)
  return request.then(response => response.data)
}

const noteService = { getAll, getOne, getWeather }
export default noteService
