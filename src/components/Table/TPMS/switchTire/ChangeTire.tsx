import { AppDispatch, RootState } from "@/store/store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCatalogThunk } from "../../../../store/reducers/catalog/catalogThunk"
import { setTire } from "../../../../store/reducers/switchTire/switchTire"

export const ChangeTire = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { data } = useSelector((state: RootState) => state.car)

  const account_id = typeof data != "string" && data != null && data.data.account_id

  useEffect(() => {
    account_id && dispatch(getCatalogThunk(account_id))
  }, [])

  const tires = useSelector((state: RootState) => state.catalog.data)

  return (
    <div className="bg-stone-800 p-4 rounded-lg h-60%">
      <h1 className="text-center text-xl font-light text-white">Выбрать шину</h1>
      <div
        style={{
          gridTemplateRows: "50px 50px 50px 50px 50px ",
        }}
        className="my-5 grid items-center justify-center grid-flow-col-dense gap-3"
      >
        {tires.map((item, index) => (
          <div
            onClick={() => dispatch(setTire({ id: item.id, tire: item.name }))}
            className="bg-white w-[100px] cursor-pointer hover:outline hover:outline-green-500 p-1 rounded-lg"
            key={index}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  )
}
