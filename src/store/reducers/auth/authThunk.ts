import { ILogPassAuth } from "@/interfaces/auth"
import { AppDispatch } from "@/store/store"
import { authAPI, codeAuth, createInstance } from "../../../api/apiGlobal"
import { setAuthData, setIsAuth, setOpenCodeWidget } from "./authSlice"

export const thunkAuth = (body: ILogPassAuth) => {
  return async (dispatch: AppDispatch) => {
    let loadingTimer: NodeJS.Timeout | null = null

    // Устанавливаем таймер для состояния загрузки через 500 мс
    loadingTimer = setTimeout(() => {
      dispatch(setIsAuth({ auth: "loading", text: null }))
    }, 500)

    try {
      // Выполняем запрос на аутентификацию
      const { data, status } = await authAPI(body)

      // Отменяем таймер загрузки, если ответ пришел раньше
      if (loadingTimer) {
        clearTimeout(loadingTimer)
        loadingTimer = null
      }
      console.log(status)
      if (status == 200 || status == 202) {
        const token = data.jwt as string
        createInstance(token)
        localStorage.setItem("X-Auth", token)
        if (status == 202) {
          dispatch(setOpenCodeWidget(true))
          dispatch(setAuthData({ login: body.login, password: body.password }))
        } else {
          dispatch(setIsAuth({ auth: true }))
        }
      } else {
        dispatch(setIsAuth({ auth: "error", text: "Неверный пароль" }))
      }
    } catch (error) {
      if (loadingTimer) {
        clearTimeout(loadingTimer)
        loadingTimer = null
      }
      dispatch(setIsAuth({ auth: "error", text: "Ошибка аутентификации" }))
    }
  }
}

export const thunkCode = (code: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setOpenCodeWidget(false))
    dispatch(setIsAuth({ auth: "loading", text: null }))
    let loadingTimer: NodeJS.Timeout | null = null
    loadingTimer = setTimeout(() => {
      dispatch(setOpenCodeWidget(false))
      dispatch(setIsAuth({ auth: "loading", text: null }))
    }, 500)

    // Выполняем запрос на проверку кода
    const status = await codeAuth(code)

    // Отменяем таймер загрузки, если ответ пришел раньше
    if (loadingTimer) {
      clearTimeout(loadingTimer)
      loadingTimer = null
    }

    console.log(status)

    switch (status) {
      case 200:
        dispatch(setIsAuth({ auth: true }))
        break
      case 401:
        dispatch(setIsAuth({ auth: "error", text: "Неверный код" }))
        break
      case 500:
        dispatch(setIsAuth({ auth: "error", text: "Ошибка сервера" }))
        break
    }
    // } else {
    //   dispatch(setIsAuth({ auth: "error", text: "Время истекло" }))
    // }
  }
}
