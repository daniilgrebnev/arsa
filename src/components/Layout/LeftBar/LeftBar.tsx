import { AppDispatch } from "@/store/store"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { thunkGetVehicle } from "../../../store/reducers/security/securityThunk"
import { CheckboxTreeContainer } from "../CheckboxTree/CheckboxTree"
import { DateRangePicker } from "../CustomDateRangePicker/CustomDateRangePicker"

const LeftBar = () => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(thunkGetVehicle())
  }, [])

  return (
    <div
      className="w-full max-h-screen pb-4 flex flex-col relative z-20 overflow-y-auto gap-8 items-center justify-start bg-gray-200 text-[18px] py-5"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <Link to={`/`}>
        <img src="logo.png" alt="ARSA" />
      </Link>

      <DateRangePicker />
      <div className="w-full cd" style={{ height: "72vh" }}>
        <CheckboxTreeContainer />
      </div>
    </div>
  )
}

export default LeftBar
