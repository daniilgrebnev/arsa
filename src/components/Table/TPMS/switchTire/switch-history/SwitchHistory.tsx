import { ISwitchHistoryReq } from "@/interfaces/switchHistory"
import { AppDispatch, RootState } from "@/store/store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DateTime } from "ts-luxon"
import { thunkGetCarData } from "../../../../../store/reducers/car/carThunk"
import { setSwitchHistoryTire } from "../../../../../store/reducers/switchTire/switchTire"
import {
  setOpenSwitchHistory,
  setRemoveSwitchHistory,
} from "../../../../../store/reducers/switchTireHistory/switchTireHistory"
import {
  getSwitchHistoryThunk,
  removeSwitchHistoryThunk,
} from "../../../../../store/reducers/switchTireHistory/switchTireHistoryThunk"

export const SwitchHistory = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { vehicle_uid } = useSelector((state: RootState) => state.car)
  const wheel_id = useSelector((state: RootState) => state.car.wheel_id) || 0
  const start_date = Math.round(
    useSelector((state: RootState) => state.security.startTiming) / 1000
  )
  const end_date = Math.round(useSelector((state: RootState) => state.security.endTiming) / 1000)

  const body: ISwitchHistoryReq = {
    vehicle_uid,
    wheel_id,
    start_date,
    end_date,
  }
  const { data, rerenderHandler } = useSelector((state: RootState) => state.switchHistory)
  useEffect(() => {
    dispatch(getSwitchHistoryThunk(body))
  }, [rerenderHandler])

  const changeHandler = ({ id, description, name, wheel_id_switch }: any) => {
    const tire = {
      id,
      description,
      tireName: name,
      wheel_id:0,
    }
    dispatch(setSwitchHistoryTire(tire))
  }

  return (
    <div className="absolute w-screen h-screen left-0 top-0 z-[400] bg-white bg-opacity-85 flex items-center justify-center">
      <div className="p-4 bg-gray-200  rounded-lg flex items-center flex-col justify-center gap-0 text-black relative">
        <div className="absolute right-2 top-2 p-2 hover:bg-slate-200 active:bg-slate-300 cursor-pointer rounded-lg">
          <div
            onClick={() => {
              dispatch(setOpenSwitchHistory(false))
              setSwitchHistoryTire(null)
            }}
            className="icon-cross text-red-500 text-xl"
          ></div>
        </div>
        <h1 className="mb-5 text-3xl font-light">История замены</h1>
        <div className="overflow-hidden *:border-black bg-white *:border border border-black rounded-lg">
          <div
            style={{
              gridTemplateColumns: ` repeat(5,120px)`,
            }}
            className=" grid gap-0 text-center bg-slate-800 text-sm font-light *:text-wrap text-white"
          >
            <div className="flex items-center justify-center p-3    text-ellipsis overflow-hidden">
              Установленная модель
            </div>

            <div className="flex items-center justify-center p-3     text-ellipsis overflow-hidden">
              Причина замены
            </div>
            <div className="flex items-center justify-center p-3    text-ellipsis overflow-hidden">
              Дата
            </div>
            <div className="flex items-center justify-center p-3  text-ellipsis overflow-hidden">
              Номер сенсора
            </div>
            <div className="flex items-center justify-center p-3  text-ellipsis overflow-hidden">
              Операции
            </div>
          </div>
          {data?.map((item) => (
            <div
              style={{
                gridTemplateColumns: ` repeat(5,120px `,
              }}
              className=" grid gap-0 text-sm  *:p-1 font-light   cursor-pointer"
            >
              <div className="flex items-center justify-center  border">
                {item.wheel_model_name}
              </div>
              <div className="flex items-center justify-center  border">
                {item.reason_replacement}
              </div>

              <div className="flex items-center justify-center  border">
                {DateTime.fromSeconds(item.start_date).toLocaleString(DateTime.DATETIME_SHORT)}
              </div>
              <div className="flex items-center justify-center  border">{item.sensor_number}</div>
              <div className="flex items-center justify-between mx-auto gap-1">
                <div
                  onClick={() =>
                    changeHandler({
                      id: item.id,
                      description: item.reason_replacement,
                      name: item.wheel_model_name,
                      wheel_id_switch: item.wheel_id,
                    })
                  }
                  className="text-sm hover:bg-slate-300 p-1 transition-all rounded-lg active:bg-slate-500"
                >
                  Изменить
                </div>
                <div className="w-[1px] h-full bg-gray-300"></div>
                <div
                  onClick={() => {
                    dispatch(removeSwitchHistoryThunk(item.id))
                    dispatch(setRemoveSwitchHistory(item.id))
                    setTimeout(() => {
                      dispatch(thunkGetCarData(vehicle_uid))
                    }, 1500)
                  }}
                  className="icon-delete hover:bg-slate-300 active:bg-slate-500 p-1  transition-all rounded-lg text-xl text-red-500"
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
