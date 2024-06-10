import axios from "axios"

interface IDefaultQuery {
  url: string
  body?: any
}

const token = localStorage.getItem("X-Auth") || "0"

let tpmsInstance = axios.create({
  baseURL: "https://tpms.arsa.pro/api/",
})
export const createInstance = () => {
  tpmsInstance = axios.create({
    baseURL: "https://tpms.arsa.pro/api/",
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
