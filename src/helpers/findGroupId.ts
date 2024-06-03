import { IVehicleGroup } from '@/interfaces/vehicle'

export function findGroupId(groups: IVehicleGroup[], vehicleId: string) {
	let id: number = 0
	const group = groups[1]
	for (let i = 0; i < groups.length; i++) {
		const group = groups[i]
		group.vehicles.map(vehicle => {
			if (vehicle.vehicle_uid == vehicleId) {
				id = group.id
			}
		})
	}

	return id
}
