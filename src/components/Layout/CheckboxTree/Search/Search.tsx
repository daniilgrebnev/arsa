import { AppDispatch, RootState } from "@/store/store"
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

  const { checkedVehicles, data, filteredData } = useSelector((state: RootState) => state.vehicles)

  const searchHandler = (text: string) => {
    console.log(searchValue)
    const textProcess = (text: string) => {
      return text.toLowerCase().trim()
    }

    if (text.length > 0) {
      const searchFilter =
        typeof data != "string" && data != null
          ? data.data
              .map((group: any) => ({
                ...group,
                vehicles: group.vehicles?.filter((vehicle) =>
                  textProcess(vehicle.vehicle_name).includes(textProcess(text)),
                ),
              }))
              .filter((group) => group.vehicles && group.vehicles.length > 0)
          : []

      dispatch(setIsSearch(true))
      console.log(searchFilter)
      dispatch(setFilteredData(searchFilter))
    } else {
      dispatch(setIsSearch(false))
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
            searchHandler(e.target.value)
            setSearchValue(e.target.value)
          }}
          value={searchValue}
          placeholder={"Введите название ТС"}
        />
        <div
          title="Сбросить поиск"
          onClick={() => {
            setSearchValue("")
            dispatch(dispatch(setDefaultFilteredData()))
          }}
          className="text-red-600 text-2xl cursor-pointer"
        >
          x
        </div>
      </div>
    </div>
  )
}
