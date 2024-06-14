import axios from "axios"

interface IDefaultQuery {
  url: string
  body?: any
}
let originUrl = ""

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  originUrl = "https://tpms.arsa.pro"
} else {
  originUrl = window.location.origin
}
let tpmsInstance = axios.create({
  baseURL: `${originUrl}/api/`,
})
const token = localStorage.getItem("X-Auth")

export const createInstance = () => {
  tpmsInstance = axios.create({
    baseURL: `${originUrl}/api/`,
    headers: { "X-Auth": token, "Content-Type": "application/json" },
  })
}
createInstance()
export const tpmsQuery = async (dataQuery: IDefaultQuery) => {
  const queryParameters =
    dataQuery.body != undefined
      ? {
          url: dataQuery.url,
          body: dataQuery.body,
          headers: { "X-Auth": token, "Content-Type": "application/json" },
        }
      : {
          url: dataQuery.url,
          headers: { "X-Auth": token, "Content-Type": "application/json" },
        }

  const { data, status } = await tpmsInstance.post(
    queryParameters.url,
    queryParameters.body && queryParameters.body,
  )

  return { data, status }
}
