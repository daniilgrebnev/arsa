import { ITableData } from "@/interfaces/table"
import { DateTime } from "ts-luxon"

export const tableFilter = (
  data: ITableData[],
  filters: string[],
  combination: string = "and",
): ITableData[] => {
  if (filters.length === 0) {
    return data
  }

  if (combination === "or") {
    const filteredData: ITableData[][] = filters.map((filter) => filterHandler(data, filter))
    return filteredData
      .reduce((acc, val) => acc.concat(val), [])
      .filter((item, index, self) => self.indexOf(item) === index)
  } else {
    return filters.reduce((filteredData, filter) => filterHandler(filteredData, filter), data)
  }
}

const filterHandler = (data: ITableData[], filter: string): ITableData[] => {
  const now = DateTime.now().toSeconds()

  if (filter.startsWith("tire-")) {
    const tireFilter = filter.replace("tire-", "")
    return data.filter((item) => item.wheel_pressure.some((i) => i.wmn === tireFilter))
  }

  switch (filter) {
    case "allNotNorm":
      return data.filter(
        (item) =>
          item.wheel_pressure.some(
            (i) => i.d && now - i.d < item.settings.sensors_valid_time_period,
          ) && item.sensors_out_of_norm,
      )

    case "allNorm":
      return data.filter((item) => item.all_sensors_in_norm)

    case "noData":
      return data.filter((item) => item.sensors_without_data)

    case "noSensors":
      return data.filter((item) => item.wheel_pressure.length === 0)

    case "olderData":
      return data.filter((item) =>
        item.wheel_pressure.some((i) => i.d && now - i.d > item.settings.sensors_valid_time_period),
      )

    case "noData30Days":
      return data.filter((item) => now - item.last_event_date > 2592000)

    case "delay30minFromTS":
      return data.filter((item) => item.last_event_date != 0 && now - item.last_event_date > 1800)

    case "workWithCard":
      return data.filter((item) => item.driver.driver_name !== null)

    case "workWithoutCard":
      return data.filter(
        (item) => item.driver.driver_code === null && item.driver.driver_name === null,
      )

    case "cardWithoutDriver":
      return data.filter(
        (item) => item.driver.driver_code !== null && item.driver.driver_name === null,
      )

    case "truck":
      return data.filter((item) => item.category_id === 1)

    case "auto":
      return data.filter((item) => item.category_id === 2)

    case "tractor":
      return data.filter((item) => item.category_id === 4)

    case "noDataFromTS":
      return data.filter((item) => item.last_event_date === 0)

    case "noDataFromTire":
      return data.filter((item) => item.wheel_model_names.length === 0)

    case "sensorsWrong":
      return data.filter((item) => item.sensors_numbers_error === true)
    case "all":
      return data
    default:
      return []
  }
}
