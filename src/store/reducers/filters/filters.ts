import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IFiltersState {
  filters: string[]
  type: "or" | "and"
}

const initialState: IFiltersState = {
  filters: [],
  type: "or",
}

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      if (state.filters.includes(action.payload)) {
        state.filters = state.filters.filter((filter) => filter !== action.payload)
      } else {
        state.filters.push(action.payload)
      }
    },
    removeFilter: (state, action: PayloadAction<string>) => {
      state.filters = state.filters.filter((filter) => filter !== action.payload)
    },
    setInitialFilter: (state) => {
      state.filters = []
    },
    setFilterType: (state: IFiltersState, action: PayloadAction<"or" | "and">) => {
      state.type = action.payload
    },
    setGroupFilter: (state, action: PayloadAction<string[]>) => {
      // Check if all items in action payload are already in state's filters
      const allItemsToRemove = state.filters.filter((item) => action.payload.includes(item))

      if (allItemsToRemove.length > 0) {
        // If there are items to remove, filter them out from the state's filters array
        state.filters = state.filters.filter((item) => !allItemsToRemove.includes(item))
      }

      // Add new items from the action payload
      const newFilters = action.payload.filter((item) => !state.filters.includes(item))
      state.filters.push(...newFilters)
    },
  },
})

export const { setFilter, removeFilter, setInitialFilter, setGroupFilter, setFilterType } =
  filtersSlice.actions
export default filtersSlice.reducer
