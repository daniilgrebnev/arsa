import { AppDispatch } from "@/store/store"
import { tpmsQuery } from "../api/api"
import { setIsAuth } from "../store/reducers/auth/authSlice"

export interface IApiHandler {
  dispatcher: (data: any) => void
  body?: any
  url: string
}

export const apiHandler = ({ dispatcher, body, url }: IApiHandler) => {
  return async (dispatch: AppDispatch) => {
    dispatcher("loading")
    const { status, data } = await tpmsQuery({ url, body })

    switch (status) {
      case 401:
        dispatch(setIsAuth({ auth: "error", text: "Сессия завершена" }))
        break
      case 200:
        dispatcher(data.data)
        break
      case 403:
        dispatcher("error")
        break
      case 500:
        dispatch(setIsAuth({ auth: "error", text: "Ошибка сервера" }))
    }
  }
}
