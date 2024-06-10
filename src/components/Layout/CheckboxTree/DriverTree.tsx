import { AppDispatch } from "@/store/store"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { thunkGetDriversTree } from "../../../store/reducers/drivers/driverThunk"

export const DriverTree = () => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(thunkGetDriversTree())
  })
  return <div className="w-full h-screen overflow-y-auto  px-4 ">Дерево водителей</div>
}
