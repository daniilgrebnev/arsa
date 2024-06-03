import { IVehicle } from "@/interfaces/vehicle"
import { AppDispatch, RootState } from "@/store/store"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { allItems } from "../../../../helpers/mapAllVehicles"
import { filterSearch } from "../../../../helpers/searchFilterGroups"
import { setSearchedVehicle } from "../../../../store/reducers/security/security"

export const Search = () => {
  const [showSearch, setShowSearch] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const checkedVehicles = useSelector((state: RootState) => state.security.vehiclesCheked)
  const groups = useSelector((state: RootState) => state.security.groupsVehicle)
  const items: IVehicle[] = allItems(groups)

  const dispatch = useDispatch<AppDispatch>()

  const searchHandler = (text) => {
    setSearchValue(text)
    text.length > 0 && dispatch(setSearchedVehicle(filterSearch(groups, searchValue)))
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
          }}
          value={searchValue}
          placeholder={"Введите название ТС"}
        />
        <div
          title="Сбросить поиск"
          onClick={() => {
            setSearchValue("")
            dispatch(setSearchedVehicle(null))
          }}
          className="text-red-600 text-2xl cursor-pointer"
        >
          x
        </div>
      </div>
    </div>
  )
}
