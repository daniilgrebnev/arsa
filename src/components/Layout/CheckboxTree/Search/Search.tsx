import { AppDispatch } from "@/store/store"
import { uniqBy } from "lodash"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  setDefaultFilteredData,
  setFilteredData,
  setIsSearch,
} from "../../../../store/reducers/vehicles/vehicleSlice"

export const Search = () => {
  const [searchValue, setSearchValue] = useState("")
  const dispatch = useDispatch<AppDispatch>()

  const data = useSelector((state: any) => state.vehicles.data?.data)

  const textProcess = (text: string) => {
    return text !== undefined ? text.toString().toLowerCase().trim() : ""
  }
  console.log(data)

  const searchHandler = (text: string) => {
    let searchedData: any = data
    dispatch(setIsSearch(true))
    const processedText = textProcess(text)

    if (searchValue.length != 0) {
      const terminalIdSearch: any[] = []

      searchedData.forEach((element) => {
        // Create a new object with all properties of the current element
        const newElement = {
          ...element,
          vehicles:
            // Check if vehicles is not null
            element.vehicles !== null
              ? // If not null, filter the vehicles array
                element.vehicles.filter(
                  (car) => car.vehicle_id.toString().trim().toLowerCase() === processedText,
                )
              : // If null, keep it as null
                null,
        }

        // Push the new object into terminalIdSearch array
        terminalIdSearch.push(newElement)
      })

      // Log the resulting array
      const terminalSearhing = terminalIdSearch.filter(
        (item) => item.vehicles != null && item.vehicles.length > 0,
      )

      const groupNameSearched: any = searchedData.filter((item) =>
        item.group_name.toLowerCase().trim().includes(processedText),
      )
      const childGroupsIds = groupNameSearched.map((item) => item.id)
      const childGroups = data.filter((item) =>
        childGroupsIds.some((groups) => item.parent_id === groups && item.id !== groups),
      )

      const finalGNSearch = [...childGroups, ...groupNameSearched]

      const vehicleNameSearched: any = []
      searchedData.forEach((element) => {
        vehicleNameSearched.push({
          ...element,
          vehicles:
            element.vehicles !== null
              ? element.vehicles?.filter((car) =>
                  car.vehicle_name.trim().toLowerCase().includes(processedText),
                )
              : null,
        })
      })
      const terminalIdSearched: any[] = []
      searchedData.forEach((element) => {
        terminalIdSearched.push({
          ...element,
          vehicles:
            element.vehicles != null
              ? element.vehicles.filter(
                  (car) => car.vehicle_id.toString().toLowerCase().trim() === processedText,
                )
              : null,
        })
      })

      const combineSearches =
        terminalSearhing.length === 0
          ? groupNameSearched.length === 0
            ? vehicleNameSearched.filter(
                (item) => item.vehicles != null && item.vehicles.length !== 0,
              )
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

      // Dispatch the filtered data to Redux state
      dispatch(setFilteredData(searchResult))
    } else {
      dispatch(setDefaultFilteredData())
    }
  }

  return (
    <div>
      <div className="bg-white mb-6 flex items-center justify-between px-2 py-1 rounded-lg">
        <div className="icon-search text-2xl"></div>
        <input
          className="bg-transparent text-gray-800 placeholder:font-light w-full focus-within:outline-none px-2"
          type="text"
          onChange={(e) => {
            setSearchValue(e.target.value.toString())
            searchHandler(e.target.value.toString())
          }}
          value={searchValue}
          placeholder={"Введите название ТС"}
        />
        <div
          title="Сбросить поиск"
          onClick={() => {
            setSearchValue("")

            dispatch(setDefaultFilteredData())
          }}
          className="text-red-600 text-2xl cursor-pointer"
        >
          x
        </div>
      </div>
    </div>
  )
}
