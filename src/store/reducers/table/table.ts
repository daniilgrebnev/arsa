import { ITableData } from "@/interfaces/table"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface ITableDataState {
  data: ITableData[] | "loading" | "error"
  searchedTableData: ITableData[] | null
  sort: string
  direction: boolean
}

const initialState: ITableDataState = {
  data: [],
  searchedTableData: null,
  sort: "",
  direction: true,
}

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTableData(state: ITableDataState, action: PayloadAction<any>) {
      state.data = action.payload
    },
    setSort(state: ITableDataState, action: PayloadAction<string>) {
      state.sort = action.payload
    },
    setDirection(state: ITableDataState) {
      state.direction = !state.direction
    },
    setTableSearchedVehicles(state: ITableDataState, action: PayloadAction<ITableData[] | null>) {
      state.searchedTableData = action.payload
    },
  },
})

export const { setTableData, setSort, setDirection, setTableSearchedVehicles } = tableSlice.actions
export default tableSlice.reducer
