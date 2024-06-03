import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ITpmsState {
	page: 'chart' | 'table'
}

const initialState = {
	page: 'chart',
}

const tpmsSlice = createSlice({
	name: 'tpms',
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<'chart' | 'table'>) => {
			state.page = action.payload
		},
	},
})

export const { setPage } = tpmsSlice.actions
export default tpmsSlice.reducer
