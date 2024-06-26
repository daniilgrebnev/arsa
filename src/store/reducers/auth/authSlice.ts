import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface IAuthRes {
  account_id: number
  error_code: number
  error_text: string
  ex_time: number
  jwt: string
  mobile_phone: string
  rights: number
  role_id: number
  user_id: number
  user_is_master: boolean
}

interface IAuthState {
  isOpenCodeWidget: boolean
  isAuth: boolean | "loading" | "error"
  authErrorText: string | null
  mobile_phone: string
  authData: {
    login: string
    password: string
  }
}

const initialState: IAuthState = {
  isOpenCodeWidget: false,
  isAuth: false,
  authErrorText: null,

  mobile_phone: "",
  authData: {
    login: "",
    password: "",
  },
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state: IAuthState) => {
      state.isAuth = false
    },
    setPhoneNumber: (state: IAuthState, action: PayloadAction<string>) => {
      state.mobile_phone = action.payload
    },
    setIsAuth: (
      state: IAuthState,
      action: PayloadAction<{
        auth: boolean | "loading" | "error"
        text?: string | null
      }>,
    ) => {
      state.isAuth = action.payload.auth
      state.authErrorText = action.payload.text ? action.payload.text : null
    },
    setOpenCodeWidget: (state: IAuthState, action: PayloadAction<boolean>) => {
      state.isOpenCodeWidget = action.payload
    },
    setAuthData: (
      state: IAuthState,
      action: PayloadAction<{
        login: string
        password: string
      }>,
    ) => {
      state.authData = {
        login: action.payload.login,
        password: action.payload.password,
      }
    },
  },
})

export const { setIsAuth, setOpenCodeWidget, resetAuth, setAuthData, setPhoneNumber } =
  authSlice.actions
export default authSlice.reducer
