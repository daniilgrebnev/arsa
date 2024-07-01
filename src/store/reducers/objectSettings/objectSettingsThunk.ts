import { AppDispatch } from "@/store/store"
import { getAccounts, getObjectSettings, getPlugins, saveSettings } from "src/api/apiGlobal"
import { setIsAuth } from "../auth/authSlice"
import { setAccountsList, setObjectSettingsData, setPluginsList } from "./objectSettings"

export const thunkGetObjectSettings = (vehicle_uid: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setObjectSettingsData({ data: "loading" }))
    const { status, data } = await getObjectSettings(vehicle_uid)

    switch (status) {
      case 401:
        dispatch(setIsAuth({ auth: "error", text: "Сессия завершена" }))
        break
      case 200:
        dispatch(setObjectSettingsData({ data }))
        break
      case 403:
        dispatch(setObjectSettingsData({ data: "error" }))
        break
      case 500:
        dispatch(setIsAuth({ auth: "error", text: "Ошибка сервера" }))
    }
  }
}
export const thunkGetAccounts = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setAccountsList("loading"))
    const { status, accounts } = await getAccounts()

    switch (status) {
      case 401:
        dispatch(setIsAuth({ auth: "error", text: "Сессия завершена" }))
        break
      case 200:
        dispatch(setAccountsList(accounts))
        break
      case 403:
        dispatch(setAccountsList("error"))
        break
      case 500:
        dispatch(setIsAuth({ auth: "error", text: "Ошибка сервера" }))
    }
  }
}
export const thunkGetPlugins = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setPluginsList("loading"))
    const { status, plugins } = await getPlugins()

    switch (status) {
      case 401:
        dispatch(setIsAuth({ auth: "error", text: "Сессия завершена" }))
        break
      case 200:
        dispatch(setPluginsList(plugins))
        break
      case 403:
        dispatch(setPluginsList("error"))
        break
      case 500:
        dispatch(setIsAuth({ auth: "error", text: "Ошибка сервера" }))
    }
  }
}
export const thunkSaveSettingsObject = (body: any) => {
  return async (dispatch: AppDispatch) => {
    const { status } = await saveSettings(body)
    dispatch(setObjectSettingsData({ data: "loading" }))
    switch (status) {
      case 401:
        dispatch(setIsAuth({ auth: "error", text: "Сессия завершена" }))
        break
      case 200:
        dispatch(setObjectSettingsData({ data: null }))
        break
      case 403:
        dispatch(setPluginsList("error"))
        break
      case 500:
        dispatch(setIsAuth({ auth: "error", text: "Ошибка сервера" }))
    }
  }
}
