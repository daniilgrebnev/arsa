import { IVehicleData } from "@/interfaces/vehicleTree"
import { AppDispatch, RootState } from "@/store/store"
import { uniq } from "lodash"
import { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  setDefaultFilteredData,
  setFilteredData,
  setIsSearch,
} from "../../../../store/reducers/vehicles/vehicleSlice"

export const Search = () => {
  const [searchValue, setSearchValue] = useState("")
  const dispatch = useDispatch<AppDispatch>()

  const { data } = useSelector((state: RootState) => state.vehicles)

  const textProcess = (text: string) => text.toLowerCase().trim()

  const searchHandler = useCallback(
    (text: string) => {
      const processText = textProcess(text)
      if (processText.length > 0 && data && typeof data !== "string") {
        dispatch(setIsSearch(true))
        const searchFilter = (filterFunc: (vehicle: any) => boolean) =>
          data.data
            .map((group: any) => ({
              ...group,
              vehicles: group.vehicles?.filter(filterFunc),
            }))
            .filter((group) => group.vehicles && group.vehicles.length > 0)

        const filterByName = searchFilter((vehicle) =>
          textProcess(vehicle.vehicle_name).includes(processText),
        )

        const filterByGroupName = data.data.filter((group) =>
          textProcess(group.group_name).includes(processText),
        )

        const activeParentGroups = filterByGroupName.map((i) => i.id)

        const additionalFilteredGroups = data.data.filter((group: any) =>
          activeParentGroups.includes(group.parent_id),
        )

        filterByGroupName.push(...additionalFilteredGroups)

        const filterByTerminalID = searchFilter((vehicle) =>
          textProcess(vehicle.vehicle_id.toString()).includes(processText),
        )

        const combineSearches: { [key: number]: IVehicleData } = {}

        filterByGroupName.forEach((group) => {
          combineSearches[group.id] = group
        })

        if (filterByGroupName.length === 0) {
          filterByName.forEach((group) => {
            combineSearches[group.id] = group
          })
          filterByTerminalID.forEach((group) => {
            combineSearches[group.id] = group
          })
        } else {
          const addParentGroups = (searchResult: IVehicleData[]) => {
            const parentGroups = searchResult.flatMap((group) =>
              data.data.filter((parentGroup: any) => parentGroup.id === group.parent_id),
            )
            parentGroups.forEach((group) => {
              combineSearches[group.id] = group
            })
          }

          addParentGroups(filterByName)
          addParentGroups(filterByTerminalID)
        }

        const finalizing = Object.values(combineSearches)
        const levelMax = Math.max(...finalizing.map((group: any) => group.level))

        const higherLevelGroups = data.data.filter((group: any) => group.level > levelMax)
        higherLevelGroups.forEach((group) => {
          combineSearches[group.id] = group
        })

        const heighInWork = data.data.filter((item) =>
          finalizing.some((group) => group.parent_id == item.id),
        )

        dispatch(setFilteredData(uniq([...finalizing, ...heighInWork])))
      } else {
        dispatch(setIsSearch(false))
        dispatch(setDefaultFilteredData())
      }
    },
    [data, dispatch],
  )

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
