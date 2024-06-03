import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'

interface IBannerError {
	text: string
	timing: number
}
export const ErrorBanner = () => {
	const {errorBanner, isOpenErrorBanner} = useSelector((state:RootState)=> state.error)
	return (
		<div className='bg-red-500 p-4 pr-20 rounded-l-lg text-white absolute right-0 top-[6%] z-[2000]'>
			<div className=""></div>
			<div className="">{errorBanner!=null? errorBanner.description : 'Unknown error'}</div>
			<div className=""></div>
		</div>
	)
}
