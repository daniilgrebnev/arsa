import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ICatalog {
	id: number
	comment: string
	name: string
}
interface IOpenCloseWithType {
	isOpen: boolean
	type?: 'create' | 'update' | null
}
interface ICatalogState {
	data: ICatalog[]
	isOpen: boolean
	createUpdate: {
		isOpenCreateUpdate: boolean
		createUpdateType: 'create' | 'update' | null
		updatedElem: ICatalog | null
	}
}

const initialState: ICatalogState = {
	data: [],
	isOpen: false,
	createUpdate: {
		isOpenCreateUpdate: false,
		createUpdateType: null,
		updatedElem: null,
	},
}

const catalogSlice = createSlice({
	name: 'catalog',
	initialState,
	reducers: {
		setCatalog: (
			state: ICatalogState,
			action: PayloadAction<ICatalog[] | []>
		) => {
			state.data = action.payload
		},
		setOpenCatalog: (state: ICatalogState, action: PayloadAction<boolean>) => {
			state.isOpen = action.payload
		},
		setNewTire: (state: ICatalogState, action: PayloadAction<ICatalog>) => {
			state.data.unshift(action.payload)
		},
		setCreate: (
			state: ICatalogState,
			action: PayloadAction<IOpenCloseWithType>
		) => {
			state.createUpdate.createUpdateType = action.payload.type
				? action.payload.type
				: null

			state.createUpdate.isOpenCreateUpdate = action.payload.isOpen
			state.createUpdate.updatedElem = null
		},
		setUpdatedElem: (
			state: ICatalogState,
			action: PayloadAction<ICatalog | null>
		) => {
			state.createUpdate.updatedElem = action.payload
			state.createUpdate.createUpdateType = 'update'
			state.createUpdate.isOpenCreateUpdate = true
		},
	},
})

export const {
	setCatalog,
	setOpenCatalog,
	setNewTire,
	setCreate,
	setUpdatedElem,
} = catalogSlice.actions
export default catalogSlice.reducer
