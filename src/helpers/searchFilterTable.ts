import { ITableData } from "@/interfaces/table"

export const searchInTable = (tableData: ITableData[], text: string): ITableData[] => {
  return tableData.filter(
    (vehicle) =>
      vehicle.vehicle_name.toLowerCase().includes(text.toLowerCase()) ||
      vehicle.vehicle_uid.toLowerCase().includes(text.toLowerCase()) ||
      vehicle.driver?.driver_code?.toString().toLowerCase().includes(text.toLowerCase()) ||
      vehicle.driver?.driver_name?.toLowerCase().includes(text.toLowerCase()),
  )
}
