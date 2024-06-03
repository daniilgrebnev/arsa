import { AppDispatch, RootState } from "@/store/store"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { filterChecked } from "../../../../helpers/checked-data-filter"
import { searchInTable } from "../../../../helpers/searchFilterTable"
import { setFilterType } from "../../../../store/reducers/filters/filters"
import { setTableSearchedVehicles } from "../../../../store/reducers/table/table"
import { thunkGetTableData } from "../../../../store/reducers/table/tableThunk"
import { FilterMenu } from "./FilterMenu"
import { ArrowCircle, FilterIcon } from "./Icons/ArrowCircle"
// Разбить на компоненты!!!!!!!!!!!!!

interface IOrAnd {
  name: string
  hand: "or" | "and"
}

export const TableFilters = () => {
  const [filterOpen, setFilterOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const dispatch = useDispatch<AppDispatch>()
  const checkedItems: string[] = filterChecked(
    useSelector((state: any) => state.security.vehiclesCheked),
  )
  const tableData = useSelector((state: RootState) => state.table.data)
  const { type } = useSelector((state: RootState) => state.filters)
  const reloadHandler = () => {
    dispatch(thunkGetTableData(checkedItems))
  }

  const searchHandler = (text) => {
    setSearchValue(text)
    if (typeof tableData != "string") {
      dispatch(setTableSearchedVehicles(searchInTable(tableData, text)))
    }
  }

  const orAnd: IOrAnd[] = [
    {
      name: "Любой из",
      hand: "or",
    },
    {
      name: "Все вместе",
      hand: "and",
    },
  ]
  return (
    <div className=" flex items-center transition-all justify-start gap-3 ml-[2.5%] w-[95%] bg-zinc-700 text-white p-4  mb-1 rounded-lg">
      <button
        onClick={reloadHandler}
        className="text-lg text-black bg-gray-200 hover:bg-gray-100 rounded-lg h-8 px-2 gap-2 font-light flex items-center justify-center"
      >
        {" "}
        <ArrowCircle fill="black" width={20} />
        <span className="">Обновить</span>
      </button>
      <div className="">
        <div className="">
          <div
            onClick={() => setFilterOpen(true)}
            className={`text-lg cursor-pointer hover:bg-gray-100 z-20 relative text-black bg-gray-200 rounded-lg h-8 px-2 gap-2 font-light flex items-center justify-center ${
              filterOpen && "bg-transparent hover:bg-transparent cursor-text"
            }`}
          >
            <FilterIcon width={25} fill="black" />
            <span>Фильтры</span>
          </div>
          <div
            style={{
              width: filterOpen ? "100%" : 0,
              height: filterOpen ? "fit-content" : 0,
              padding: filterOpen ? "3rem 0.2rem 1rem 0.4rem" : "0",
              top: filterOpen ? "0.75rem" : "2rem",
              left: filterOpen ? "0" : "auto",
            }}
            onMouseLeave={() => setFilterOpen(false)}
            className="border-y border-y-orange-400 w-full left-0 z-10 overflow-hidden transition-all  text-black shadow-lg bg-gray-200 absolute  top-3 rounded-lg h-1/3 "
          >
            {filterOpen ? (
              <>
                <button
                  onClick={() => setFilterOpen(false)}
                  className="absolute font-semibold text-lg icon-cross
									 text-red-400 right-3 top-3"
                ></button>
                <div className="top-0 w-full flex gap-2 flex-col items-start justify-center">
                  <div className="relative ">Тип фильтрации</div>
                  <div
                    style={{
                      boxShadow: "0px 0px 20px 0px #a6a6a6",
                    }}
                    className="items-center relative   flex bg-white   justify-center rounded-sm"
                  >
                    {orAnd.map((item, index) => (
                      <div
                        onClick={() => dispatch(setFilterType(item.hand))}
                        className={` ${type == item.hand && "bg-orange-500 text-white hover:bg-orange-600"} w-1/2 flex items-center justify-center h-full text-nowrap text-sm font-light py-1 px-4 cursor-pointer hover:bg-gray-100`}
                        key={index}
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                  {/* <div className="relative left-10">Тип фильтрации</div> */}
                </div>
                <FilterMenu />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div
        onClick={() => !searchOpen && setSearchOpen(true)}
        className={`text-lg cursor-pointer overflow-hidden hover:bg-gray-100  relative text-black bg-gray-200 rounded-lg h-8 px-2 gap-2 font-light flex items-center transition-all justify-start  ${
          searchOpen ? " hover:bg-gray-200 w-96" : "w-28"
        }`}
      >
        {!searchOpen ? (
          <div className="icon-search text-xl text-black"></div>
        ) : (
          <div onClick={() => setSearchOpen(true)} className="icon-search text-xl text-black"></div>
        )}

        <div className="transition-all">
          {searchOpen ? (
            <div className="flex  items-center justify-between">
              <input
                value={searchValue}
                onChange={(e) => {
                  searchHandler(e.target.value)
                }}
                type="text"
                className="bg-transparent focus-within:outline-none mr-2 placeholder:font-light font-base"
                placeholder="Поиск..."
              />
              <div
                title="Скрыть поиск"
                onClick={() => setSearchOpen(false)}
                className="text-stone-800 hover:bg-slate-300 transition-all ml-2 absolute right-8 bg-white w-6 flex items-center justify-center aspect-square rounded rotate-90 text-2xl "
              >
                <div className="icon-expand"></div>
              </div>
              <button
                title="Очистить"
                onClick={() => {
                  setSearchOpen(false)
                  setSearchValue("")
                  dispatch(setTableSearchedVehicles(null))
                }}
                className=" absolute right-0  w-8 flex items-center justify-center aspect-square rounded"
              >
                <div className="icon-cross text-sm text-red-500"></div>
              </button>
            </div>
          ) : (
            <span>Поиск</span>
          )}
        </div>
      </div>
    </div>
  )
}
