import axios from "axios"
import { useEffect, useState } from "react"

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl)
      .then(res => {
        console.log("running")
        setResources(res.data)
      })
  }, [baseUrl])

  const create = (resource) => {
    axios.post(baseUrl, resource)
      .then(res => {
        console.log("post request finished")
        setResources(resources.concat(res.data))
      })
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}
