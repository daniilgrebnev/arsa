import { AppDispatch } from "@/store/store"
import { uniqBy } from "lodash"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  setDefaultDriverFilterData,
  setDriverSearch,
  setDriversFilteredData,
} from "../../../../store/reducers/drivers/driverSlice"

export const SearchDrivers = () => {
  const [searchValue, setSearchValue] = useState("")
  const dispatch = useDispatch<AppDispatch>()
  const data = useSelector((state: any) => state.driver.data)

  const textProcess = (text: string) => {
    return text ? text.toLowerCase().trim() : ""
  }

  const searchHandler = (text: string) => {
    let searchedData: any = data
    const processedText = textProcess(text)
    dispatch(setDriverSearch(true))

    const terminalIdSearch: any[] = []

    searchedData.forEach((element) => {
      // Create a new object with all properties of the current element
      const newElement = {
        ...element,
        drivers:
          // Check if vehicles is not null
          element.drivers !== null
            ? // If not null, filter the vehicles array
              element.drivers.filter(
                (car) => car.driver_code.toString().trim().toLowerCase() === processedText,
              )
            : // If null, keep it as null
              null,
      }

      // Push the new object into terminalIdSearch array
      terminalIdSearch.push(newElement)
    })

    // Log the resulting array
    const terminalSearhing = terminalIdSearch.filter(
      (item) => item.drivers != null && item.drivers.length > 0,
    )
    console.log(terminalSearhing)

    const groupNameSearched: any = searchedData.filter((item) =>
      item.group_name.toLowerCase().trim().includes(processedText),
    )
    const childGroupsIds = groupNameSearched.map((item) => item.id)
    const childGroups = data.filter((item) =>
      childGroupsIds.some((groups) => item.parent_id === groups && item.id !== groups),
    )

    const finalGNSearch = [...childGroups, ...groupNameSearched]
    console.log(finalGNSearch)
    const vehicleNameSearched: any = []
    searchedData.forEach((element) => {
      vehicleNameSearched.push({
        ...element,
        drivers:
          element.drivers !== null
            ? element.drivers?.filter((car) =>
                car.driver_name.trim().toLowerCase().includes(processedText),
              )
            : null,
      })
    })
    const terminalIdSearched: any[] = []
    searchedData.forEach((element) => {
      terminalIdSearched.push({
        ...element,
        drivers:
          element.drivers != null
            ? element.drivers.filter(
                (car) => car.driver_code.toString().toLowerCase().trim() === processedText,
              )
            : null,
      })
    })

    const combineSearches =
      terminalSearhing.length === 0
        ? groupNameSearched.length === 0
          ? vehicleNameSearched.filter((item) => item.drivers != null && item.drivers.length !== 0)
          : finalGNSearch
        : terminalSearhing

    const maxLevel = Math.max(...combineSearches.map((item: any) => item.level), 0)

    const highLevelGroups = data.filter((group: any) => group.level < maxLevel)

    const rootGroups = highLevelGroups.filter((group: any) => group.level < maxLevel - 1)

    const filteredHighLevel = highLevelGroups.filter((group: any) =>
      combineSearches.some((groupFilter: any) => group.id === groupFilter.parent_id),
    )

    const searchResult = uniqBy(
      [...filteredHighLevel, ...combineSearches, ...rootGroups],
      "group_name",
    )
    console.log(searchResult)
    // Dispatch the filtered data to Redux state
    dispatch(setDriversFilteredData(searchResult))
  }

  return (
    <div>
      <div className="bg-white mb-6 flex items-center justify-between px-2 py-1 rounded-lg">
        <div className="icon-search text-2xl"></div>
        <input
          className="bg-transparent text-gray-800 placeholder:font-light w-full focus-within:outline-none px-2"
          type="text"
          onChange={(e) => {
            setSearchValue(e.target.value)
            searchHandler(e.target.value)
          }}
          value={searchValue}
          placeholder={"Введите имя водителя"}
        />
        <div
          title="Сбросить поиск"
          onClick={() => {
            setSearchValue("")
            dispatch(setDefaultDriverFilterData())
          }}
          className="text-red-600 text-2xl cursor-pointer"
        >
          x
        </div>
      </div>
    </div>
  )
}
