import axios from "axios"
export default function request(config) {
  const network = axios.create({
    baseURL:"http://192.168.0.6:4000",
    timeout:5000
  })
  network.interceptors.request.use(
    config => config,
    err => console.log(err)
  )
  network.interceptors.response.use(
    config => config,
    err => console.log(err)
  )
  return network(config)
}