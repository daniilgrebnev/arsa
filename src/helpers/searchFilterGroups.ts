import { IVehicleGroup } from '@/interfaces/vehicle'

export const filterSearch = (groups: IVehicleGroup[], text: string) => {
	return groups
		.map(group => {
			return {
				...group,
				vehicles: group.vehicles.filter(
					vehicle =>
						vehicle.object_name.toLowerCase().includes(text.toLowerCase()) ||
						vehicle.vehicle_uid.toLowerCase().includes(text.toLowerCase())
				),
			}
		})
		.filter(group => group.vehicles.length > 0)
}
