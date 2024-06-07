import { AppDispatch, RootState } from "@/store/store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setOpenFuel } from "../../../store/reducers/testingUI/fuel/fuel"
import { fuelThunk } from "../../../store/reducers/testingUI/fuel/fuelThunk"
import { FuelChart } from "./FuelChart"

export interface IFuelReq {
  start_date: number
  end_date: number
  tank_id: number
}

export const Fuel = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [tank, setTank] = useState<string>()
  const { endTiming, startTiming } = useSelector((state: RootState) => state.security)
  const { data } = useSelector((state: RootState) => state.fuel)

  const body: IFuelReq = {
    start_date: startTiming,
    end_date: endTiming,
    tank_id: Number(tank),
  }

  const submitHandler = () => {
    dispatch(fuelThunk(body))
  }

  useEffect(() => {
    data !== null && dispatch(fuelThunk(body))
  }, [startTiming, endTiming])
  return (
    <div className="absolute left-0 top-0 z-40 flex items-center justify-center backdrop-blur-md w-screen h-screen">
      <div className="w-[90%] h-[90%] bg-white rounded-xl relative flex items-center justify-center">
        <div className="absolute left-0 top-0 bg-black text-white rounded-lg overflow-hidden m-10 mx-auto">
          <input
            type="text"
            className="text-black px-6 py-2 border border-orange-400 focus-within:outline-none"
            onChange={(e) => setTank(e.target.value)}
            value={tank}
          />
          <button onClick={submitHandler}>Применить</button>
        </div>
        <div
          onClick={() => dispatch(setOpenFuel(false))}
          className="absolute z-[1000] right-10 top-10 icon-cross text-red-500"
        ></div>
        <FuelChart />
      </div>
    </div>
  )
}
