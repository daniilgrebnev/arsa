import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type TPages = "tpms" | "map" | "main"

interface IRouterState {
  page: TPages
}

const initialState: IRouterState = {
  page: "main",
}

const routerSlice = createSlice({
  name: "router",
  initialState,
  reducers: {
    setRoutePage: (state: IRouterState, action: PayloadAction<TPages>) => {
      state.page = action.payload
    },
  },
})

export const { setRoutePage } = routerSlice.actions
export default routerSlice.reducer
