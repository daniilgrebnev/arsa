import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from './../../../store/store'
import { DriverTree } from './DriverTree'
import { GeozoneTree } from './GeozoneTree'
import { VehicleTree } from './VehicleTree'
import './style.css'

import { Search } from './Search/Search'

export const CheckboxTreeContainer = () => {
	const [activeTab, setActiveTab] = useState('transport')
	const countCheckedVehicle = useSelector(
		(state: RootState) => state.security.vehiclesCheked
	)

	const countCheckedGeozone = useSelector(
		(state: RootState) => state.security.geozonesCheked
	)
	const groups = useSelector((state: RootState) => state.security.groupsVehicle)
	const searchedGroups = useSelector(
		(state: RootState) => state.security.searchedVehicle
	)
	const currentGroups = searchedGroups == null ? groups : searchedGroups
	const tabs = [
		{
			title: 'Транспорт',
			value: 'transport',
		},
		{
			title: 'Водители',
			value: 'driver',
		},
		{
			title: 'Геозона',
			value: 'geoZone',
		},
	]

	return (
		<div className='mx-auto rounded-t-lg menu-main '>
			<nav
				className='flex items-center justify-between   my-2 px-4 py-3  '
				style={{
					borderBottom: 'solid 2px var(--main-color)',
					paddingBottom: '21px',
				}}
			>
				{tabs.map((tab, index) => (
					<div
						onClick={() => setActiveTab(tab.value)}
						className={`  left-bar-tab ${
							activeTab === tab.value ? 'active' : ''
						} text-center cursor-pointer hover:text-gray-500`}
						key={index}
					>
						{tab.title}{' '}
						{tab.value === 'transport' && countCheckedVehicle.length}
						{tab.value === 'geoZone' && countCheckedGeozone.length}
					</div>
				))}
			</nav>
			<div className='tree '>
				{activeTab === 'transport' && (
					<>
						<Search /> <VehicleTree groups={currentGroups} />
					</>
				)}
				{activeTab === 'driver' && <DriverTree />}
				{activeTab === 'geoZone' && <GeozoneTree />}
			</div>
		</div>
	)
}
