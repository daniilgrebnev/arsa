import { AppDispatch, RootState } from "@/store/store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCreate, setOpenCatalog } from "../../../../store/reducers/catalog/catalog"
import { CatalogItem } from "./CatalogItem"
import "./catalog.css"
import { AddUpdateTire } from "./options/AddUpdateTire"

export const Catalog = () => {
  const [inputText, setInputText] = useState("")

  const dispatch = useDispatch<AppDispatch>()
  const [currentData, setCurrentData] = useState<any[]>()
  let { data, isOpen } = useSelector((state: RootState) => state.catalog)
  // const account_id = useSelector((state: RootState) => state.car.data.data.account_id)
  useEffect(() => {}, [data])

  const searchHandler = (text) => {
    setInputText(text)
    setCurrentData(data.filter((item) => item.name.toLowerCase().includes(text.toLowerCase())))
  }
  const { isOpenCreateUpdate } = useSelector((state: RootState) => state.catalog.createUpdate)
  return (
    <>
      {isOpen && (
        <div className="catalog-wrapper gap-10 transition-all">
          <div className="catalog-content relative">
            <div
              onClick={() => dispatch(setOpenCatalog(false))}
              className="icon-cross absolute right-6 top-6 text-xl cursor-pointer text-red-500"
            ></div>
            <h1 className="">Справочник моделей шин</h1>

            <div className="my-4 bg-white rounded-lg flex items-center justify-center w-fit mx-auto px-2 py-1">
              <div className="icon-search text-2xl text-orange-500"></div>
              <input
                onChange={(e) => searchHandler(e.target.value)}
                value={inputText}
                placeholder="Поиск..."
                type="text"
                className="focus-within:outline-none bg-transparent px-4 py-1 font-light text-stone-800"
              />

              <div
                onClick={() => setInputText("")}
                className="icon-cross icon-search text-lg text-red-500"
              ></div>
            </div>

            <div className="flex flex-col  items-center justify-center w-full gap-3 h-[50%] max-h-[50%] overflow-hidden overflow-y-auto">
              <div
                onClick={() =>
                  dispatch(
                    setCreate({
                      isOpen: true,
                      type: "create",
                    }),
                  )
                }
                className="w-fit bg-gray-200 px-10 py-2 select-none cursor-pointer transition-all text-xl font-light text-black hover:bg-gray-100 active:bg-gray-300 mx-auto rounded-lg"
              >
                Добавить шину
              </div>
              {inputText.length == 0
                ? data?.map((i) => <CatalogItem id={i.id} comment={i.comment} name={i.name} />)
                : currentData?.map((i) => (
                    <CatalogItem id={i.id} comment={i.comment} name={i.name} />
                  ))}
            </div>
          </div>

          <div
            style={{
              width: isOpenCreateUpdate ? "fit-content" : "0",
              padding: isOpenCreateUpdate ? "2rem" : "0",
            }}
            className=" bg-stone-800 transition-all h-fit rounded-lg relative p-4"
          >
            {isOpenCreateUpdate && (
              <>
                <div
                  onClick={() => dispatch(setCreate({ isOpen: false }))}
                  className="absolute right-2 top-2 text-red-500 icon-cross "
                ></div>

                <AddUpdateTire />
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
