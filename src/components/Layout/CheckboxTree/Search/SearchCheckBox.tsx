import { AppDispatch, RootState } from '@/store/store'
import { useDispatch, useSelector } from 'react-redux'
import { findGroupId } from '../../../../helpers/findGroupId'
import { setVehicleCheked } from '../../../../store/reducers/security/security'

export const SearchCheckBox = (vehicleArr: any) => {
	const vehicle = vehicleArr.vehicle
	const dispatch = useDispatch<AppDispatch>()
	const checked = useSelector(
		(state: RootState) => state.security.vehiclesCheked
	)
	const groups = useSelector((state: RootState) => state.security.groupsVehicle)
	const groupId = findGroupId(groups, vehicle.vehicle_uid)

	return (
		<label key={vehicle.vehicle_uid} className='tree-folder__element'>
			<div
				className={`tree-folder__checkbox ${
					checked.includes(vehicle) ? 'icon-checked' : ''
				}`}
			></div>
			<input
				type='checkbox'
				checked={checked.includes(vehicle)}
				onChange={() =>
					dispatch(setVehicleCheked({ vehicle: vehicle, id: groupId }))
				}
			/>
			<div className='text-white cursor-pointer'>{vehicle.vehicle_name}</div>
		</label>
	)
}
