import { IVehicleData } from "@/interfaces/vehicleTree"
import { AppDispatch, RootState } from "@/store/store"
import { uniqBy } from "lodash"
import { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  setDefaultDriverFilterData,
  setDriverSearch,
  setDriversFilteredData,
} from "../../../../store/reducers/drivers/driverSlice"
import { setIsSearch } from "../../../../store/reducers/vehicles/vehicleSlice"

export const SearchDrivers = () => {
  const [searchValue, setSearchValue] = useState("")
  const dispatch = useDispatch<AppDispatch>()
  const data = useSelector((state: RootState) => state.driver.data)

  const textProcess = (text: string) => {
    return text ? text.toLowerCase().trim() : ""
  }

  const searchHandler = useCallback(
    (text: string) => {
      const processText = textProcess(text)
      console.log(processText)
      if (processText.length > 0 && data && Array.isArray(data)) {
        dispatch(setIsSearch(true))
        dispatch(setDriverSearch(true))

        const searchFilter = (filterFunc: (driver: any) => boolean) =>
          data
            .map((group: any) => ({
              ...group,
              drivers: group.drivers ? group.drivers.filter(filterFunc) : [],
            }))
            .filter((group) => group.drivers && group.drivers.length > 0)

        const filterByName = searchFilter((driver) =>
          textProcess(`${driver.surname} ${driver.first_name} ${driver.patronymic}`).includes(
            processText,
          ),
        )

        const filterByGroupName = data.filter((group) =>
          textProcess(group.group_name).includes(processText),
        )

        const activeParentGroups = filterByGroupName.map((i) => i.id)

        const additionalFilteredGroups = data.filter((group: any) =>
          activeParentGroups.includes(group.parent_id),
        )

        filterByGroupName.push(...additionalFilteredGroups)

        const filterByTerminalID = searchFilter((driver) =>
          textProcess(driver?.driver_code.toString()).includes(processText),
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
              data.filter((parentGroup: any) => parentGroup.id === group.parent_id),
            )
            parentGroups.forEach((group) => {
              combineSearches[group.id] = group
            })
          }

          addParentGroups(filterByName)
          addParentGroups(filterByTerminalID)
        }

        const finalizing: any = Object.values(combineSearches)
        const levelMax = Math.max(...finalizing.map((group: any) => group.level))

        const higherLevelGroups = data.filter((group: any) => group.level > levelMax)
        higherLevelGroups.forEach((group) => {
          combineSearches[group.id] = group
        })

        const findAllParents = (items, parents, allFound: any = []) => {
          let newFound = items.filter((item) =>
            parents.some((parent) => parent.parent_id === item.id),
          )

          if (newFound.length === 0) {
            return allFound
          } else {
            allFound.push(...newFound)
            return findAllParents(items, newFound, allFound)
          }
        }

        const heighInWork = findAllParents(data, finalizing)
        const finArr = finalizing.concat(uniqBy(heighInWork, "account_id"))
        console.log(finArr)
        dispatch(setDriversFilteredData(finArr))
      } else {
        dispatch(setDriverSearch(false))
        dispatch(setIsSearch(false))
        dispatch(setDefaultDriverFilterData())
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
