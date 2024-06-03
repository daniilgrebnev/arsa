import { PayloadAction, createSlice } from '@reduxjs/toolkit'


interface IErrorBanner {
	
	description: string
	
}

interface IErrorState {
	errorBanner: IErrorBanner | null
	isOpenErrorBanner: boolean
}

const initialState:IErrorState = {
	errorBanner: null,
	isOpenErrorBanner: false
}

const errorSlice = createSlice({
	name: 'error',
	initialState,
	reducers: {
		setErrorBanner: (state:IErrorState,action:PayloadAction<IErrorBanner | null>)=>{
			state.errorBanner = action.payload
			state.isOpenErrorBanner = true
			setTimeout(()=>{
				state.isOpenErrorBanner = false
			},3000)
		}
	}
})

export const {setErrorBanner}  = errorSlice.actions
export default errorSlice.reducer