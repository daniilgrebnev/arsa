import { IVehicle } from '@/interfaces/vehicle'

export const filterChecked = (data: IVehicle[]) => {
	let requestTableData: string[] = []
	for (let i = 0; data.length > i; i++) {
		requestTableData.push(data[i].vehicle_uid)
	}
	return requestTableData
}
