import { IVehicle, IVehicleGroup } from '@/interfaces/vehicle'

export const allItems = (data: IVehicleGroup[]): IVehicle[] => {
	let children: IVehicle[] = []

	data.forEach(obj => {
		children.push(...obj.vehicles)
	})

	return children
}
