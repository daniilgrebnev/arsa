import { AppDispatch } from "@/store/store"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { thunkGetDriversTree } from "../../../store/reducers/drivers/driverThunk"
import { setRoutePage } from "../../../store/reducers/routing/routerSlice"
import { thunkGetVehicles } from "../../../store/reducers/vehicles/vehicleThunk"
import { CheckboxTreeContainer } from "../CheckboxTree/CheckboxTree"
import { CustomDateRangePicker } from "../CustomDateRangePicker /CustomDateRangePicker"

const LeftBar = () => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(thunkGetVehicles())
    dispatch(thunkGetDriversTree())
  }, [])

  return (
    <div
      className="w-full max-h-screen pb-4 flex flex-col relative z-20 overflow-y-auto gap-8 items-center justify-start bg-gray-200 text-[18px] py-5"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <img
        onClick={() => dispatch(setRoutePage("main"))}
        className="logo cursor-pointer transition-all active:active"
        src="logo.png"
        alt="ARSA"
      />

      <CustomDateRangePicker />
      <div className="w-full cd" style={{ height: "72vh" }}>
        <CheckboxTreeContainer />
      </div>
    </div>
  )
}

export default LeftBar
