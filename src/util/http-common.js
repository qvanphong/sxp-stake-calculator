import axios from 'axios'
import config from "../../config.json"

export const HTTP = axios.create()

export const isSuccess = (response) => {
  return response.status >= 200 && response.status < 300
}

export const execGetRequest = (url, successCallback) => {
  HTTP.get(url).then((response) => {
    if (isSuccess(response)) successCallback(response.data)
  })
}

export const API_URL = {
  SXP: config.sxp_api_url,
  BACKEND: config.backend_api
}