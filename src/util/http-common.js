import axios from 'axios'
import config from "../../config.json"

export const HTTP = axios.create({
  baseURL: config.api_url,
})

export const isSuccess = (response) => {
  return response.status >= 200 && response.status < 300
}

export const execGetRequest = (url, successCallback) => {
  HTTP.get(url).then((response) => {
    if (isSuccess(response)) successCallback(response)
  })
}
