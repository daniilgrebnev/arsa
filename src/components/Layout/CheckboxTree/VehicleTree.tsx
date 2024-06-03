/* eslint-disable react-hooks/exhaustive-deps */
import { AppDispatch, RootState } from '@/store/store'
import { useDispatch, useSelector } from 'react-redux'
import {
	removeVehicleCheked,
	removeVehicleChekedGroup,
	setVehicleCheked,
	setVehicleChekedAll,
	setVehicleChekedGroup,
} from './../../../store/reducers/security/security'
import { SimpleFolder } from './SimpleFolder/SimpleFolder'
import { VehicleCheckbox } from './VehicleCheckbox/VehicleCheckbox'

export const VehicleTree = (groupsArr: any) => {
	const groups = groupsArr.groups
	const dispatch: AppDispatch = useDispatch()

	const vehiclesCheked = useSelector(
		(state: RootState) => state.security.vehiclesCheked
	)
	const isAllVehicleCheked = useSelector(
		(state: RootState) => state.security.isAllVehicleCheked
	)

	const onChekedAll = () => {
		if (isAllVehicleCheked === 'all') {
			dispatch(removeVehicleCheked())
			return
		}
		dispatch(setVehicleChekedAll())
	}
	const searchedGroups = useSelector(
		(state: RootState) => state.security.searchedVehicle
	)
	return groups.length > 0 ? (
		<div className=''>
			<SimpleFolder
				title='Все'
				status={isAllVehicleCheked}
				onCheked={onChekedAll}
			>
				{groups.map((group, id) => {
					return (
						<VehicleCheckbox
							group={group}
							cheked={vehiclesCheked}
							onCheked={setVehicleCheked}
							onCheckedGroup={setVehicleChekedGroup}
							onRemoveCheckedGroup={removeVehicleChekedGroup}
							key={id}
						/>
					)
				})}
			</SimpleFolder>
		</div>
	) : (
		<p>
			{searchedGroups?.length == 0 ? (
				'По вашему запросу ничего не найдено.'
			) : (
				<p className='text-center'>Загрузка...</p>
			)}
		</p>
	)
}
