import axios from 'axios'

export function request(config) {
  const service = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  service.interceptors.request.use(
    config => {
      return config
    },
    err => {
      console.log(err)
    }
  )

  service.interceptors.response.use(
    res => {
      return res.data
    },
    err => {
      console.log(err)
    }
  )

  return service(config)
}
